import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, NavigationCancel, NavigationError, Router, ResolveEnd, ResolveStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'PeruviansEcom';
  loading = false;
  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      
      // Mostrar solo cuando hay un resolver ejecutándose
      if (event instanceof ResolveStart) {
        this.loading = true;
      }
      
      if (event instanceof ResolveEnd) {
        this.loading = false;
      }
      
      // Scroll arriba en CUALQUIER navegación
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
          document.documentElement.style.scrollBehavior = 'auto';
        }
      }
    });
  }
}