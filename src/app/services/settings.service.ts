import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  isDefaultModeByTime = signal<boolean>(true);
  isDefaultModeByData = signal<boolean>(false);

  isPanelVisible = signal<boolean>(false);
  isOverlayVisible = signal<boolean>(false);

  isMouseoverSelectAllowed = signal<boolean>(false);
  showImageInfo = signal<boolean>(true);
  
  imagesInRow = signal<number>(3);
  showImageCaptions = signal<boolean>(true);
  showImageData = signal<boolean>(false);
  showImageTags = signal<boolean>(false);

  toggleDefaultModeByTime(): void {
    this.isDefaultModeByTime.update(value => !value);
  }

  toggleDefaultModeByData(): void {
    this.isDefaultModeByData.update(value => !value);
  }

  togglePanelVisibility(): void {
    this.isPanelVisible.update(value => !value);
  }

  toggleOverlay(): void {
    this.isOverlayVisible.update(value => !value);
  }

  toggleSelectOnMouseover(): void {
    this.isMouseoverSelectAllowed.update(value => !value);
  }

  toggleImageInfo(): void {
    this.showImageInfo.update(value => !value);
  }

  setImagesInRow(imagesInRow: number): void {
    this.imagesInRow.set(imagesInRow);
  }

  toggleImageCaptions(): void {
    this.showImageCaptions.update(value => !value);
  }

  toggleImageData(): void {
    this.showImageData.update(value => !value);
  }

  toggleImageTags(): void {
    this.showImageTags.update(value => !value);
  }

}