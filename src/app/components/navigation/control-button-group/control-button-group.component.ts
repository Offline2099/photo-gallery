import { Component, Signal, inject, input, model, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GalleryGroup } from '../../../types/galleries/gallery-group.interface';
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-control-button-group',
  host: { '[class.collapsed]': 'this.isCollapsed() && !this.isDesktop()' },
  imports: [RouterLink, RouterLinkActive, ControlButtonComponent],
  templateUrl: './control-button-group.component.html',
  styleUrl: './control-button-group.component.scss'
})
export class ControlButtonGroupComponent {

  private layout = inject(LayoutService);

  group = input.required<GalleryGroup>();
  isCollapsed = model.required<boolean>();
  showImageCount = input.required<boolean>();

  isDesktop: Signal<boolean> = this.layout.isDesktop;
  label = computed<string>(() => this.constructLabel(this.group(), this.showImageCount()));

  constructLabel(group: GalleryGroup, showImageCount: boolean): string {
    const galleryCount: string = `${group.galleries.length} galleries`;
    const imageCount: string = showImageCount
      ? `${group.galleries.reduce((acc, gallery) => acc + gallery.images.length, 0)} images`
      : '';
    return `(${galleryCount}${showImageCount ? ', ' : ''}${imageCount})`;
  }

  toggleGroup(): void {
    if (this.isDesktop()) return;
    this.isCollapsed.update(value => !value);
  }

}
