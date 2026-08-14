import { Service, Signal, inject, computed } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

enum Layout {
  mobile,
  tablet,
  desktopSmall,
  desktopAverage,
  desktopWide
}

const BREAKPOINTS: Record<Layout, string> = {
  [Layout.mobile]: '(max-width: 599px)',
  [Layout.tablet]: '(min-width: 600px) and (max-width: 991px)',
  [Layout.desktopSmall]: '(min-width: 992px) and (max-width: 1199px)',
  [Layout.desktopAverage]: '(min-width: 1200px) and (max-width: 1599px)',
  [Layout.desktopWide]: '(min-width: 1600px)'
};

@Service()
export class LayoutService {

  private observer = inject(BreakpointObserver);

  isMobile = this.observe(BREAKPOINTS[Layout.mobile]);
  isTablet = this.observe(BREAKPOINTS[Layout.tablet]);
  isDesktopSmall = this.observe(BREAKPOINTS[Layout.desktopSmall]);
  isDesktopAverage = this.observe(BREAKPOINTS[Layout.desktopAverage]);
  isDesktopWide = this.observe(BREAKPOINTS[Layout.desktopWide]);
  isDesktop = computed(() => !this.isMobile() && !this.isTablet());

  private observe(feature: string): Signal<boolean> {
    return toSignal(
      this.observer.observe(feature).pipe(map(state => state.matches)),
      { requireSync: true }
    );
  }

}
