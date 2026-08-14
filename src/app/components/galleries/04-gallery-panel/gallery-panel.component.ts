import { Component, inject, input, computed } from '@angular/core';
// Constants & Enums
import { MAX_IMAGES_IN_ROW, MAX_IMAGES_IN_ROW_IF_NOT_WIDE } from '../../../constants/settings';
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
  imports: [ControlButtonComponent],
  templateUrl: './gallery-panel.component.html',
  styleUrl: './gallery-panel.component.scss'
})
export class GalleryPanelComponent {

  private data = inject(DataService);
  private layout = inject(LayoutService);
  private settings = inject(SettingsService);

  gallery = input.required<Gallery>();
  isDefaultMode = input.required<boolean>();

  displayedName = computed(() => this.displayedGalleryName(this.gallery(), this.isDefaultMode()));

  isDesktop = this.layout.isDesktop;
  maxImagesInRow = computed(() => this.getMaxImagesInRow(this.layout.isDesktopWide()));

  isPanelVisible = this.settings.isPanelVisible;
  isMouseoverSelectAllowed = this.settings.isMouseoverSelectAllowed;
  showImageInfo = this.settings.showImageInfo;
  imagesInRow = this.settings.imagesInRow;
  showImageCaptions = this.settings.showImageCaptions;
  showImageData = this.settings.showImageData;
  showImageTags = this.settings.showImageTags;

  displayedGalleryName(gallery: Gallery, isDefaultMode: boolean): string {
    return isDefaultMode
      ? this.data.isChronological(gallery)
        ? gallery.name.full
        : gallery.name.short
      : gallery.name.full;
  }

  getMaxImagesInRow(isDesktopWide: boolean): number {
    return isDesktopWide ? MAX_IMAGES_IN_ROW : MAX_IMAGES_IN_ROW_IF_NOT_WIDE;
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
