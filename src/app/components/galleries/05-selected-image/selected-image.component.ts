import { Component, HostBinding, input, model, computed, effect } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription, combineLatest } from 'rxjs';
// Constants & Enums
import { ScreenWidth } from '../../../constants/screen-width';
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

@Component({
  selector: 'app-selected-image',
  imports: [NgClass, ControlButtonComponent, ImageDataComponent],
  templateUrl: './selected-image.component.html',
  styleUrl: './selected-image.component.scss'
})
export class SelectedImageComponent {

  @HostBinding('class.overlay-mode') get _isOverlay(): boolean { return this.isOverlay() }
  @HostBinding('class.no-data') get _noInfo(): boolean { return !this.showInfo }

  gallery = input.required<Gallery>();
  image = model.required<ImageData>();
  isOverlay = input<boolean>(false);

  imageIndex = computed<number>(() => this.imageIndexInGallery(this.gallery(), this.image()));
  imageName = computed<string>(() => this.constructImageName(this.gallery(), this.imageIndex()));
  previousIndex = computed<number>(() => this.getPreviousIndex(this.gallery(), this.imageIndex()));
  nextIndex = computed<number>(() => this.getNextIndex(this.gallery(), this.imageIndex()));
  
  isLoading: boolean = true;

  subscription: Subscription;
  isDesktopSmall!: boolean;
  showInfo!: boolean;

  constructor(
    private layout: LayoutService,
    private settings: SettingsService,
    private utility: UtilityService
  ) {
    effect(() => {
      if (this.image()) this.isLoading = true;
    });
    this.subscription = combineLatest([
      this.layout.screenWidth$,
      this.settings.showImageInfo$
    ]).subscribe(([width, showInfo]) => {
      this.isDesktopSmall = width === ScreenWidth.desktopSmall;
      this.showInfo = showInfo;
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

  downloadImage(url: string) {
    if (!url) return;
    const name: string = `${this.utility.toDashCase(this.gallery().name.full)}-image-${this.imageIndex()}`;
    this.utility.downloadAsJPEG(url, name);
  }

  toggleOverlay(): void {
    this.settings.toggleOverlay();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
