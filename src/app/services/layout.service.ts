import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { BREAKPOINTS, ScreenWidth } from '../constants/screen-width';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  screenWidth$: Observable<ScreenWidth>;
  isDesktop$: Observable<boolean>;

  constructor(private observer: BreakpointObserver) {
    this.screenWidth$ = this.observer.observe(Object.values(BREAKPOINTS)).pipe(
      map(breakpointState => this.getScreenWidthStatus(breakpointState))
    );
    this.isDesktop$ = this.screenWidth$.pipe(
      map(width => width !== ScreenWidth.mobile && width !== ScreenWidth.tablet)
    );
  }

  private getScreenWidthStatus(breakpointState: BreakpointState): ScreenWidth {
    return Number(
      Object.entries(BREAKPOINTS).find(([_, value]) => breakpointState.breakpoints[value])![0]
    ) as ScreenWidth;
  }

}