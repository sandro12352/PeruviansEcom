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
}
