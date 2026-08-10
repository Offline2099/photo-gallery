import { NavigationTabId } from './navigation-tab-id.enum';
import { NavigationTab } from '../../types/ui/navigation-tab.interface';

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    id: NavigationTabId.years,
    name: {
      full: 'Years and Months',
      short: 'Years'
    },
    isTwoColumnLayout: false,
    showImageCount: true
  },
  {
    id: NavigationTabId.places,
    name: {
      full: 'Places and Locations',
      short: 'Places'
    },
    isTwoColumnLayout: true,
    showImageCount: false
  },
  {
    id: NavigationTabId.tags,
    name: {
      full: 'Tags and Features',
      short: 'Tags'
    },
    isTwoColumnLayout: true,
    showImageCount: false
  }
];
