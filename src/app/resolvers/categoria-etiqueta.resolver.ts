import { inject, PLATFORM_ID } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { PeruviansService } from '../peruvians-ecom/services/peruvians.service';
import { Categoria } from '../peruvians-ecom/interfaces/categoria';
import { Etiqueta } from '../peruvians-ecom/interfaces/etiqueta.interface';

export interface TipoRecurso {
  tipo: 'categoria' | 'etiqueta' | 'ninguno';
  datos: Categoria | Etiqueta | null;
}

export const categoriaEtiquetaResolver: ResolveFn<TipoRecurso> = (route) => {
  const peruvianService = inject(PeruviansService);
  const slug = route.paramMap.get('categoriaPadreSlug');

  if (!slug) {
    return of({ tipo: 'ninguno', datos: null });
  }

  return peruvianService.obtenerPorSlug(slug).pipe(
    map((resultado) => {
      // ❌ QUITA los "of()" de aquí
      if ('etiqueta_slug' in resultado) {
        return { tipo: 'etiqueta' as const, datos: resultado as Etiqueta };
      }

      if ('categoria_slug' in resultado) {
        return { tipo: 'categoria' as const, datos: resultado as Categoria };
      }

      return { tipo: 'ninguno' as const, datos: null };
    }),
    catchError(() => of({ tipo: 'ninguno' as const, datos: null }))
  );
};