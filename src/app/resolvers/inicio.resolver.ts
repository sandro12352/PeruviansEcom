import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { forkJoin, catchError, of, map } from 'rxjs';
import { DashboardService } from '../peruvians-ecom/services/dashboard.service';
import { DashboardResponse } from '../peruvians-ecom/interfaces/dashboard.interface';

export const homeResolver: ResolveFn<DashboardResponse | null> = () => {
  const dashboardService = inject(DashboardService);

  return dashboardService.getDashboardData('todas').pipe(
    map(response => {
      if (response.success) {
        return response;
      }
      console.error('Dashboard no retornó datos exitosos');
      return null;
    }),
    catchError((error) => {
      console.error('Error al cargar dashboard:', error);
      return of(null);
    })
  );
};