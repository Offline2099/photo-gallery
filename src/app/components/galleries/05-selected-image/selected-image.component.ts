import { Component, inject, input, model, computed, effect } from '@angular/core';
import { NgClass } from '@angular/common';
// Constants & Enums
import { IMAGE_PATH } from '../../../constants/paths';
import { GalleryType } from '../../../constants/gallery-type.enum';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
import { ImageData } from '../../../types/galleries/image-data.interface';
// Components
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
import { ImageDataComponent } from '../06-image-data/image-data.component';
// Services
import { LayoutService } from '../../../services/layout.service';
import { SettingsService } from '../../../services/settings.service';
import { UtilityService } from '../../../services/utility.service';
import { DownloadService } from '../../../services/download.service';

@Component({
  selector: 'app-selected-image',
  host: {
    '[class.overlay-mode]': 'isOverlay()',
    '[class.no-data]': '!this.showImageInfo()'
  },
  imports: [NgClass, ControlButtonComponent, ImageDataComponent],
  templateUrl: './selected-image.component.html',
  styleUrl: './selected-image.component.scss'
})
export class SelectedImageComponent {

  private layout = inject(LayoutService);
  private settings = inject(SettingsService);
  private utility = inject(UtilityService);
  private download = inject(DownloadService);

  gallery = input.required<Gallery>();
  image = model.required<ImageData>();
  isOverlay = input(false);

  imageIndex = computed(() => this.imageIndexInGallery(this.gallery(), this.image()));
  imageName = computed(() => this.constructImageName(this.gallery(), this.imageIndex()));
  imagePath = computed(() => this.constructImagePath(this.image()));
  previousIndex = computed(() => this.getPreviousIndex(this.gallery(), this.imageIndex()));
  nextIndex = computed(() => this.getNextIndex(this.gallery(), this.imageIndex()));

  isLoading = true;

  showImageInfo = this.settings.showImageInfo;
  isDesktopSmall = this.layout.isDesktopSmall;

  constructor() {
    effect(() => {
      this.image();
      this.isLoading = true;
    });
  }

  onImageLoad(): void {
    this.isLoading = false;
  }

  imageIndexInGallery(gallery: Gallery, image: ImageData): number {
    if (gallery.type === GalleryType.month) return image.index;
    return gallery.images.findIndex(img => img.path === image.path) + 1;
  }

  constructImageName(gallery: Gallery, index: number): string {
    return `${gallery.name.full} - Image ${index}`;
  }

  constructImagePath(image: ImageData): string {
    return `${IMAGE_PATH}/${image.path}`;
  }

  getPreviousIndex(gallery: Gallery, index: number): number {
    return index === 1 ? gallery.images.length : index - 1;
  }

  getNextIndex(gallery: Gallery, index: number): number {
    return index === gallery.images.length ? 1 : index + 1;
  }

  selectPreviousImage(): void {
    this.image.set(this.gallery().images[this.previousIndex() - 1]);
  }

  selectNextImage(): void {
    this.image.set(this.gallery().images[this.nextIndex() - 1]);
  }

  downloadImage(url?: string): void {
    if (!url) return;
    const name = `${this.utility.toDashCase(this.gallery().name.full)}-image-${this.imageIndex()}`;
    this.download.downloadAsJPEG(url, name);
  }

  toggleOverlay(): void {
    this.settings.toggleOverlay();
  }

}
