import { ImageDataTab } from '../types/ui/image-data-tab.interface';

export enum ImageDataTabId {
  time,
  location,
  tags
}

export const IMAGE_DATA_TABS: ImageDataTab[] = [
  {
    id: ImageDataTabId.location,
    name: 'Location'
  },
  {
    id: ImageDataTabId.time,
    name: 'Time'
  },
  {
    id: ImageDataTabId.tags,
    name: 'Tags'
  }
];