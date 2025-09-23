import { Component, input, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { timer } from 'rxjs';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
import { ImageData } from '../../../types/galleries/image-data.interface';
// Components
import { SelectedImageComponent } from '../05-selected-image/selected-image.component';
import { GalleryPanelComponent } from "../04-gallery-panel/gallery-panel.component";
// Services
import { SettingsService } from '../../../services/settings.service';

const NONE_SELECTED: number = -1;
const MOUSEOVER_SELECT_DELAY: number = 300;

@Component({
  selector: 'app-default-mode-gallery',
  imports: [NgClass, SelectedImageComponent, GalleryPanelComponent],
  templateUrl: './default-mode-gallery.component.html',
  styleUrl: './default-mode-gallery.component.scss'
})
export class DefaultModeGalleryComponent {

  gallery = input.required<Gallery>();
  selectedImage = model.required<ImageData>();

  displayedName: string = '';
  mouseoverIndex: number = NONE_SELECTED;

  constructor(private settings: SettingsService) {}

  selectImage(image: ImageData): void {
    this.selectedImage.set(image);
  }

  mouseoverImageSelect(index: number): void {
    if (!this.settings.isMouseoverSelectAllowed$.value) return;
    this.mouseoverIndex = index;
    timer(MOUSEOVER_SELECT_DELAY).subscribe(() => {
      if (this.mouseoverIndex == index && this.settings.isMouseoverSelectAllowed$.value) 
        this.selectImage(this.gallery().images[index]);
    });
  }

  cancelMouseoverSelect(): void {
    this.mouseoverIndex = NONE_SELECTED;
  }

}
