import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationAreaComponent }
  from './components/navigation/navigation-area/navigation-area.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, NavigationAreaComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private data = inject(DataService);
  readonly galleries = this.data.galleries;

}
