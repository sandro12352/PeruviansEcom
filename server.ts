import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files SOLO para archivos con extensión
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    // Determinar qué datos estructurados usar según la ruta
    const structuredData = getStructuredDataForRoute(originalUrl);

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => {
  console.log('🔍 HTML original tiene </head>:', html.includes('</head>'));
  
  // Inyectar datos estructurados
  const htmlWithStructuredData = injectStructuredData(html, structuredData);
  
  console.log('✅ JSON-LD inyectado:', htmlWithStructuredData.includes('type="application/ld+json"'));
  console.log('📊 Largo antes:', html.length, '| Largo después:', htmlWithStructuredData.length);
  
  res.send(htmlWithStructuredData);
})
      .catch((err) => next(err));
  });

  return server;
}

// Función para inyectar JSON-LD en el HTML
function injectStructuredData(html: string, data: any): string {
  const script = `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  
  // Buscar </head> de forma más robusta
  const headCloseIndex = html.indexOf('</head>');
  
  if (headCloseIndex !== -1) {
    // Si encuentra </head>, inserta antes
    return html.slice(0, headCloseIndex) + script + html.slice(headCloseIndex);
  }
  
  // Si no encuentra </head>, agrega al final del documento
  console.warn('⚠️ No se encontró </head> en el HTML');
  return html + script;
}

// Función para obtener datos estructurados según la ruta
function getStructuredDataForRoute(url: string) {
  // Organización (siempre)
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PeruviansEcom",
    "url": "https://peruviansecom.com",
    "logo": "https://peruviansecom.com/assets/logo.png",
    "sameAs": [
      "https://www.facebook.com/peruviansecom",
      "https://www.instagram.com/peruviansecom"
    ]
  };

  // Si es la página de inicio, agregar WebSite schema
  if (url === '/' || url === '') {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PeruviansEcom",
      "url": "https://peruviansecom.com",
      "description": "Tienda online en Perú para comprar productos locales de forma fácil, rápida y segura.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://peruviansecom.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  }

  // Si es página de blog
  if (url.includes('/blog')) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Blog - PeruviansEcom",
      "description": "Lee nuestro blog sobre productos locales peruanos",
      "image": "https://peruviansecom.com/blog-image.jpg",
      "datePublished": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "PeruviansEcom"
      },
      "publisher": organization
    };
  }

  // Si es página de productos
  if (url.includes('/productos')) {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Productos",
      "description": "Catálogo de productos locales peruanos",
      "url": "https://peruviansecom.com/productos"
    };
  }

  // Por defecto, devolver organización
  return organization;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();