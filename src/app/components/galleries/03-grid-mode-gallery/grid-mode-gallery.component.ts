import { Component, HostBinding, input, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription, combineLatest } from 'rxjs';
// Constants & Enums
import { ScreenWidth } from '../../../constants/screen-width';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
import { ImageData } from '../../../types/galleries/image-data.interface';
// Components
import { GalleryPanelComponent } from '../04-gallery-panel/gallery-panel.component';
import { ImageDataComponent } from '../06-image-data/image-data.component';
// Services
import { LayoutService } from '../../../services/layout.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-grid-mode-gallery',
  imports: [NgClass, GalleryPanelComponent, ImageDataComponent],
  templateUrl: './grid-mode-gallery.component.html',
  styleUrl: './grid-mode-gallery.component.scss'
})
export class GridModeGalleryComponent {

  @HostBinding('class') get galleryClasses(): string {
    return `grid-${this.imagesInRow}` + (this.isDesktop ? ' desktop' : '');
  }

  gallery = input.required<Gallery>();
  selectedImage = model.required<ImageData>();

  subscription: Subscription;
  isDesktop!: boolean;
  imagesInRow!: number;
  isClickAllowed!: boolean;
  isAnyDataVisible!: boolean;

  constructor(private layout: LayoutService, private settings: SettingsService) {
    this.subscription = combineLatest([
      this.layout.screenWidth$,
      this.layout.isDesktop$,
      this.settings.imagesInRow$,
      this.settings.showImageCaptions$,
      this.settings.showImageData$,
      this.settings.showImageTags$
    ]).subscribe(([screenWidth, isDesktop, imagesInRow, showCaptions, showData, showTags]) => {
      this.adjustImagesInRow(imagesInRow, screenWidth);
      this.isDesktop = isDesktop;
      this.imagesInRow = imagesInRow;
      this.isClickAllowed = isDesktop && imagesInRow !== 1;
      this.isAnyDataVisible = showCaptions || showData || showTags;
    });
  }

  adjustImagesInRow(imagesInRow: number, screenWidth: ScreenWidth): void {
    if (imagesInRow > 3 && screenWidth !== ScreenWidth.desktopWide)
      this.settings.setImagesInRow(3);
  }

  toggleOverlay(image: ImageData): void {
    if (!this.isClickAllowed) return;
    this.selectedImage.set(image);
    this.settings.toggleOverlay();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
