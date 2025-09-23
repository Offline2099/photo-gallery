import { NavigationTab } from '../types/ui/navigation-tab.interface';

export enum NavigationTabId {
  years,
  places,
  tags
}

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    id: NavigationTabId.years,
    name: {
      full: 'Years and Months',
      short: 'Years'
    },
    isTwoColumnLayout: false,
    countImages: true
  },
  {
    id: NavigationTabId.places,
    name: {
      full: 'Places and Locations',
      short: 'Places'
    },
    isTwoColumnLayout: true,
    countImages: false
  },
  {
    id: NavigationTabId.tags,
    name: {
      full: 'Tags and Features',
      short: 'Tags'
    },
    isTwoColumnLayout: true,
    countImages: false
  }
];
