import { Component, HostBinding, Signal, input, model, computed, effect } from '@angular/core';
import { NgClass } from '@angular/common';
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
    return `grid-${this.imagesInRow()}` + (this.layout.isDesktop() ? ' desktop' : '');
  }

  gallery = input.required<Gallery>();
  selectedImage = model.required<ImageData>();

  imagesInRow: Signal<number>;

  isSmallImage = computed<boolean>(() => !this.layout.isDesktop() || this.imagesInRow() > 2)
  isClickAllowed = computed<boolean>(() => this.layout.isDesktop() && this.imagesInRow() !== 1);
  isAnyDataVisible = computed<boolean>(() => 
    this.settings.showImageCaptions() || this.settings.showImageData() || this.settings.showImageTags()
  );

  constructor(private layout: LayoutService, private settings: SettingsService) {
    this.imagesInRow = this.settings.imagesInRow;
    effect(() => this.adjustImagesInRow(this.imagesInRow(), this.layout.screenWidth()));
  }

  adjustImagesInRow(imagesInRow: number, screenWidth: ScreenWidth): void {
    if (imagesInRow > 3 && screenWidth !== ScreenWidth.desktopWide)
      this.settings.setImagesInRow(3);
  }

  toggleOverlay(image: ImageData): void {
    if (!this.isClickAllowed()) return;
    this.selectedImage.set(image);
    this.settings.toggleOverlay();
  }

}
