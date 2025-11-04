import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, of, catchError } from 'rxjs';
// Constants & Enums
import { LOCATION_GROUPS } from '../constants/locations';
import { TAG_GROUPS } from '../constants/tags';
import { GalleryType } from '../constants/gallery-type.enum';
// Interfaces & Types
import { Gallery } from '../types/galleries/gallery.interface';
import { GalleryGroup } from '../types/galleries/gallery-group.interface';
import { DefaultGalleries } from '../types/galleries/default-galleries.interface';
import { ImageData } from '../types/galleries/image-data.interface';
// Services
import { UtilityService } from './utility.service';
import { RouteService } from './route.service';

const DATA_URL: string = 'data/image-data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  galleries: DefaultGalleries | null = null;
  private areGalleriesConstructed: boolean = false;

  constructor(private http: HttpClient, private utility: UtilityService, private route: RouteService) {}

  getGalleries(): Observable<DefaultGalleries | null> {
    if (this.areGalleriesConstructed) return of(this.galleries as DefaultGalleries);
    return this.http.get<ImageData[]>(DATA_URL).pipe(
      map(data => this.constructGalleries(data)),
      tap(galleries => {
        this.galleries = galleries;
        this.areGalleriesConstructed = true;
      }),
      catchError(error => {
        console.error('Error fetching dynamic routes:', error);
        return of(null);
      })
    );
  }

  isChronological(gallery: Gallery): boolean {
    return gallery.type === GalleryType.month || gallery.type === GalleryType.year;
  }

  private constructGalleries(images: ImageData[]): DefaultGalleries {
    const imagesByYear: Record<number, ImageData[]> = {};
    const imagesByYearAndMonth: Record<number, Record<number, ImageData[]>> = {};
    const imagesByLocation: Record<string, ImageData[]> = {};
    const imagesByTag: Record<string, ImageData[]> = {};
    images.forEach(image => {
      this.prepareImageData(image);
      this.utility.addToRecord(imagesByYear, image.year, image);
      this.utility.addToSubRecord(imagesByYearAndMonth, image.year, image.month, image);
      this.utility.addToRecord(imagesByLocation, image.location?.name, image);
      this.utility.addToRecord(imagesByLocation, image.location?.areaName, image);
      image.tags?.forEach(tag => {
        this.utility.addToRecord(imagesByTag, tag, image);
      });
    })
    return {
      byYear: this.createGalleriesByYear(imagesByYear),
      byMonth: this.createGalleriesByMonth(imagesByYearAndMonth),
      byLocation: this.createGalleriesByLocation(imagesByLocation),
      byTag: this.createGalleriesByTag(imagesByTag)
    }
  }

  private prepareImageData(image: ImageData): void {
    image.index = Number(image.index);
    image.path = this.route.imageRoute(image.year, image.month, image.index);
  }

  private createGalleriesByYear(data: Record<number, ImageData[]>): Gallery[] {
    return Object.entries(data).map(([year, images]) => ({
      type: GalleryType.year,
      name: {
        short: year,
        full: 'Year ' + year,
      },
      path: year,
      images 
    }));
  }

  private createGalleriesByMonth(data: Record<number, Record<number, ImageData[]>>): GalleryGroup[] {
    return Object.entries(data).map(([year, dataByMonth]) => ({
      name: year,
      path: year,
      galleries: Object.entries(dataByMonth).map(([month, images]) => {
        const monthName: string =  this.utility.monthName(Number(month));
        return {
          type: GalleryType.month,
          name: {
            short: monthName,
            full: `${monthName} ${year}`
          },
          path: this.route.monthRoute(year, month),
          images
        }   
      })
    }))
    .sort((a, b) => Number(b.name) - Number(a.name));
  }

  private createGalleriesByLocation(data: Record<string, ImageData[]>): GalleryGroup[] {
    return LOCATION_GROUPS.map(group => ({
      name: group.name,
      galleries: group.locations.map(location => ({
        type: GalleryType.location,
        name: {
          short: location,
          full: `Location: ${location}`
        },
        path: this.route.locationRoute(location),
        images: this.sortImagesByTime(data[location])
      }))
    }));
  }

  private createGalleriesByTag(data: Record<string, ImageData[]>): GalleryGroup[] {
    return TAG_GROUPS.map(group => ({
      name: group.name,
      galleries: group.tags.map(tag => {
        const capitalizedTag: string = this.utility.capitalizeFirstLetter(tag);
        return {
          type: GalleryType.tag,
          name: {
            short: capitalizedTag,
            full: `Tag: ${capitalizedTag}`
          },
          path: this.route.tagRoute(tag),
          images: this.sortImagesByTime(data[tag])
        }
      })
    }));
  }

  private sortImagesByTime(images: ImageData[]): ImageData[] {
    images.sort((a, b) => {
      return a.year === b.year 
        ? a.month === b.month
          ? a.index - b.index
          : b.month - a.month
        : b.year - a.year;
    })
    return images;
  }

}