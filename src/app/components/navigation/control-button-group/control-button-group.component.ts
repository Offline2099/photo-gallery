import { Component, Signal, input, model, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GalleryGroup } from '../../../types/galleries/gallery-group.interface';
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-control-button-group',
  host: { '[class.collapsed]': 'isGroupCollapsed()' },
  imports: [RouterLink, RouterLinkActive, ControlButtonComponent],
  templateUrl: './control-button-group.component.html',
  styleUrl: './control-button-group.component.scss'
})
export class ControlButtonGroupComponent {

  group = input.required<GalleryGroup>();
  countImages = input.required<boolean>();
  isCollapsed = model<boolean>(true);

  isDesktop: Signal<boolean>;

  isGroupCollapsed = computed<boolean>(() => this.isCollapsed() && !this.isDesktop());
  label = computed<string>(() => this.constructLabel(this.group(), this.countImages()));

  constructor(private layout: LayoutService) {
    this.isDesktop = this.layout.isDesktop;
  }

  constructLabel(group: GalleryGroup, countImages: boolean): string {
    const galleriesTotal: number = group.galleries.length;
    const imagesTotal: number = group.galleries.reduce((acc, gallery) => acc + gallery.images.length, 0);
    return `(${galleriesTotal} galleries` + (countImages ? `, ${imagesTotal} images)` : ')');
  }

  toggleGroup(): void {
    if (this.isDesktop()) return;
    this.isCollapsed.update(value => !value);
  }

}
