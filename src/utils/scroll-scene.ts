/**
 * ScrollScene — progress tracker for pinned scroll scenes.
 *
 * Reports 0→1 as a tall wrapper element travels through the viewport,
 * along with the wrapper's current viewport rect and effective viewport
 * height, so callers can position a fixed "stage" without extra layout
 * reads.
 *
 * Self-driving: runs a continuous rAF loop for as long as the scene exists,
 * rather than depending on a 'scroll' event firing or an IntersectionObserver
 * gate. Both were tried and both proved unreliable inside real theme-editor
 * preview shells: some scroll via a transformed wrapper or a non-composed
 * shadow-DOM scroller that never dispatches an observable scroll event, and
 * — confirmed directly in Salla's own local preview shell — a shell that
 * gives `<body>` an explicit fixed height + `overflow-y: auto` (so `<body>`
 * scrolls independently, like an ordinary div) can leave a same-origin,
 * default-root IntersectionObserver permanently reporting `isIntersecting:
 * false` for elements that are genuinely on-screen. Plain rAF polling has
 * no such dependency: it just re-reads geometry every frame. The cost is one
 * cross-frame-aware rect read per active scene per frame, which is cheap —
 * there are only ever a handful of these on a page — and the callback itself
 * still only fires when the computed values actually change, so nothing
 * animates or writes styles while a scene is sitting off-screen.
 *
 * Cross-frame aware: theme-editor previews sometimes render the storefront
 * inside an iframe that never scrolls internally at all — the OUTER page
 * does 100% of the scrolling instead (an auto-sized preview iframe is the
 * common cause). Read purely from inside such an iframe, getBoundingClientRect()
 * and window.innerHeight are permanently frozen no matter how far the user
 * scrolls the outer page. Every measurement here is projected through same-
 * origin ancestor frames (via window.frameElement) to the nearest window that
 * actually has scroll capacity of its own; a frame that already scrolls
 * internally (including the body-scrolls-independently case above) is used
 * as-is with no projection, so plain (non-iframe) pages behave exactly as
 * before.
 *
 * Usage:
 *   const scene = new ScrollScene(wrapperEl, (p, rect, vh) => applyTimeline(p, rect, vh));
 *   scene.destroy();
 */

export type SceneProgressCallback = (
  progress: number,
  rect: DOMRect,
  viewportHeight: number
) => void;

export interface ProjectedRect {
  top: number;
  left: number;
  width: number;
  height: number;
  /** The window actually responsible for scrolling this element into view. */
  win: Window;
}

/**
 * True when `win`'s own document can scroll far enough on its own to reveal
 * content beyond one viewport height — checked against both `documentElement`
 * and `body`, since some embedding shells give `<body>` an explicit fixed
 * height + `overflow-y: auto` instead of leaving it as the page's normal
 * in-flow root scroller. In that setup `<body>` behaves like any other
 * scrollable `<div>`: it scrolls and dispatches its own scroll events, but
 * `window.scrollY`/`documentElement.scrollTop` never move — getBoundingClientRect()
 * already accounts for that transparently, so as long as *some* element in
 * this frame is really scrolling, there is nothing to project outward.
 */
function hasLocalScrollCapacity(win: Window): boolean {
  const doc = win.document;
  const contentHeight = Math.max(doc.documentElement.scrollHeight, doc.body?.scrollHeight ?? 0);
  return contentHeight - win.innerHeight > 1;
}

/**
 * Projects `el`'s rect from its own frame's coordinate space out through
 * same-origin ancestor iframes to the window that's really scrolling — but
 * only as far as needed. If the current frame can already scroll far enough
 * on its own (see hasLocalScrollCapacity), its rect is used as-is. Only a
 * frame with zero scroll capacity of its own — the auto-height preview-iframe
 * pattern, where the OUTER page does 100% of the scrolling and the iframe's
 * own document never moves — triggers a walk outward, stopping at the first
 * ancestor that does have scroll capacity, at the true top-level window, or
 * at a cross-origin boundary (`frameElement` reads as null there, per spec).
 */
export function projectToScrollingWindow(el: Element): ProjectedRect {
  const r = el.getBoundingClientRect();
  let top = r.top;
  let left = r.left;
  let win: Window = window;

  if (!hasLocalScrollCapacity(win)) {
    while (win.frameElement) {
      const frameRect = win.frameElement.getBoundingClientRect();
      top += frameRect.top;
      left += frameRect.left;
      win = win.parent;
      if (hasLocalScrollCapacity(win)) break;
    }
  }

  return { top, left, width: r.width, height: r.height, win };
}

/**
 * Scrolls `el` to `offsetPx` past its current position, preferring a
 * scrollable ancestor within the same document (see getScrollParent) and
 * otherwise scrolling the window that's actually responsible for revealing
 * this element — which, inside an auto-sized preview iframe, is an outer
 * same-origin ancestor window rather than the local one.
 */
export function scrollElementBy(el: HTMLElement, offsetPx: number) {
  const scroller = getScrollParent(el);
  if (scroller) {
    scroller.scrollTo({ top: scroller.scrollTop + offsetPx, behavior: 'smooth' });
    return;
  }
  const { win } = projectToScrollingWindow(el);
  win.scrollTo({ top: win.scrollY + offsetPx, behavior: 'smooth' });
}

export class ScrollScene {
  private el: HTMLElement;
  private cb: SceneProgressCallback;
  private rafId: number | null = null;
  private alive = true;
  private lastProgress = -1;
  private lastTop = NaN;
  private lastLeft = NaN;
  private lastWidth = NaN;

  constructor(el: HTMLElement, cb: SceneProgressCallback) {
    this.el = el;
    this.cb = cb;
    this.loop();
  }

  private loop = () => {
    if (!this.alive) {
      this.rafId = null;
      return;
    }
    this.measure();
    this.rafId = requestAnimationFrame(this.loop);
  };

  private measure() {
    const { top, left, width, height, win } = projectToScrollingWindow(this.el);
    const viewportHeight = win.innerHeight;
    const scrollable = height - viewportHeight;
    const progress =
      scrollable > 0 ? Math.min(1, Math.max(0, -top / scrollable)) : top <= 0 ? 1 : 0;

    if (
      progress !== this.lastProgress ||
      top !== this.lastTop ||
      left !== this.lastLeft ||
      width !== this.lastWidth
    ) {
      this.lastProgress = progress;
      this.lastTop = top;
      this.lastLeft = left;
      this.lastWidth = width;
      const rect = { top, left, width, height, bottom: top + height, right: left + width } as DOMRect;
      this.cb(progress, rect, viewportHeight);
    }
  }

  /** Force a re-measure (e.g. after layout-affecting changes). */
  refresh() {
    this.lastProgress = -1;
    if (this.alive && this.rafId === null) this.loop();
  }

  destroy() {
    this.alive = false;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
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
