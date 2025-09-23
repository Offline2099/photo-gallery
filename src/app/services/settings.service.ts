import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  isDefaultModeByTime$ = new BehaviorSubject<boolean>(true);
  isDefaultModeByData$ = new BehaviorSubject<boolean>(false);

  isPanelVisible$ = new BehaviorSubject<boolean>(false);
  isOverlayVisible$ = new BehaviorSubject<boolean>(false);

  isMouseoverSelectAllowed$ = new BehaviorSubject<boolean>(false);
  showImageInfo$ = new BehaviorSubject<boolean>(true);
    
  imagesInRow$ = new BehaviorSubject<number>(3);
  showImageCaptions$ = new BehaviorSubject<boolean>(true);
  showImageData$ = new BehaviorSubject<boolean>(false);
  showImageTags$ = new BehaviorSubject<boolean>(false);

  toggleDefaultModeByTime(): void {
    this.isDefaultModeByTime$.next(!this.isDefaultModeByTime$.value);
  }

  toggleDefaultModeByData(): void {
    this.isDefaultModeByData$.next(!this.isDefaultModeByData$.value);
  }

  togglePanelVisibility(): void {
    this.isPanelVisible$.next(!this.isPanelVisible$.value);
  }

  toggleOverlay(): void {
    this.isOverlayVisible$.next(!this.isOverlayVisible$.value);
  }

  toggleSelectOnMouseover(): void {
    this.isMouseoverSelectAllowed$.next(!this.isMouseoverSelectAllowed$.value);
  }

  toggleImageInfo(): void {
    this.showImageInfo$.next(!this.showImageInfo$.value);
  }

  setImagesInRow(imagesInRow: number): void {
    this.imagesInRow$.next(imagesInRow);
  }

  toggleImageCaptions(): void {
    this.showImageCaptions$.next(!this.showImageCaptions$.value);
  }

  toggleImageData(): void {
    this.showImageData$.next(!this.showImageData$.value);
  }

  toggleImageTags(): void {
    this.showImageTags$.next(!this.showImageTags$.value);
  }

}