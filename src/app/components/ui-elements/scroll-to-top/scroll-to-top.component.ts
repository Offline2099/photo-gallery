import { Component, inject } from '@angular/core';
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

  private scroller = inject(ViewportScroller);
  verticalOffset = 0;

  onScroll(): void {
    const [_, y] = this.scroller.getScrollPosition();
    this.verticalOffset = y;
  }

  onClick(): void {
    this.scroller.scrollToPosition([0, 0]);
  }

}
