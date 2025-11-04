import { Component, Signal, input, computed } from '@angular/core';
// Constants & Enums
import { ScreenWidth } from '../../../constants/screen-width';
import { NAVIGATION_TABS, NavigationTabId } from '../../../constants/navigation-tabs';
// Interfaces
import { NavigationTabData } from '../../../types/ui/navigation-tab-data.interface';
import { DefaultGalleries } from '../../../types/galleries/default-galleries.interface';
import { GalleryGroup } from '../../../types/galleries/gallery-group.interface';
// Components
import { ControlButtonComponent } from '../../ui-elements/control-button/control-button.component';
import { ControlButtonGroupComponent } from '../control-button-group/control-button-group.component';
// Services
import { LayoutService } from '../../../services/layout.service';

const DEFAULT_TAB_INDEX = 0;

@Component({
  selector: 'app-navigation-area',
  imports: [ControlButtonComponent, ControlButtonGroupComponent],
  templateUrl: './navigation-area.component.html',
  styleUrl: './navigation-area.component.scss'
})
export class NavigationAreaComponent {

  readonly ScreenWidth = ScreenWidth;

  galleries = input.required<DefaultGalleries | null>();

  tabs: NavigationTabData[];
  selectedTab: NavigationTabData;

  width: Signal<ScreenWidth>;
  isCollapsed = computed<Record<NavigationTabId, Record<string, boolean>>>(() => 
    this.initialVisualState(this.tabs)
  );

  constructor(private layout: LayoutService) {
    this.tabs = this.fillTabsWithData();
    this.selectedTab = this.tabs[DEFAULT_TAB_INDEX];
    this.width = this.layout.screenWidth;
  }

  fillTabsWithData(): NavigationTabData[] {
    return NAVIGATION_TABS.map(tab => ({
      ...tab,
      galleryGroups: computed<GalleryGroup[]>(() => 
        this.galleries() !== null ? this.galleryGroupsForTab(tab.id, this.galleries()!) : []
      )
    }));
  }

  galleryGroupsForTab(id: NavigationTabId, galleries: DefaultGalleries): GalleryGroup[] {
    switch (id) {
      case NavigationTabId.years:
        return galleries.byMonth;
      case NavigationTabId.places:
        return galleries.byLocation;
      case NavigationTabId.tags:
        return galleries.byTag;
    }
  }

  initialVisualState(tabs: NavigationTabData[]): Record<NavigationTabId, Record<string, boolean>> {
    return tabs.reduce((accOuter, tab) => {
      accOuter[tab.id] = tab.galleryGroups().reduce((accInner, group) => {
        accInner[group.name] = true;
        return accInner;
      }, {} as Record<string, boolean>);
      return accOuter;
    }, {} as Record<NavigationTabId, Record<string, boolean>>)
  }

  selectTab(tab: NavigationTabData): void {
    this.selectedTab = tab;
  }

}
