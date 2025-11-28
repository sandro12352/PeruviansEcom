import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { CategoriaService } from '../peruvians-ecom/services/categoria.service';
import { EtiquetaService } from '../peruvians-ecom/services/etiqueta.service';

 export interface TipoRecurso {
  tipo: 'categoria' | 'etiqueta' | 'ninguno';
  datos: any;
}

export const categoriaEtiquetaResolver: ResolveFn<TipoRecurso> = (route, state): Observable<TipoRecurso> => {

  const categoriaService = inject(CategoriaService);
  const etiquetaService = inject(EtiquetaService);
  const router = inject(Router);
  const slug = route.paramMap.get('categoriaPadreSlug');
   if (!slug) {
    router.navigate(['/']);
    return of({ tipo: 'ninguno', datos: null });
  }

  return forkJoin({
    etiqueta: etiquetaService.obtenerEtiquetaPorSlug(slug).pipe(
      catchError(() => of(null))
    ),
    categoria: categoriaService.obtenerCategoriaPorSlug(slug).pipe(
      catchError(() => of(null))
    )
  }).pipe(
    map(resultado => {
      if (resultado.etiqueta) {
        return { tipo: 'etiqueta', datos: resultado.etiqueta };
      }
      
      if (resultado.categoria) {
        return { tipo: 'categoria', datos: resultado.categoria };
      }

      router.navigate(['/']);
      return { tipo: 'ninguno', datos: null };
    })
  );
};
