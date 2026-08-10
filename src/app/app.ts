import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DefaultGalleries } from './types/galleries/default-galleries.interface';
import { NavigationAreaComponent } from './components/navigation/navigation-area/navigation-area.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, NavigationAreaComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private data = inject(DataService);
  readonly galleries: DefaultGalleries | null = this.data.galleries;

}
