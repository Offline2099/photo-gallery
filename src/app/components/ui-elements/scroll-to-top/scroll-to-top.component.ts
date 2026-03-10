import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  host: { 
    '[class.invisible]': 'verticalOffset < 250',
    '(window:scroll)': 'onScroll()',
    '(click)': 'onClick()'
  },
  imports: [],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {

  verticalOffset: number = 0;

  constructor(private scroller: ViewportScroller) {}

  onScroll(): void {
    this.verticalOffset = this.scroller.getScrollPosition()[1];
  }

  onClick(): void {
    this.scroller.scrollToPosition([0, 0]);
  }

}
