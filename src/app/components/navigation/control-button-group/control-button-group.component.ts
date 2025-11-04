import { Component, HostBinding, Signal, input, model, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GalleryGroup } from '../../../types/galleries/gallery-group.interface';
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-control-button-group',
  imports: [RouterLink, RouterLinkActive, ControlButtonComponent],
  templateUrl: './control-button-group.component.html',
  styleUrl: './control-button-group.component.scss'
})
export class ControlButtonGroupComponent {

  @HostBinding('class.collapsed') get _isCollapsed(): boolean {
    return this.isCollapsed() && !this.isDesktop();
  }

  group = input.required<GalleryGroup>();
  countImages = input.required<boolean>();
  isCollapsed = model<boolean>(true);

  label = computed<string>(() => this.constructLabel(this.group(), this.countImages()))

  isDesktop: Signal<boolean>;

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
