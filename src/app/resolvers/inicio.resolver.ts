import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DashboardService } from '../peruvians-ecom/services/dashboard.service';

export const inicioResolver: ResolveFn<any> = (route, state) => {

  const dashboardService = inject(DashboardService);

  return dashboardService.getDashboardData('todas');
};
