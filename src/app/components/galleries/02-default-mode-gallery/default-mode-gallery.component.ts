import { Component, inject, input, model } from '@angular/core';
import { timer } from 'rxjs';
// Constants & Enums
import { IMAGE_SMALL_PATH } from '../../../constants/paths';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
import { ImageData } from '../../../types/galleries/image-data.interface';
// Components
import { SelectedImageComponent } from '../05-selected-image/selected-image.component';
import { GalleryPanelComponent } from '../04-gallery-panel/gallery-panel.component';
// Services
import { SettingsService } from '../../../services/settings.service';

const NONE_SELECTED = -1;
const MOUSEOVER_SELECT_DELAY_MS = 300;

@Component({
  selector: 'app-default-mode-gallery',
  imports: [SelectedImageComponent, GalleryPanelComponent],
  templateUrl: './default-mode-gallery.component.html',
  styleUrl: './default-mode-gallery.component.scss'
})
export class DefaultModeGalleryComponent {

  readonly IMAGE_SMALL_PATH = IMAGE_SMALL_PATH;

  private settings = inject(SettingsService);

  gallery = input.required<Gallery>();
  selectedImage = model.required<ImageData>();

  mouseoverIndex = NONE_SELECTED;

  selectImage(image: ImageData): void {
    this.selectedImage.set(image);
  }

  mouseoverImageSelect(index: number): void {
    if (!this.settings.isMouseoverSelectAllowed()) return;
    this.mouseoverIndex = index;
    timer(MOUSEOVER_SELECT_DELAY_MS).subscribe(() => {
      if (this.mouseoverIndex === index && this.settings.isMouseoverSelectAllowed())
        this.selectImage(this.gallery().images[index]);
    });
  }

  cancelMouseoverSelect(): void {
    this.mouseoverIndex = NONE_SELECTED;
  }

}
