import { Component, Signal, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';
// Constants & Enums
import { ScreenWidth } from '../../../constants/screen-width';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
// Components
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
// Services
import { DataService } from '../../../services/data.service';
import { LayoutService } from '../../../services/layout.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-gallery-panel',
  imports: [NgClass, ControlButtonComponent],
  templateUrl: './gallery-panel.component.html',
  styleUrl: './gallery-panel.component.scss'
})
export class GalleryPanelComponent {

  gallery = input.required<Gallery>();
  isDefaultMode = input.required<boolean>();

  displayedName = computed<string>(() => this.displayedGalleryName(this.isDefaultMode(), this.gallery()));

  isDesktop: Signal<boolean>;

  isPanelVisible: Signal<boolean>;
  isMouseoverSelectAllowed: Signal<boolean>;
  showImageInfo: Signal<boolean>;
  imagesInRow: Signal<number>;
  showImageCaptions: Signal<boolean>;
  showImageData: Signal<boolean>;
  showImageTags: Signal<boolean>;

  maxImagesInRow = computed<number>(() => 
    this.layout.screenWidth() === ScreenWidth.desktopWide ? 4 : 3
  );

  constructor(private data: DataService, private layout: LayoutService, private settings: SettingsService) {
    this.isDesktop = this.layout.isDesktop;
    this.isPanelVisible = this.settings.isPanelVisible;
    this.isMouseoverSelectAllowed = this.settings.isMouseoverSelectAllowed;
    this.showImageInfo = this.settings.showImageInfo;
    this.imagesInRow = this.settings.imagesInRow;
    this.showImageCaptions = this.settings.showImageCaptions;
    this.showImageData = this.settings.showImageData;
    this.showImageTags = this.settings.showImageTags;
  }

  displayedGalleryName(isDefaultMode: boolean, gallery: Gallery): string {
    return isDefaultMode
      ? this.data.isChronological(gallery) ? gallery.name.full : gallery.name.short
      : gallery.name.full;
  }

  toggleSettingsPanel(): void {
    this.settings.togglePanelVisibility();
  }

  toggleGalleryMode(): void {
    this.data.isChronological(this.gallery())
      ? this.settings.toggleDefaultModeByTime()
      : this.settings.toggleDefaultModeByData();
  }

  toggleSelectOnMouseover(): void {
    this.settings.toggleSelectOnMouseover();
  }

  toggleImageInfo(): void {
    this.settings.toggleImageInfo();
  }

  setImagesInRow(imagesInRow: number): void {
    this.settings.setImagesInRow(imagesInRow);
  }

  toggleImageCaptions(): void {
    this.settings.toggleImageCaptions();
  }

  toggleImageData(): void {
    this.settings.toggleImageData();
  }

  toggleImageTags(): void {
    this.settings.toggleImageTags();
  }

}
