import { Component, ElementRef, inject, computed, effect, viewChild } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// Constants & Enums
import { IMAGE_PATH } from '../../../constants/paths';
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

@Component({
  selector: 'app-gallery',
  imports: [
    DefaultModeGalleryComponent,
    GridModeGalleryComponent,
    SelectedImageComponent,
    ScrollToTopComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);  
  private data = inject(DataService);
  private layout = inject(LayoutService);
  private settings = inject(SettingsService);

  gallery: Gallery = this.route.snapshot.data['gallery'];
  selectedImage: ImageData | null = this.gallery.images[0] || null;

  isDefaultMode = computed(() => this.isDefaultGalleryMode(this.gallery, this.layout.isDesktop()));
  isOverlayVisible = computed(() => this.layout.isDesktop() && this.settings.isOverlayVisible());

  scrollTarget = viewChild<ElementRef>('scrollTarget');

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof ActivationEnd && this.settings.isOverlayVisible())
        this.settings.toggleOverlay();
    });
    effect(() => {
      if (this.isOverlayVisible()) {
        if (this.scrollTarget())
          disableBodyScroll(this.scrollTarget()?.nativeElement, { reserveScrollBarGap: true });
      } else clearAllBodyScrollLocks();
    });
  }

  ngAfterViewInit(): void {
    if (this.layout.isDesktop()) this.preloadImages(this.gallery);
  }

  isDefaultGalleryMode(gallery: Gallery, isDesktop: boolean): boolean {
    return isDesktop && this.data.isChronological(gallery)
      ? this.settings.isDefaultModeByTime()
      : this.settings.isDefaultModeByData();
  }

  preloadImages(gallery: Gallery): void {
    if (!gallery.images.length) return;
    const preload = (index: number) => {
      const img = new Image();
      img.src = `${IMAGE_PATH}/${gallery.images[index].path})`;
      if (index === gallery.images.length - 1) return;
      img.onload = () => {
        preload(index + 1);
      };
      img.onerror = () => {
        preload(index + 1);
      };
    };
    preload(0);
  }

  toggleOverlay(): void {
    this.settings.toggleOverlay();
  }

}
