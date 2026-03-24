export interface HeroNavbarMotionConfig {
  scrollDistance: number;
  shrinkScale: number;
  translateY: number;
  blurPx: number;
  hoverDuration: number;
  hoverFadeDuration: number;
}

export const heroNavbarMotionConfig: HeroNavbarMotionConfig = {
  scrollDistance: 240,
  shrinkScale: 0.95,
  translateY: -4,
  blurPx: 8,
  hoverDuration: 0.28,
  hoverFadeDuration: 0.18,
};