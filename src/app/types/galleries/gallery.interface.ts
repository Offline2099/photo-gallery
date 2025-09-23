import { GalleryType } from '../../constants/gallery-type.enum';
import { ImageData } from './image-data.interface';

export interface Gallery {
  type: GalleryType;
  name: {
    short: string;
    full: string;
  }
  path: string;
  images: ImageData[];
}