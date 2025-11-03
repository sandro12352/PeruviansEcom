import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private renderer: Renderer2;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  setDescription(desc: string) {
    this.metaService.updateTag({ name: 'description', content: desc });
  }

  setCanonical(url: string) {
    const head = this.renderer.selectRootElement('head', true) as HTMLElement;
    let link: HTMLLinkElement | undefined;

    Array.from(head.children).forEach(child => {
      if (child.nodeName === 'LINK' && (child as HTMLLinkElement).rel === 'canonical') {
        link = child as HTMLLinkElement;
      }
    });

    if (!link) {
      link = this.renderer.createElement('link') as HTMLLinkElement;
      this.renderer.setAttribute(link, 'rel', 'canonical');
      this.renderer.appendChild(head, link);
    }

    this.renderer.setAttribute(link, 'href', url);
  }











  
  setProductMeta(title: string, description: string, url: string) {
    this.setTitle(title);
    this.setDescription(description);
    this.setCanonical(url);
  }





  setStructuredData(data: any) {
    const head = this.renderer.selectRootElement('head', true) as HTMLElement;

    // Eliminar cualquier script previo de tipo application/ld+json
    Array.from(head.children).forEach(child => {
      if (
        child.nodeName === 'SCRIPT' &&
        (child as HTMLScriptElement).type === 'application/ld+json'
      ) {
        this.renderer.removeChild(head, child);
      }
    });

  // Crear el nuevo script con los datos estructurados
      const script = this.renderer.createElement('script') as HTMLScriptElement;
      this.renderer.setAttribute(script, 'type', 'application/ld+json');
      script.text = JSON.stringify(data, null, 2);

      this.renderer.appendChild(head, script);
    }



}
