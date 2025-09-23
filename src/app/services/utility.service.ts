import { Injectable } from '@angular/core';

const MONTHS_IN_YEAR: number = 12;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private readonly MONTH_NAMES: string[] = this.getMonthNames();

  private getMonthNames(): string[] {
    return Array.from({ length: MONTHS_IN_YEAR }, (_, i) => 
      new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, i))
    );
  }

  monthName(month: number): string {
    if (month < 1 || month > MONTHS_IN_YEAR) return '';
    return this.MONTH_NAMES[month - 1];
  }

  addLeadingZeroes(number: number, digits: number = 2): string {
    let str: string = `${Math.abs(Math.round(number))}`;
    while (str.length < digits) str = `0${str}`;
    return `${number < 0 ? '-' : ''}${str}`;
  }

  toDashCase(str: string): string {
    return str
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s|\s\s+/g, '-')
      .toLowerCase();
  }

  capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  addToRecord<T extends number | string, Data>(
    group: Record<T, Data[]>,
    key: T | undefined,
    data: Data
  ): void {
    if (!key) return;
    if (!group[key]) group[key] = [];
    group[key].push(data);
  }

  addToSubRecord<T extends number | string, U extends number | string, Data>(
    group: Record<T, Record<U, Data[]>>,
    groupKey: T | undefined,
    subGroupKey: U | undefined,
    data: Data
  ): void {
    if (!groupKey || !subGroupKey) return;
    if (!group[groupKey]) group[groupKey] = {} as Record<U, Data[]>;
    if (!group[groupKey][subGroupKey]) group[groupKey][subGroupKey] = [];
    group[groupKey][subGroupKey].push(data);
  }

  downloadAsJPEG(url: string, imageName: string): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${imageName}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/jpeg');
    }
    img.onerror = (error) => {
      console.error('Error loading image: ', error);
    }
  }

}