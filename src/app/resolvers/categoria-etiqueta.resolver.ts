import { inject, PLATFORM_ID } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { PeruviansService } from '../peruvians-ecom/services/peruvians.service';
import { Categoria } from '../peruvians-ecom/interfaces/categoria';
import { Etiqueta } from '../peruvians-ecom/interfaces/etiqueta.interface';
import { isPlatformBrowser } from '@angular/common';

 export interface TipoRecurso {
  tipo: 'categoria' | 'etiqueta' | 'ninguno';
  datos:any;
}

export const categoriaEtiquetaResolver: ResolveFn<TipoRecurso> = (route, state): Observable<TipoRecurso> => {

  const peruvianService = inject(PeruviansService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const slug = route.paramMap.get('categoriaPadreSlug');
   if (!slug) {
    if (isPlatformBrowser(platformId)) {
        router.navigate(['/']);
      }

    return of({ tipo: 'ninguno', datos: null });
  }

   return peruvianService.obtenerPorSlug(slug).pipe(
    map((resultado): TipoRecurso => {
      // Verificar si es etiqueta (tiene etiqueta_slug)
      if ('etiqueta_slug' in resultado) {
        return { tipo: 'etiqueta', datos: resultado as Etiqueta };
      }
      
      // Verificar si es categoría (tiene categoria_slug)
      if ('categoria_slug' in resultado) {
        return { tipo: 'categoria', datos: resultado as Categoria };
      }

      // Si no es ninguno, redirigir
      if (isPlatformBrowser(platformId)) {
        router.navigate(['/']);
      }
      return { tipo: 'ninguno' as const, datos: null };
    }),
    catchError((error) => {
      console.error('Error al obtener recurso:', error);
      if (isPlatformBrowser(platformId)) {
        router.navigate(['/404']);
      }
      return of({ tipo: 'ninguno' as const, datos: null });
    })
  );
};
