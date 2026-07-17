/**
 * ScrollScene — progress tracker for pinned scroll scenes.
 *
 * Reports 0→1 as a tall wrapper element travels through the viewport,
 * along with the wrapper's current viewport rect so callers can position
 * a fixed "stage" without extra layout reads.
 *
 * Listens on the capture phase at document level, so it works whether the
 * page scrolls on window or inside a nested scroll container (e.g. a theme
 * editor preview). rAF-throttled and gated by an IntersectionObserver so
 * nothing runs while the scene is off-screen.
 *
 * Usage:
 *   const scene = new ScrollScene(wrapperEl, (p, rect) => applyTimeline(p, rect));
 *   scene.destroy();
 */

export type SceneProgressCallback = (progress: number, rect: DOMRect) => void;

export class ScrollScene {
  private el: HTMLElement;
  private cb: SceneProgressCallback;
  private rafId: number | null = null;
  private inView = false;
  private io: IntersectionObserver;
  private lastProgress = -1;
  private lastLeft = -1;
  private lastWidth = -1;

  constructor(el: HTMLElement, cb: SceneProgressCallback) {
    this.el = el;
    this.cb = cb;

    this.io = new IntersectionObserver((entries) => {
      this.inView = entries.some((e) => e.isIntersecting);
      if (this.inView) this.schedule();
    });
    this.io.observe(el);

    document.addEventListener('scroll', this.onScrollOrResize, { capture: true, passive: true });
    window.addEventListener('resize', this.onScrollOrResize, { passive: true });
    this.schedule();
  }

  private onScrollOrResize = () => {
    if (this.inView) this.schedule();
  };

  private schedule() {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.measure();
    });
  }

  private measure() {
    const rect = this.el.getBoundingClientRect();
    const scrollable = this.el.offsetHeight - window.innerHeight;
    const progress =
      scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : rect.top <= 0 ? 1 : 0;
    if (
      progress !== this.lastProgress ||
      rect.left !== this.lastLeft ||
      rect.width !== this.lastWidth
    ) {
      this.lastProgress = progress;
      this.lastLeft = rect.left;
      this.lastWidth = rect.width;
      this.cb(progress, rect);
    }
  }

  /** Force a re-measure (e.g. after layout-affecting changes). */
  refresh() {
    this.lastProgress = -1;
    this.schedule();
  }

  destroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.io.disconnect();
    document.removeEventListener('scroll', this.onScrollOrResize, { capture: true });
    window.removeEventListener('resize', this.onScrollOrResize);
  }
}

/**
 * Nearest ancestor that actually scrolls vertically, or null when the
 * window/document is the scroller.
 */
export function getScrollParent(el: Element): Element | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const { overflowY } = getComputedStyle(node);
    if (
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}
