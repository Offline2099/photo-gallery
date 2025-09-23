import { Gallery } from './gallery.interface';

export interface GalleryGroup {
  name: string;
  path?: string;
  galleries: Gallery[];
}
