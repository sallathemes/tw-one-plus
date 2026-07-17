/**
 * ScrollScene — progress tracker for pinned (position: sticky) scroll scenes.
 *
 * Reports 0→1 as a tall wrapper element scrolls through the viewport.
 * rAF-throttled, passive listeners, and gated by an IntersectionObserver so
 * nothing runs while the scene is off-screen.
 *
 * Usage:
 *   const scene = new ScrollScene(wrapperEl, (p) => applyTimeline(p));
 *   scene.destroy();
 */

export type SceneProgressCallback = (progress: number) => void;

export class ScrollScene {
  private el: HTMLElement;
  private cb: SceneProgressCallback;
  private rafId: number | null = null;
  private inView = false;
  private io: IntersectionObserver;
  private lastProgress = -1;

  constructor(el: HTMLElement, cb: SceneProgressCallback) {
    this.el = el;
    this.cb = cb;

    this.io = new IntersectionObserver((entries) => {
      this.inView = entries.some((e) => e.isIntersecting);
      if (this.inView) this.schedule();
    });
    this.io.observe(el);

    window.addEventListener('scroll', this.onScrollOrResize, { passive: true });
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
    if (progress !== this.lastProgress) {
      this.lastProgress = progress;
      this.cb(progress);
    }
  }

  /** Force a re-measure (e.g. after layout-affecting changes). */
  refresh() {
    this.schedule();
  }

  destroy() {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.io.disconnect();
    window.removeEventListener('scroll', this.onScrollOrResize);
    window.removeEventListener('resize', this.onScrollOrResize);
  }
}
