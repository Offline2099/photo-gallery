import { Component } from '@angular/core';
import { Router, Route, NavigationEnd } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
import { ImageData } from '../../../types/galleries/image-data.interface';
// Components
import { DefaultModeGalleryComponent } from '../02-default-mode-gallery/default-mode-gallery.component';
import { GridModeGalleryComponent } from '../03-grid-mode-gallery/grid-mode-gallery.component';
import { SelectedImageComponent } from '../05-selected-image/selected-image.component';
import { ScrollToTopComponent } from '../../ui-elements/scroll-to-top/scroll-to-top.component';
// Services
import { DataService } from '../../../services/data.service';
import { LayoutService } from '../../../services/layout.service';
import { SettingsService } from '../../../services/settings.service';

interface GalleryData {
  gallery: Gallery;
  isDesktop: boolean;
  isDefaultMode: boolean;
  isOverlayVisible: boolean;
}

@Component({
  selector: 'app-gallery',
  imports: [DefaultModeGalleryComponent, GridModeGalleryComponent, SelectedImageComponent, ScrollToTopComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  subscription: Subscription;
  galleryData: GalleryData | null = null;
  selectedImage: ImageData | null = null;

  constructor(
    private router: Router,
    private data: DataService,
    private layout: LayoutService,
    private settings: SettingsService
  ) {
    this.subscription = this.constructGalleryData().subscribe(data => {
      if (!this.selectedImage || data?.gallery !== this.galleryData?.gallery) 
        this.selectedImage = data?.gallery.images.length ? data.gallery.images[0] : null;
      if (data?.isDesktop) this.preloadImages(data.gallery);
      this.galleryData = data;
    });
  }

  constructGalleryData(): Observable<GalleryData | null> {
    return combineLatest([
      this.getGalleryFromCurrentURL(),
      this.layout.isDesktop$,
      this.settings.isDefaultModeByTime$,
      this.settings.isDefaultModeByData$,
      this.settings.isOverlayVisible$
    ]).pipe(
      map(([gallery, isDesktop, isDefaultModeByTime, isDefaultModeByData, isOverlayVisible]) => {
        if (!gallery) return null;
        return {
          gallery,
          isDesktop,
          isDefaultMode: this.data.isChronological(gallery)
            ? isDesktop && isDefaultModeByTime
            : isDesktop && isDefaultModeByData,
          isOverlayVisible: isDesktop && isOverlayVisible
        }
      })
    );
  }

  getGalleryFromCurrentURL(): Observable<Gallery | null> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => {
        const route: Route | undefined = this.router.config.find(route => event.url === '/' + route.path);
        return route?.data ? route.data['gallery'] : null;
      })
    );
  }

  preloadImages(gallery: Gallery): void {
    if (!gallery.images.length) return;
    const preload = (index: number) => {
      const img = new Image();
      img.src = `./img/${gallery.images[index].path}`;
      if (index === gallery.images.length - 1) return;
      img.onload = () => { preload(index + 1) }
    }
    preload(0);
  }

  toggleOverlay(): void {
    this.settings.toggleOverlay()
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
