import { Routes } from '@angular/router';
import { RouteGuard } from './route.guard';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/galleries/01-gallery/gallery.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    pathMatch: 'full'
  },
  { 
    path: '**',
    component: GalleryComponent,
    canActivate: [RouteGuard]
  }
];
