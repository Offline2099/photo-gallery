import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, map, catchError } from 'rxjs';
import { DataService } from './services/data.service';
import { RouteService } from './services/route.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private router: Router, private data: DataService, private routes: RouteService) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.routes.areRoutesConstructed) return of(this.doesRouteExist(state.url));
    return this.data.getGalleries().pipe(
      map(galleries => {
        this.routes.constructDynamicRoutes(galleries);
        return this.doesRouteExist(state.url);
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return [false];
      })
    )
  }

  doesRouteExist(path: string): boolean {
    return this.router.config.map(route => '/' + route.path).includes(path);
  }

}
