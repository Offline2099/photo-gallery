import { NavigationTabId } from '../../constants/navigation-tabs/navigation-tab-id.enum';

export interface NavigationTab {
  id: NavigationTabId;
  name: {
    full: string;
    short: string;
  };
  isTwoColumnLayout: boolean;
  showImageCount: boolean;
}
