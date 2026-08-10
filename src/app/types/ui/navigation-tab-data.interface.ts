import { NavigationTab } from './navigation-tab.interface';
import { GalleryGroup } from '../galleries/gallery-group.interface';

export interface NavigationTabData extends NavigationTab {
  galleryGroups: GalleryGroup[];
}
