import { Component, HostBinding, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {

  @HostBinding('class.invisible') get isInvisible(): boolean { 
    return this.verticalOffset < 250;
  }

  @HostListener('window:scroll') onScroll() {
    this.verticalOffset = this.scroller.getScrollPosition()[1];
  }

  @HostListener('click') onClick() {
    this.scroller.scrollToPosition([0, 0]);
  }

  verticalOffset: number = 0;

  constructor(private scroller: ViewportScroller) {}

}
