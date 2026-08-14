import { Service, signal } from '@angular/core';

@Service()
export class SettingsService {

  isDefaultModeByTime = signal(true);
  isDefaultModeByData = signal(false);

  isPanelVisible = signal(false);
  isOverlayVisible = signal(false);

  isMouseoverSelectAllowed = signal(false);
  showImageInfo = signal(true);

  imagesInRow = signal(3);
  showImageCaptions = signal(true);
  showImageData = signal(false);
  showImageTags = signal(false);

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
