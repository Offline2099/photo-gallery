import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Gallery } from '../types/galleries/gallery.interface';
import { DefaultGalleries } from '../types/galleries/default-galleries.interface';
import { GalleryComponent } from '../components/galleries/01-gallery/gallery.component';
import { GalleryGroup } from '../types/galleries/gallery-group.interface';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private areRoutesConstructed: boolean = false;

  constructor(private router: Router, private utility: UtilityService) {}

  constructDynamicRoutes(galleries: DefaultGalleries): void {
    if (this.areRoutesConstructed) return;
    this.addRoutesForDefaultGalleries(galleries);
    this.areRoutesConstructed = true;
  }

  imageRoute(year: number, month: number, index: number): string {
    return `${year}/${this.utility.addLeadingZeroes(month)}/${index}.webp`;
  }

  monthRoute(year: string, month: string): string {
    return `${year}/${this.utility.addLeadingZeroes(Number(month))}`;
  }

  locationRoute(location: string): string {
    return `places/${this.utility.toDashCase(location)}`;
  }

  tagRoute(tag: string): string {
    return `tags/${this.utility.toDashCase(tag)}`;
  }

  private addRoutesForDefaultGalleries(galleries: DefaultGalleries): void {
    this.router.resetConfig([
      ...this.router.config,
      ...this.routesForGalleries(galleries.byYear),
      ...this.routesForGalleriesInGroups(galleries.byMonth),
      ...this.routesForGalleriesInGroups(galleries.byLocation),
      ...this.routesForGalleriesInGroups(galleries.byTag),
      { path: '**', redirectTo: '', pathMatch: 'full' }
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
    }));
  }

}