import { Component, Signal, input, computed } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { RouteService } from '../../../services/route.service';

const DEFAULT_TAB_INDEX = 0;

type CollapsedState = Record<NavigationTabId, Record<string, boolean>>;

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
  isCollapsed = computed<CollapsedState>(() => 
    this.initialVisualState(this.tabs)
  );

  constructor(private router: Router, private routes: RouteService, private layout: LayoutService) {
    this.width = this.layout.screenWidth;
    this.tabs = this.fillTabsWithData();
    this.selectedTab = this.tabs[DEFAULT_TAB_INDEX];
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof ActivationEnd) this.setTabByURL(this.router.url);
    });
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

  initialVisualState(tabs: NavigationTabData[]): CollapsedState {
    return tabs.reduce((accTab, tab) => {
      accTab[tab.id] = tab.galleryGroups().reduce((accGroup, group) => {
        accGroup[group.id] = true;
        return accGroup;
      }, {} as Record<string, boolean>);
      return accTab;
    }, {} as CollapsedState);
  }

  setTabByURL(url: string): void {
    this.selectedTab = this.routes.isLocationRoute(url)
      ? this.tabs.find(tab => tab.id === NavigationTabId.places)!
      : this.routes.isTagRoute(url)
        ? this.tabs.find(tab => tab.id === NavigationTabId.tags)!
        : this.tabs[DEFAULT_TAB_INDEX];
  }

  selectTab(tab: NavigationTabData): void {
    this.selectedTab = tab;
  }

}
