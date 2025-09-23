import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Gallery } from '../types/galleries/gallery.interface';
import { DefaultGalleries } from '../types/galleries/default-galleries.interface';
import { GalleryComponent } from '../components/galleries/01-gallery/gallery.component';
import { GalleryGroup } from '../types/galleries/gallery-group.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  areRoutesConstructed: boolean = false;

  constructor(private router: Router) {}

  constructDynamicRoutes(galleries: DefaultGalleries): void {
    if (this.areRoutesConstructed) return;
    this.addRoutesForDefaultGalleries(galleries);
    this.areRoutesConstructed = true;
  }

  private addRoutesForDefaultGalleries(galleries: DefaultGalleries): void {
    this.router.resetConfig([
      ...this.router.config,
      ...this.routesForGalleries(galleries.byYear),
      ...this.routesForGalleriesInGroups(galleries.byMonth),
      ...this.routesForGalleriesInGroups(galleries.byLocation),
      ...this.routesForGalleriesInGroups(galleries.byTag)
    ]);
  }

  private routesForGalleriesInGroups(groups: GalleryGroup[]): Route[] {
    return this.routesForGalleries(groups.map(group => group.galleries).flat());
  }

  private routesForGalleries(galleries: Gallery[]): Route[] {
    return galleries.map(gallery => ({
      path: gallery.path,
      component: GalleryComponent,
      data: { gallery }
    }))
  }

}