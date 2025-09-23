import { Component, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription, combineLatest } from 'rxjs';
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

interface CurrentState {
  isDesktop: boolean;
  isDesktopWide: boolean;
  isPanelVisible: boolean;
  isMouseoverSelectAllowed: boolean;
  showImageInfo: boolean;
  imagesInRow: number;
  showImageCaptions: boolean;
  showImageData: boolean;
  showImageTags: boolean;
}

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

  subscription: Subscription;
  state!: CurrentState;

  constructor(private data: DataService, private layout: LayoutService, private settings: SettingsService) {
    this.subscription = combineLatest([
      this.layout.screenWidth$,
      this.layout.isDesktop$,
      this.settings.isPanelVisible$,
      this.settings.isMouseoverSelectAllowed$,
      this.settings.showImageInfo$,
      this.settings.imagesInRow$,
      this.settings.showImageCaptions$,
      this.settings.showImageData$,
      this.settings.showImageTags$
    ]).subscribe(([
      width,
      isDesktop,
      isPanelVisible,
      isMouseoverSelectAllowed,
      showImageInfo,
      imagesInRow,
      showImageCaptions,
      showImageData,
      showImageTags
    ]) => this.state = {
      isDesktop,
      isDesktopWide: width === ScreenWidth.desktopWide,
      isPanelVisible,
      isMouseoverSelectAllowed,
      showImageInfo,
      imagesInRow,
      showImageCaptions,
      showImageData,
      showImageTags
    });
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

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
