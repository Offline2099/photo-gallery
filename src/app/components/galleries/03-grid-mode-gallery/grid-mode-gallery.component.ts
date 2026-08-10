import { Component, Signal, inject, input, model, computed, effect } from '@angular/core';
// Constants & Enums
import { IMAGE_PATH, IMAGE_SMALL_PATH } from '../../../constants/paths';
import {
  MAX_IMAGES_IN_ROW_IF_NOT_WIDE,
  MAX_LARGE_IMAGES_IN_ROW
} from '../../../constants/settings';
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
  host: { '[class]': 'galleryClass()' },
  imports: [GalleryPanelComponent, ImageDataComponent],
  templateUrl: './grid-mode-gallery.component.html',
  styleUrl: './grid-mode-gallery.component.scss'
})
export class GridModeGalleryComponent {

  readonly IMAGE_PATH = IMAGE_PATH;
  readonly IMAGE_SMALL_PATH = IMAGE_SMALL_PATH;

  private layout = inject(LayoutService);
  private settings = inject(SettingsService);

  gallery = input.required<Gallery>();
  selectedImage = model.required<ImageData>();

  imagesInRow: Signal<number> = this.settings.imagesInRow;

  galleryClass = computed<string>(() =>
    this.constructGalleryClass(this.imagesInRow(), this.layout.isDesktop())
  );
  areImagesSmall = computed<boolean>(() =>
    this.shouldImagesBeSmall(this.imagesInRow(), this.layout.isDesktop())
  );
  isOverlayAllowed = computed<boolean>(() =>
    this.shouldOverlayBeAllowed(this.imagesInRow(), this.layout.isDesktop())
  );
  isAnyDataVisible = computed<boolean>(() =>
    this.settings.showImageCaptions() ||
    this.settings.showImageData() ||
    this.settings.showImageTags()
  );

  constructor() {
    effect(() => this.adjustImagesInRow(this.imagesInRow()));
  }

  constructGalleryClass(imagesInRow: number, isDesktop: boolean): string {
    return `grid-${imagesInRow}` + (isDesktop ? ' desktop' : '');
  }

  shouldImagesBeSmall(imagesInRow: number, isDesktop: boolean): boolean {
    return !isDesktop || imagesInRow > MAX_LARGE_IMAGES_IN_ROW;
  }

  shouldOverlayBeAllowed(imagesInRow: number, isDesktop: boolean): boolean {
    return isDesktop && imagesInRow !== 1;
  }

  adjustImagesInRow(imagesInRow: number): void {
    if (imagesInRow > MAX_IMAGES_IN_ROW_IF_NOT_WIDE && !this.layout.isDesktopWide())
      this.settings.setImagesInRow(MAX_IMAGES_IN_ROW_IF_NOT_WIDE);
  }

  toggleOverlay(image: ImageData): void {
    if (!this.isOverlayAllowed()) return;
    this.selectedImage.set(image);
    this.settings.toggleOverlay();
  }

}
