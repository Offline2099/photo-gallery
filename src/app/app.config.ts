import {
  ApplicationConfig, 
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  inject
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';
import { routes } from './app.routes';
import { DataService } from './services/data.service';
import { RouteService } from './services/route.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      const dataService = inject(DataService);
      const routeService = inject(RouteService);
      return firstValueFrom(
        dataService.getGalleries().pipe(tap(galleries => {
          if (galleries) routeService.constructDynamicRoutes(galleries)
        }))
      );
    })
  ]
};
