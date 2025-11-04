import { computed, Injectable, Signal } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { BREAKPOINTS, ScreenWidth } from '../constants/screen-width';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  screenWidth: Signal<ScreenWidth>;
  isDesktop: Signal<boolean>;

  constructor(private observer: BreakpointObserver) {
    const screenWidth: Observable<ScreenWidth> = this.observer.observe(Object.values(BREAKPOINTS)).pipe(
      map(breakpointState => this.getScreenWidthStatus(breakpointState))
    );
    this.screenWidth = toSignal(screenWidth, { requireSync: true });
    this.isDesktop = computed(() => 
      this.screenWidth() !== ScreenWidth.mobile && this.screenWidth() !== ScreenWidth.tablet
    );
  }

  private getScreenWidthStatus(breakpointState: BreakpointState): ScreenWidth {
    return Number(
      Object.entries(BREAKPOINTS).find(([_, value]) => breakpointState.breakpoints[value])![0]
    ) as ScreenWidth;
  }

}