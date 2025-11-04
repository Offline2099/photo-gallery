import { Component, HostBinding, input, computed, Signal } from '@angular/core';
import { LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
// Constants & Enums
import { GalleryType } from '../../../constants/gallery-type.enum';
import { IMAGE_DATA_TABS, ImageDataTabId } from '../../../constants/image-data-tabs';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
import { ImageData } from '../../../types/galleries/image-data.interface';
import { ImageDataTab } from '../../../types/ui/image-data-tab.interface';
// Components
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
// Services
import { SettingsService } from '../../../services/settings.service';
import { UtilityService } from '../../../services/utility.service';
import { RouteService } from '../../../services/route.service';

interface LocationData {
  name: string;
  area: string;
  coordinates: string;
  nameURL: string;
  areaURL: string;
}

interface TimeData {
  time: string;
  timeURL: string;
}

interface TagData {
  tag: string;
  tagURL: string;
}

@Component({
  selector: 'app-image-data',
  imports: [NgTemplateOutlet, RouterLink, LowerCasePipe, ControlButtonComponent],
  templateUrl: './image-data.component.html',
  styleUrl: './image-data.component.scss'
})
export class ImageDataComponent {

  @HostBinding('class.has-tabs') get _hasTabs(): boolean { return this.hasTabs() }

  readonly GalleryType = GalleryType;
  readonly ImageDataTabId = ImageDataTabId;

  gallery = input.required<Gallery>();
  data = input.required<ImageData>();
  hasTabs = input<boolean>(false);

  showImageCaptions: Signal<boolean>;
  showImageData: Signal<boolean>;
  showImageTags: Signal<boolean>;

  dataTabs = computed<ImageDataTab[]>(() => this.constructDataTabs(this.hasTabs(), this.data(), this.gallery()));
  selectedTabIndex: number = 0;

  location = computed<LocationData | null>(() => this.locationData(this.data()));
  time = computed<TimeData>(() => this.timeData(this.data()));
  tags = computed<TagData[]>(() => this.tagsData(this.data()));

  constructor(private utility: UtilityService, private settings: SettingsService, private route: RouteService) {
    this.showImageCaptions = this.settings.showImageCaptions;
    this.showImageData = this.settings.showImageData;
    this.showImageTags = this.settings.showImageTags;
  }

  constructDataTabs(hasTabs: boolean, data: ImageData, gallery: Gallery): ImageDataTab[] {
    if (!hasTabs) return [];
    return IMAGE_DATA_TABS.filter(tab => 
      (tab.id === ImageDataTabId.time && gallery.type !== GalleryType.month) ||
      (tab.id === ImageDataTabId.location && data.location) ||
      (tab.id === ImageDataTabId.tags && data.tags)
    );
  }

  selectDataTab(index: number): void {
    this.selectedTabIndex = index;
  }

  locationData(data: ImageData): LocationData | null {
    if (!data.location) return null;
    return {
      name: data.location.name,
      area: data.location.areaName || '',
      coordinates: data.location?.coords 
        ? `(${data.location.coords.lat} N, ${data.location.coords.lon} E)` 
        : '',
      nameURL: `/${this.route.locationRoute(data.location.name)}`,
      areaURL: data.location.areaName 
        ?`/${this.route.locationRoute(data.location.areaName)}`
        : ''
    }
  }

  timeData(data: ImageData): TimeData {
    return {
      time: `${this.utility.monthName(data.month)} ${data.year}`,
      timeURL: `/${this.route.monthRoute(`${data.year}`, `${data.month}`)}`
    }
  }

  tagsData(data: ImageData): TagData[] {
    if (!data.tags) return [];
    return data.tags.map(tag => ({
      tag,
      tagURL: `/${this.route.tagRoute(tag)}`
    }));
  }

}
