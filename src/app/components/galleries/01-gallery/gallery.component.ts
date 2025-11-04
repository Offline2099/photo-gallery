import { Component, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  imports: [DefaultModeGalleryComponent, GridModeGalleryComponent, SelectedImageComponent, ScrollToTopComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  gallery!: Gallery;
  selectedImage: ImageData | null = null;

  isDefaultMode = computed<boolean>(() => this.isDefaultGalleryMode(this.gallery));
  isOverlayVisible = computed<boolean>(() => this.layout.isDesktop() && this.settings.isOverlayVisible());

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private layout: LayoutService,
    private settings: SettingsService
  ) {
    this.gallery = this.route.snapshot.data['gallery'];
    this.selectedImage = this.gallery.images[0] || null;
  }

  ngAfterViewInit(): void {
    this.preloadImages(this.gallery);
  }

  isDefaultGalleryMode(gallery: Gallery): boolean {
    return this.layout.isDesktop() && 
      this.data.isChronological(gallery)
        ? this.settings.isDefaultModeByTime()
        : this.settings.isDefaultModeByData();
  }

  preloadImages(gallery: Gallery): void {
    if (!gallery.images.length) return;
    const preload = (index: number) => {
      const img = new Image();
      img.src = `./img/${gallery.images[index].path}`;
      if (index === gallery.images.length - 1) return;
      img.onload = () => { preload(index + 1) }
      img.onerror = () => { preload(index + 1) }
    }
    preload(0);
  }

  toggleOverlay(): void {
    this.settings.toggleOverlay();
  }

}
