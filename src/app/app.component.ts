import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'PeruviansEcom';
  
  constructor(
    private router:Router,
    @Inject(PLATFORM_ID) private plataformId:Object

  ){}
  
  
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        // 👇 Esto mueve el scroll al instante ANTES de renderizar la nueva vista
        if(isPlatformBrowser(this.plataformId)){
          window.scrollTo(0, 0);
          // también desactiva cualquier animación global de scroll
          document.documentElement.style.scrollBehavior = 'auto';
        }
        
      });
  }
}
