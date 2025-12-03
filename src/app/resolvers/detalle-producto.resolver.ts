import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PeruviansService } from '../peruvians-ecom/services/peruvians.service';
import { catchError, map, of } from 'rxjs';

export const detalleProductoResolver: ResolveFn<any> = (route, state) => {
  const router = inject(Router);
  const peruviansService = inject(PeruviansService);
  const id = Number(route.paramMap.get('id')); 

  if (isNaN(id)) {
      return of(null);
  }

   return peruviansService.getProducto(id).pipe(
      map(producto => {
        return producto ?? null;
      }),
      catchError(err => {
        console.error('Error en resolver producto:', err);
        return of(null);
      })
  );

};
