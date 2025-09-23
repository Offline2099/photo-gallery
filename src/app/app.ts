import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DefaultGalleries } from './types/galleries/default-galleries.interface';
import { NavigationAreaComponent } from './components/navigation/navigation-area/navigation-area.component';
import { DataService } from './services/data.service';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, NavigationAreaComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  galleries: DefaultGalleries | null = null;

  constructor(private data: DataService, private routes: RouteService) {
    this.data.getGalleries().subscribe(galleries => {
      this.galleries = galleries;
      this.routes.constructDynamicRoutes(galleries);
    });
  }

}
