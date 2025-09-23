import { Signal } from '@angular/core';
import { GalleryGroup } from '../galleries/gallery-group.interface';
import { NavigationTab } from './navigation-tab.interface';

export interface NavigationTabData extends NavigationTab {
  galleryGroups: Signal<GalleryGroup[]>;
}