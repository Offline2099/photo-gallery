export enum ScreenWidth {
  mobile,
  tablet,
  desktopSmall,
  desktopAverage,
  desktopWide
}

export const BREAKPOINTS: Record<ScreenWidth, string> = {
  [ScreenWidth.mobile]: '(max-width: 599px)',
  [ScreenWidth.tablet]: '(min-width: 600px) and (max-width: 991px)',
  [ScreenWidth.desktopSmall]: '(min-width: 992px) and (max-width: 1199px)',
  [ScreenWidth.desktopAverage]: '(min-width: 1200px) and (max-width: 1599px)',
  [ScreenWidth.desktopWide]: '(min-width: 1600px)'
}
