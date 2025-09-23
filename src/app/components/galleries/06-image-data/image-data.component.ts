import { Component, HostBinding, input, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { combineLatest, Subscription } from 'rxjs';
// Constants & Enums
import { GalleryType } from '../../../constants/gallery-type.enum';
import { IMAGE_DATA_TABS, ImageDataTabId } from '../../../constants/image-data-tabs';
// Interfaces
import { ImageData } from '../../../types/galleries/image-data.interface';
import { ImageDataTab } from '../../../types/ui/image-data-tab.interface';
// Components
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
// Services
import { SettingsService } from '../../../services/settings.service';
import { UtilityService } from '../../../services/utility.service';

interface ImageDataSettings {
  showImageCaptions: boolean;
  showImageData: boolean;
  showImageTags: boolean;
}

@Component({
  selector: 'app-image-data',
  imports: [NgTemplateOutlet, ControlButtonComponent],
  templateUrl: './image-data.component.html',
  styleUrl: './image-data.component.scss'
})
export class ImageDataComponent {

  @HostBinding('class.has-tabs') get _hasTabs(): boolean { return this.hasTabs() }

  readonly GalleryType = GalleryType;
  readonly ImageDataTabId = ImageDataTabId;

  data = input.required<ImageData>();
  galleryType = input.required<GalleryType>();
  hasTabs = input<boolean>(false);

  dataTabs = computed<ImageDataTab[]>(() => this.constructDataTabs(this.hasTabs(), this.data(), this.galleryType()));
  selectedTabIndex: number = 0;

  coordinates = computed<string>(() => this.coordinatesText(this.data()));
  time = computed<string>(() => this.timeText(this.data()));

  subscription: Subscription;
  dataSettings!: ImageDataSettings;

  constructor(private utility: UtilityService, private settings: SettingsService) {
    this.subscription = combineLatest([
      this.settings.showImageCaptions$,
      this.settings.showImageData$,
      this.settings.showImageTags$
    ]).subscribe(([showImageCaptions, showImageData, showImageTags]) => {
      this.dataSettings = { showImageCaptions, showImageData, showImageTags }
    });
  }

  constructDataTabs(hasTabs: boolean, data: ImageData, galleryType: GalleryType): ImageDataTab[] {
    if (!hasTabs) return [];
    return IMAGE_DATA_TABS.filter(tab => 
      (tab.id === ImageDataTabId.time && galleryType !== GalleryType.year && galleryType !== GalleryType.month) ||
      (tab.id === ImageDataTabId.location && data.location) ||
      (tab.id === ImageDataTabId.tags && data.tags)
    );
  }

  selectDataTab(index: number): void {
    this.selectedTabIndex = index;
  }

  coordinatesText(data: ImageData): string {
    if (!data.location?.coords) return '';
    return `(${data.location.coords.lat} N, ${data.location.coords.lon} E)`;
  }

  timeText(data: ImageData): string {
    return `${this.utility.monthName(data.month)} ${data.year}`;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
