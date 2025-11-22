import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import {create} from 'xmlbuilder2';

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
        url.ele('loc').txt(`https://peruvians.com${path}`);
        url.ele('changefreq').txt('monthly');
      });
      

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
