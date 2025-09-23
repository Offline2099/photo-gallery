import { NavigationTabId } from '../../constants/navigation-tabs';

export interface NavigationTab {
  id: NavigationTabId;
  name: {
    full: string;
    short: string;
  }
  isTwoColumnLayout: boolean;
  countImages: boolean;
}