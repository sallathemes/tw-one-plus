import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import AOS from '../../utils/animate-on-scroll';
import { ScrollScene } from '../../utils/scroll-scene';
import { clamp, easeInOutCubic, holdEase, mixHex } from '../../utils/motion';
import '../../utils/fonts';

/**
 * Scroll-driven motion spec for the color-discovery scene.
 * Every number that shapes the feel lives here — tune without touching logic.
 * Segment count derives from config.variants, so adding colors just works.
 */
const SCENE = {
  segmentVh: 80, // extra scroll length per color transition
  tailSegments: 0.35, // rest on the final color before the section unpins
  hold: 0.45, // fraction of each segment a color rests before easing onward
  tintStrength: 0.93, // how far the ambient tint leans back toward the base bg
  product: { blur: 8, scaleOut: 0.96, scaleIn: 1.04, rotate: 1.2, dim: 0.05 },
  lifestyle: { zoom: 0.05, parallax: 12 },
};

export default class StVariants extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    brand_color: string;
    section_title: string;
    selector_label: string;
    variants: Array<{
      product_image: string;
      side_image: string;
      color_hex: string;
      color_title: string;
    }>;
  };

  @state() private activeIndex = 0;
  @state() private lightboxOpen = false;
  @state() private lightboxSrc = '';

  private styleElement: HTMLStyleElement | null = null;
  private scene: ScrollScene | null = null;
  private sceneVariantCount = 0;
  private lastTimeline = 0;
  private productLayers: HTMLElement[] = [];
  private mobileLayers: HTMLElement[] = [];
  private sideLayers: HTMLElement[] = [];

  // Render in light DOM so Salla styles work correctly
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.scene?.destroy();
    this.scene = null;
    this.styleElement?.remove();
    this.styleElement = null;
  }

  private get variants() {
    return this.config?.variants || [];
  }

  private get activeVariant() {
    return this.variants[Math.min(this.activeIndex, this.variants.length - 1)];
  }

  private get reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private get sceneEnabled() {
    return this.variants.length > 1 && !this.reducedMotion;
  }

  /** Total scroll span in "segments": (n-1) transitions + a tail rest. */
  private get span() {
    return this.variants.length - 1 + SCENE.tailSegments;
  }

  /** Ambient background tint for the active color. */
  private get tint() {
    const base = this.config?.bg_color || '#ffffff';
    const hex = this.activeVariant?.color_hex;
    return hex ? mixHex(hex, base, SCENE.tintStrength) : base;
  }

  // ── Scroll timeline ─────────────────────────────────────────────

  /**
   * Maps pin progress (0..1) to a continuous timeline value t (0..n-1)
   * where integer values are fully-resting colors and fractional values
   * are mid-crossfade. Each segment holds before easing to the next.
   */
  private timelineFromProgress(p: number): number {
    const n = this.variants.length;
    if (n < 2) return 0;
    const u = clamp(p * this.span, 0, n - 1);
    const i = Math.min(Math.floor(u), n - 2);
    return i + holdEase(u - i, SCENE.hold);
  }

  private onSceneProgress = (p: number) => {
    this.applyTimeline(this.timelineFromProgress(p));
  };

  private applyTimeline(t: number) {
    this.lastTimeline = t;
    const n = this.variants.length;

    for (let i = 0; i < n; i++) {
      const layerT = this.sceneEnabled ? t : this.activeIndex;
      if (this.productLayers[i]) this.styleProductLayer(this.productLayers[i], i, layerT);
      if (this.mobileLayers[i]) this.styleLifestyleLayer(this.mobileLayers[i], i, layerT);
      if (this.sideLayers[i]) this.styleLifestyleLayer(this.sideLayers[i], i, layerT);
    }

    const idx = Math.round(clamp(t, 0, n - 1));
    if (idx !== this.activeIndex) this.activeIndex = idx;
  }

  /** Product shot: crossfade + counter-scale + subtle rotate/blur/dim. */
  private styleProductLayer(el: HTMLElement, i: number, t: number) {
    const d = t - i;
    const a = clamp(Math.abs(d));
    const eased = easeInOutCubic(a);
    const { blur, scaleOut, scaleIn, rotate, dim } = SCENE.product;

    const scale = d >= 0 ? 1 - (1 - scaleOut) * eased : 1 + (scaleIn - 1) * eased;
    const deg = -clamp(d, -1, 1) * rotate;
    const blurPx = blur * eased;

    el.style.opacity = String(1 - eased);
    el.style.transform = `scale(${scale.toFixed(4)}) rotate(${deg.toFixed(3)}deg)`;
    el.style.filter =
      blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px) brightness(${(1 - dim * eased).toFixed(3)})` : 'none';
    el.style.visibility = a >= 0.999 ? 'hidden' : 'visible';
  }

  /** Lifestyle shot: crossfade + tiny zoom + directional parallax drift. */
  private styleLifestyleLayer(el: HTMLElement, i: number, t: number) {
    const d = t - i;
    const a = clamp(Math.abs(d));
    const eased = easeInOutCubic(a);
    const { zoom, parallax } = SCENE.lifestyle;

    const scale = 1 + zoom * eased;
    const y = -clamp(d, -1, 1) * parallax;

    el.style.opacity = String(1 - eased);
    el.style.transform = `scale(${scale.toFixed(4)}) translateY(${y.toFixed(2)}px)`;
    el.style.visibility = a >= 0.999 ? 'hidden' : 'visible';
  }

  // ── Lifecycle wiring ────────────────────────────────────────────

  private cacheLayers() {
    this.productLayers = Array.from(this.querySelectorAll('.st-variants__product-image'));
    this.mobileLayers = Array.from(this.querySelectorAll('.st-variants__mobile-side-image'));
    this.sideLayers = Array.from(this.querySelectorAll('.st-variants__side-image'));
  }

  private syncScene() {
    const wrap = this.querySelector('.st-variants__scroll') as HTMLElement | null;
    const count = this.variants.length;

    if (this.scene && this.sceneVariantCount !== count) {
      this.scene.destroy();
      this.scene = null;
    }
    if (!this.scene && wrap && this.sceneEnabled) {
      this.sceneVariantCount = count;
      this.scene = new ScrollScene(wrap, this.onSceneProgress);
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    this.cacheLayers();
    this.syncScene();
    this.applyTimeline(this.lastTimeline);
    AOS.refresh();
  }

  // ── Interactions ────────────────────────────────────────────────

  /** Dot click: drive the scroll to the color's resting segment so the
   *  scroll position stays the single source of truth for the scene. */
  private goToVariant(index: number) {
    const wrap = this.querySelector('.st-variants__scroll') as HTMLElement | null;
    if (!this.sceneEnabled || !wrap) {
      this.activeIndex = index;
      this.applyTimeline(index);
      return;
    }
    const scrollable = wrap.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const top = window.scrollY + wrap.getBoundingClientRect().top + (index / this.span) * scrollable;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  private openLightbox(src: string) {
    if (!src) return;
    this.lightboxSrc = src;
    this.lightboxOpen = true;
  }

  private closeLightbox() {
    this.lightboxOpen = false;
  }

  // ── Styles ──────────────────────────────────────────────────────

  injectStyles() {
    if (this.styleElement) return;

    const bgColor = this.config?.bg_color || '#ffffff';
    const primaryColor = this.config?.primary_color || '#050505';
    const brandColor = this.config?.brand_color || '#0071E3';
    const grayColor = '#F8F8F8';
    const darkGrayColor = '#DDDDDD';
    const luxEase = 'cubic-bezier(.22, 1, .36, 1)';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      .st-variants {
        display: block;
        width: 100%;
        color: ${primaryColor};
        overflow: clip;
        transition: background-color 0.7s ease;
      }

      /* Tall wrapper that creates the pin; sticky stage rides inside it */
      .st-variants__scroll {
        height: calc(100vh + var(--stv-extra, 0vh));
        height: calc(100svh + var(--stv-extra, 0vh));
      }

      .st-variants__scroll.is-static { height: auto; }

      .st-variants__sticky {
        position: sticky;
        top: 0;
        min-height: 100vh;
        min-height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .st-variants__scroll.is-static .st-variants__sticky {
        position: static;
        min-height: 0;
      }

      .st-variants__container {
        max-width: 1440px;
        width: 100%;
        margin: 0 auto;
        padding: 2.5rem 0.5rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      @media (min-width: 768px) {
        .st-variants__container { padding: 52px 1rem 3rem; gap: 2rem; }
      }

      @media (min-width: 1024px) {
        .st-variants__container { padding: 52px 2.5rem 3rem; }
      }

      @media (min-width: 1280px) {
        .st-variants__container { padding: 52px 88px 3rem; }
      }

      .st-variants__title {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.35;
        margin: 0;
        text-align: start;
      }

      @media (min-width: 768px) {
        .st-variants__title { font-size: 1.875rem; line-height: 40px; }
      }

      @media (min-width: 1024px) {
        .st-variants__title { font-size: 2.25rem; line-height: 48px; }
      }

      @media (min-width: 1280px) {
        .st-variants__title { font-size: 40px; line-height: 64px; }
      }

      /* Split layout: selector panel 42% / lifestyle image 58%, fixed 654px on lg */
      .st-variants__layout {
        display: flex;
        position: relative;
      }

      @media (min-width: 1024px) {
        .st-variants__layout { height: 654px; }
      }

      /* Selector panel — gray bg + border + asymmetric rounding (matches source) */
      .st-variants__selector {
        background: ${grayColor};
        border: 1px solid ${darkGrayColor};
        border-start-start-radius: 0.75rem;
        border-start-end-radius: 0.75rem;
        width: 100%;
        min-width: 35%;
        padding: 2rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      @media (min-width: 768px) {
        .st-variants__selector { padding: 2rem 1.5rem; }
      }

      @media (min-width: 1024px) {
        .st-variants__selector {
          width: 42%;
          padding: 2rem 38px;
          border-start-end-radius: 0;
          border-end-start-radius: 0.75rem;
        }
      }

      .st-variants__product-wrap {
        display: flex;
        position: relative;
        align-items: center;
        flex-grow: 1;
        width: 100%;
        padding: 0.25rem;
      }

      @media (min-width: 640px) {
        .st-variants__product-wrap { padding: 1rem; }
      }

      /* ── Stacked crossfade layers (scroll-driven, GPU-only props) ── */
      .st-variants__layer {
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        will-change: transform, opacity, filter;
        backface-visibility: hidden;
      }

      .st-variants__scroll.is-static .st-variants__layer {
        transition: opacity 0.5s ${luxEase};
      }

      /* Product shot stack — circular floating badge on mobile, main image on lg */
      .st-variants__product-stack {
        position: absolute;
        top: 6%;
        inset-inline-start: 2%;
        width: 10rem;
        height: 10rem;
        border-radius: 9999px;
        overflow: hidden;
        z-index: 20;
        cursor: pointer;
      }

      @media (min-width: 1024px) {
        .st-variants__product-stack {
          position: relative;
          top: 0;
          inset-inline-start: 0;
          width: 100%;
          height: 100%;
          border-radius: 0;
          overflow: visible;
          z-index: auto;
        }
      }

      .st-variants__product-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      @media (min-width: 1024px) {
        .st-variants__product-image { margin: auto; max-height: 400px; }
      }

      /* Mobile lifestyle stack (hidden on lg, where the side panel takes over) */
      .st-variants__mobile-media {
        position: relative;
        width: 100%;
        height: max(55vh, 375px);
        border-radius: 0.75rem;
        overflow: hidden;
        cursor: pointer;
      }

      @media (min-width: 1024px) {
        .st-variants__mobile-media { display: none; }
      }

      .st-variants__mobile-side-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .st-variants__selector-footer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }

      .st-variants__selector-label {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 700;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-variants__selector-label { font-size: 1.25rem; line-height: 2rem; }
      }

      @media (min-width: 1024px) {
        .st-variants__selector-label { font-size: 1.5rem; line-height: 2.25rem; }
      }

      /* Color buttons — horizontal scrollable row (matches source) */
      .st-variants__color-buttons {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        overflow-x: auto;
        padding: 0.375rem 0.25rem;
        scrollbar-width: thin;
        scrollbar-color: ${brandColor} #F1F1F1;
      }

      .st-variants__color-btn {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem 0;
        flex-shrink: 0;
      }

      .st-variants__color-btn:first-of-type { padding-inline-start: 0.25rem; }

      /* Dots: constant box size (no layout shift) — active state is pure
         transform + a glowing ring that breathes in via box-shadow */
      .st-variants__color-dot {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 9999px;
        position: relative;
        z-index: 20;
        flex-shrink: 0;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: transform 0.45s ${luxEase}, box-shadow 0.45s ${luxEase};
      }

      .st-variants__color-btn.is-active .st-variants__color-dot {
        transform: scale(1.15);
        box-shadow:
          inset 0 0 0 1px rgba(0, 0, 0, 0.08),
          0 0 0 2.5px ${bgColor},
          0 0 0 4px ${brandColor};
        box-shadow:
          inset 0 0 0 1px rgba(0, 0, 0, 0.08),
          0 0 0 2.5px ${bgColor},
          0 0 0 4px ${brandColor},
          0 0 14px color-mix(in srgb, ${brandColor} 45%, transparent);
      }

      @keyframes stVariantsLabelIn {
        from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
        to { opacity: 1; transform: translateY(0); filter: blur(0); }
      }

      .st-variants__color-label {
        max-width: 0;
        overflow: hidden;
        white-space: nowrap;
        opacity: 0;
        margin-inline-start: 0;
        color: ${brandColor};
        font-size: 0.875rem;
        font-weight: 700;
        transition: max-width 0.5s ${luxEase}, margin-inline-start 0.5s ${luxEase};
      }

      @media (min-width: 1024px) {
        .st-variants__color-label { font-size: 1rem; }
      }

      .st-variants__color-btn.is-active .st-variants__color-label {
        max-width: 200px;
        margin-inline-start: 8px;
        animation: stVariantsLabelIn 0.5s ${luxEase} both;
      }

      /* Desktop lifestyle panel — 58%, gray bg, end-side rounding */
      .st-variants__side-panel {
        display: none;
        cursor: pointer;
        position: relative;
        width: 58%;
        height: 100%;
        background: ${grayColor};
        border-start-end-radius: 0.75rem;
        border-end-end-radius: 0.75rem;
        overflow: hidden;
      }

      @media (min-width: 1024px) {
        .st-variants__side-panel { display: block; }
      }

      .st-variants__side-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* Decorative pointer arrow (desktop only, matches source) */
      .st-variants__pointer {
        position: absolute;
        top: -2rem;
        inset-inline-end: -2px;
        width: 101px;
        height: 103px;
        display: none;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      @media (min-width: 1024px) {
        .st-variants__pointer { display: flex; }
      }

      .st-variants__pointer img {
        width: 101px;
        height: 103px;
        display: block;
      }

      .st-variants__lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(34, 34, 34, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-variants__lightbox-inner {
        position: relative;
        max-width: 85vw;
        max-height: 85vh;
      }

      @media (min-width: 1024px) {
        .st-variants__lightbox-inner { max-width: 75vw; }
      }

      .st-variants__lightbox-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
        max-height: 85vh;
      }

      .st-variants__lightbox-close {
        position: absolute;
        top: -2.5rem;
        right: 0;
        background: transparent;
        color: white;
        border: none;
        font-size: 1.75rem;
        cursor: pointer;
      }

      @media (prefers-reduced-motion: reduce) {
        .st-variants *,
        .st-variants *::before,
        .st-variants *::after {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  // ── Render ──────────────────────────────────────────────────────

  render() {
    if (!this.config || this.variants.length === 0) {
      return html`<div>Configuration is required</div>`;
    }

    const variants = this.variants;
    const active = this.activeVariant;
    const extraVh = this.sceneEnabled ? this.span * SCENE.segmentVh : 0;

    return html`
      <section class="st-variants" style="background-color: ${this.tint};">
        <div
          class="${classMap({ 'st-variants__scroll': true, 'is-static': !this.sceneEnabled })}"
          style="--stv-extra: ${extraVh}vh"
        >
          <div class="st-variants__sticky">
            <div class="st-variants__container">
              <h3 class="st-variants__title" data-animate="fade-up">
                ${this.config.section_title}
              </h3>

              <div class="st-variants__layout" data-animate="fade-up">
                <!-- Selector panel -->
                <div class="st-variants__selector">
                  <div class="st-variants__product-wrap">
                    <div
                      class="st-variants__product-stack"
                      @click="${() => this.openLightbox(active.product_image)}"
                    >
                      ${variants.map(
                        (variant) => html`
                          <img
                            src="${variant.product_image}"
                            alt="${variant.color_title}"
                            loading="eager"
                            decoding="async"
                            class="st-variants__layer st-variants__product-image"
                          />
                        `
                      )}
                    </div>

                    <div
                      class="st-variants__mobile-media"
                      @click="${() => this.openLightbox(active.side_image)}"
                    >
                      ${variants.map(
                        (variant) => html`
                          <img
                            src="${variant.side_image}"
                            alt="${variant.color_title}"
                            loading="eager"
                            decoding="async"
                            class="st-variants__layer st-variants__mobile-side-image"
                          />
                        `
                      )}
                    </div>
                  </div>

                  <div class="st-variants__selector-footer">
                    <h4 class="st-variants__selector-label">
                      ${this.config.selector_label}
                    </h4>

                    <div class="st-variants__color-buttons">
                      ${variants.map(
                        (variant, index) => html`
                          <button
                            type="button"
                            class="${classMap({
                              'st-variants__color-btn': true,
                              'is-active': index === this.activeIndex,
                            })}"
                            aria-label="${variant.color_title}"
                            aria-current="${index === this.activeIndex ? 'true' : 'false'}"
                            @click="${() => this.goToVariant(index)}"
                          >
                            <span
                              class="st-variants__color-dot"
                              style="background: ${variant.color_hex}"
                            ></span>
                            <span class="st-variants__color-label">${variant.color_title}</span>
                          </button>
                        `
                      )}
                    </div>
                  </div>
                </div>

                <!-- Desktop lifestyle panel -->
                <div
                  class="st-variants__side-panel"
                  @click="${() => this.openLightbox(active.side_image)}"
                >
                  ${variants.map(
                    (variant) => html`
                      <img
                        src="${variant.side_image}"
                        alt="${variant.color_title}"
                        loading="eager"
                        decoding="async"
                        class="st-variants__layer st-variants__side-image"
                      />
                    `
                  )}
                </div>

                <!-- Decorative pointer arrow -->
                <div class="st-variants__pointer">
                  <img src="/assets/pointer.svg" alt="" title="إشارة للمنتج" />
                </div>
              </div>
            </div>
          </div>
        </div>

        ${this.lightboxOpen
          ? html`
              <div class="st-variants__lightbox" @click="${() => this.closeLightbox()}">
                <div
                  class="st-variants__lightbox-inner"
                  @click="${(e: Event) => e.stopPropagation()}"
                >
                  <img
                    src="${this.lightboxSrc}"
                    alt=""
                    class="st-variants__lightbox-img"
                  />
                  <button
                    type="button"
                    class="st-variants__lightbox-close"
                    aria-label="Close"
                    @click="${() => this.closeLightbox()}"
                  >
                    ✕
                  </button>
                </div>
              </div>
            `
          : ''}
      </section>
    `;
  }
}
