import { Service, inject, DOCUMENT, Renderer2, RendererFactory2 } from '@angular/core';

enum ImageType {
  jpeg = 'image/jpeg',
  png = 'image/png'
}

const EXTENSION: Record<ImageType, string> = {
  [ImageType.jpeg]: 'jpg',
  [ImageType.png]: 'png'
};

@Service()
export class DownloadService {

  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  downloadAsJPEG(imageURL: string, imageName: string): void {
    this.downloadImage(imageURL, imageName, ImageType.jpeg);
  }

  downloadAsPNG(imageURL: string, imageName: string): void {
    this.downloadImage(imageURL, imageName, ImageType.png);
  }

  private downloadImage(imageURL: string, imageName: string, imageType: ImageType): void {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) return;
    const img: HTMLImageElement = new Image();
    img.src = imageURL;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (!blob) {
          console.error(`Error converting into type ${imageType}.`);
          return;
        }
        const url: string = URL.createObjectURL(blob);
        this.saveFile(url, imageName, EXTENSION[imageType]);
      }, imageType, 1);
    };
    img.onerror = error => {
      console.error('Error loading image: ', error);
    };
  }

  private saveFile(url: string, name: string, extension: string): void {
    const a: HTMLAnchorElement = this.renderer.createElement('a');
    this.renderer.setAttribute(a, 'href', url);
    this.renderer.setAttribute(a, 'download', `${name}.${extension}`);
    this.renderer.appendChild(this.document.body, a);
    a.click();
    this.renderer.removeChild(this.document.body, a);
    window.URL.revokeObjectURL(url);
  }

}
