import { Gallery } from './gallery.interface';

export interface GalleryGroup {
  id: string;
  name: string;
  path?: string;
  galleries: Gallery[];
}
