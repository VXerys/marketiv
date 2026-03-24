import type { ScrollTrigger } from "@/lib/gsap";

const DEFAULT_START = "top 80%";
const DEFAULT_END = "bottom 60%";

export type ScrollTriggerConfig = Omit<ScrollTrigger.Vars, "trigger" | "markers">;

export function createSectionScrollTrigger(
  trigger: Element | null,
  overrides: ScrollTriggerConfig = {}
): ScrollTrigger.Vars {
  return {
    trigger,
    start: DEFAULT_START,
    end: DEFAULT_END,
    markers: false,
    ...overrides,
  };
}
