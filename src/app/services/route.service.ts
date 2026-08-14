import { Service, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ICON_PATH, LOCATIONS_PATH, TAGS_PATH } from '../constants/paths';
import { Gallery } from '../types/galleries/gallery.interface';
import { GalleryGroup } from '../types/galleries/gallery-group.interface';
import { DefaultGalleries } from '../types/galleries/default-galleries.interface';
import { GalleryComponent } from '../components/galleries/01-gallery/gallery.component';
import { UtilityService } from './utility.service';

@Service()
export class RouteService {

  private router = inject(Router);
  private utility = inject(UtilityService);

  private areRoutesConstructed = false;

  constructDynamicRoutes(galleries: DefaultGalleries): void {
    if (this.areRoutesConstructed) return;
    this.addRoutesForDefaultGalleries(galleries);
    this.areRoutesConstructed = true;
  }

  iconRoute(iconName: string): string {
    if (!iconName) return '';
    return `${ICON_PATH}/${iconName}.webp`;
  }

  imagePath(year: number, month: number, index: number): string {
    return `${year}/${String(month).padStart(2, '0')}/${index}.webp`;
  }

  monthRoute(year: string, month: string): string {
    return `${year}/${month.padStart(2, '0')}`;
  }

  locationRoute(location: string): string {
    return `${LOCATIONS_PATH}/${this.utility.toDashCase(location)}`;
  }

  tagRoute(tag: string): string {
    return `${TAGS_PATH}/${this.utility.toDashCase(tag)}`;
  }

  isLocationRoute(url: string): boolean {
    return url.includes(`/${LOCATIONS_PATH}/`);
  }

  isTagRoute(url: string): boolean {
    return url.includes(`/${TAGS_PATH}/`);
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
