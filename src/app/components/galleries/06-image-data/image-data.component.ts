import { Component, Signal, inject, input, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// Constants & Enums
import { GalleryType } from '../../../constants/gallery-type.enum';
import { ImageDataTabId } from '../../../constants/image-data-tabs/image-data-tab-id.enum';
import { IMAGE_DATA_TABS } from '../../../constants/image-data-tabs/image-data-tabs';
// Interfaces
import { Gallery } from '../../../types/galleries/gallery.interface';
import { ImageData } from '../../../types/galleries/image-data.interface';
import { ImageDataTab } from '../../../types/ui/image-data-tab.interface';
// Components
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
// Services
import { RouteService } from '../../../services/route.service';
import { SettingsService } from '../../../services/settings.service';
import { UtilityService } from '../../../services/utility.service';

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

const DEFAULT_TAB_INDEX: number = 0;

@Component({
  selector: 'app-image-data',
  host: { '[class.has-tabs]': 'hasTabs()' },
  imports: [NgTemplateOutlet, RouterLink, ControlButtonComponent],
  templateUrl: './image-data.component.html',
  styleUrl: './image-data.component.scss'
})
export class ImageDataComponent {

  readonly GalleryType = GalleryType;
  readonly ImageDataTabId = ImageDataTabId;

  private route = inject(ActivatedRoute);  
  private routes = inject(RouteService);
  private settings = inject(SettingsService);
  private utility = inject(UtilityService);

  gallery = input.required<Gallery>();
  data = input.required<ImageData>();
  hasTabs = input<boolean>(false);

  showImageCaptions: Signal<boolean> = this.settings.showImageCaptions;
  showImageData: Signal<boolean> = this.settings.showImageData;
  showImageTags: Signal<boolean> = this.settings.showImageTags;

  dataTabs = computed<ImageDataTab[]>(() =>
    this.constructDataTabs(this.hasTabs(), this.data(), this.gallery())
  );
  selectedTabIndex: number = DEFAULT_TAB_INDEX;

  location = computed<LocationData | null>(() => this.locationData(this.data()));
  time = computed<TimeData>(() => this.timeData(this.data()));
  tags = computed<TagData[]>(() => this.tagsData(this.data()));

  locationIcon: string = this.routes.iconRoute('location-icon');
  timeIcon: string = this.routes.iconRoute('calendar-icon');
  tagIcon: string = this.routes.iconRoute('tag-icon');

  currentURL: string = '';

  ngOnInit(): void {
    this.currentURL = `/${this.route.snapshot.url.join('/')}`;
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
      nameURL: `/${this.routes.locationRoute(data.location.name)}`,
      areaURL: data.location.areaName ? `/${this.routes.locationRoute(data.location.areaName)}` : ''
    };
  }

  timeData(data: ImageData): TimeData {
    return {
      time: `${this.utility.monthName(data.month)} ${data.year}`,
      timeURL: `/${this.routes.monthRoute(`${data.year}`, `${data.month}`)}`
    };
  }

  tagsData(data: ImageData): TagData[] {
    if (!data.tags) return [];
    return data.tags.map(tag => ({
      tag,
      tagURL: `/${this.routes.tagRoute(tag)}`
    }));
  }

}
