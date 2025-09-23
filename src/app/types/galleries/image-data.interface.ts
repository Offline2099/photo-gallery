export interface ImageData {
  year: number;
  month: number;
  index: number;
  path?: string;
  caption?: string;
  location?: {
    name: string;
    areaName?: string;
    coords?: {
      lat: number;
      lon: number;
    }
  }
  tags?: string[];
}