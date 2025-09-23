import { Gallery } from './gallery.interface';
import { GalleryGroup } from './gallery-group.interface';

export interface DefaultGalleries {
  byYear: Gallery[];
  byMonth: GalleryGroup[];
  byLocation: GalleryGroup[];
  byTag: GalleryGroup[];
}
