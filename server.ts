import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import {create} from 'xmlbuilder2';
import { envs } from './src/app/config/envs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '0',
    etag:false,
    immutable:true,
  }));

  server.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
      next();
  }); 


  server.get('/sitemap.xml' ,async (_req,res)=>{

    try{
      const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('urlset', {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
      }); 

      const staticRoutes = [
        '/',
        '/blog',
        '/perfil',
        '/mis-pedidos',
        '/contactanos',
        '/nosotros',
        '/preguntas-frecuentes',
        '/nuestras-tiendas',
        '/mas-vendidos',
        '/ofertas',
        '/mas-nuevos',
        '/productos',
        '/politica-privacidad',
        '/terminos-condiciones',
        '/libro-reclamaciones'
      ];

      // Rutas estáticas del routing de Angular
      staticRoutes.forEach((path) => {
        const url = root.ele('url');
        url.ele('loc').txt(`https://peruviansecom.com${path}`);
        url.ele('changefreq').txt('monthly');
      });
      
      // ⭐ 2. Obtener categorías dinámicas desde tu backend
      const respCat  = await fetch(`${envs.apiUrl}/categoria`);
      const categorias = (await respCat .json()).data;

      // ⭐ Obtener etiquetas
      const respTag = await (await fetch(`${envs.apiUrl}/etiqueta`)).json();
      const etiquetas = respTag.etiquetas;

      //Productos
      const respProd = await (await fetch(`${envs.apiUrl}/productos/todo`)).json();
      const productos = respProd.data.productos;
      categorias
      .filter((cat: any) => cat.es_padre === true)
      .forEach((cat:any) => {
        const url = root.ele('url');
        url.ele('loc').txt(`https://peruviansecom.com/${cat.categoria_slug}`).up();
        url.ele('changefreq').txt('weekly');
        // 👉 Subcategorías si existen
          if (Array.isArray(cat.subcategorias)) {
            cat.subcategorias.forEach((sub: any) => {
              const urlSub = root.ele('url');
              urlSub.ele('loc').txt(
                `https://peruviansecom.com/${cat.categoria_slug}/${sub.categoria_slug}`
              ).up();
              urlSub.ele('changefreq').txt('weekly');
            });
          }


      });

      // 👉 Agregar etiquetas
      etiquetas.forEach((tag: any) => {
        const url = root.ele('url');
        if(tag.etiqueta_slug){
          url.ele('loc').txt(`https://peruviansecom.com/${tag.etiqueta_slug}`).up();
          url.ele('changefreq').txt('weekly');
        }
      });


      productos.forEach((prod: any) => {
        const url = root.ele('url');
        url.ele('loc').txt(
          `https://peruviansecom.com/${prod.categoria.categoria_slug}/${prod.subcategoria.categoria_slug}/${prod.producto_slug}/${prod.id}`
        );
        url.ele('changefreq').txt('weekly');
      });

      // ⭐ 3. Enviar XML
      res.header('Content-Type', 'application/xml');
      res.send(root.end({ prettyPrint: true }));
      
    }catch(err){
      console.error(err);
      res.status(500).send('Error generando sitemap');
    }
  })
  

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
