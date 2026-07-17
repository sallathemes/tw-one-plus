import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

export default class StDemo extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    text_color: string;
    brand_color: string;
    panel1_title: string;
    panel1_body1: string;
    panel1_body2: string;
    panel1_image: string;
    panel2_title: string;
    panel2_body1: string;
    panel2_body2: string;
    panel2_image: string;
    panel2_button_label: string;
    panel2_button_link: string;
    viewer_images: Array<{ image: string; label: string }>;
    viewer_bg_text: string;
  };

  @state() private currentViewerIndex = 0;

  createRenderRoot() { return this; }

  private styleElement: HTMLStyleElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.styleElement?.remove();
  }

  updated(changedProperties: any) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  injectStyles() {
    if (this.styleElement) return;

    const bg    = this.config?.bg_color    || '#050505';
    const text  = this.config?.text_color  || '#ffffff';
    const brand = this.config?.brand_color || '#0071E3';
    const dark  = 'rgba(255,255,255,0.12)';
    const light = 'rgba(255,255,255,0.65)';

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
      /* ── root ─────────────────────────────────────────── */
      .st-demo {
        display: block;
        width: 100%;
        background: ${bg};
        color: ${text};
        overflow: hidden;
      }

      /* ══════════════════════════════════════════════════
         SECTION 1 & 3 — InsightPanel
      ══════════════════════════════════════════════════ */
      .st-demo__section {
        padding: 5rem 1.5rem;
      }

      /* two-column flex row — stretch so both columns share the same height */
      .st-demo__panel-row {
        max-width: 1440px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        min-height: 520px;
        gap: 4rem;
      }

      /* section 3 reverses the column order */
      .st-demo__panel-row--reversed {
        flex-direction: row-reverse;
      }

      @media (max-width: 767px) {
        .st-demo__panel-row,
        .st-demo__panel-row--reversed {
          flex-direction: column;
          min-height: 0;
          gap: 2.5rem;
        }
      }

      /* ── content column — vertically center the text ── */
      .st-demo__panel-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.5rem;
      }

      .st-demo__panel-title {
        font-size: clamp(1.75rem, 3.5vw, 3rem);
        font-weight: 800;
        line-height: 1.25;
        margin: 0;
        color: ${text};
      }

      .st-demo__panel-body-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .st-demo__panel-body {
        font-size: 1rem;
        line-height: 1.8;
        margin: 0;
        color: ${light};
      }

      @media (min-width: 768px) {
        .st-demo__panel-body { font-size: 1.0625rem; }
      }

      /* CTA button */
      .st-demo__btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.75rem;
        border-radius: 0.75rem;
        background: ${text};
        color: ${bg};
        font-weight: 700;
        font-size: 0.9375rem;
        text-decoration: none;
        width: fit-content;
        transition: opacity 0.2s;
      }

      .st-demo__btn:hover { opacity: 0.85; }

      /* ── media column — fills the row's shared height ── */
      .st-demo__panel-media {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        /* mobile stacked: give it a sensible height */
        min-height: 18rem;
      }

      @media (min-width: 768px) {
        /* panel-row uses stretch, so height comes from min-height on the row */
        .st-demo__panel-media { min-height: 0; }
      }

      /* portrait product image (airpod 458×760): height drives the size */
      .st-demo__feat-img {
        height: 100%;
        width: auto;
        max-width: 100%;
        max-height: 480px;
        object-fit: contain;
        display: block;
      }

      /* ══════════════════════════════════════════════════
         SECTION 2 — InsightModel (circular 3-D viewer)
      ══════════════════════════════════════════════════ */
      .st-demo__viewer-section {
        padding: 4rem 1.5rem;
        overflow: hidden;
      }

      .st-demo__viewer-inner {
        position: relative;
        max-width: 700px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }

      /* watermark text behind everything */
      .st-demo__viewer-bg-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: clamp(3rem, 10vw, 9.375rem);
        font-weight: 900;
        line-height: 1;
        white-space: nowrap;
        opacity: 0.04;
        user-select: none;
        pointer-events: none;
        color: ${text};
        z-index: 0;
      }

      /* circle */
      .st-demo__circle {
        position: relative;
        z-index: 2;
        width: min(100%, 605px);
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        border: 1px solid ${dark};
        overflow: hidden;
        flex-shrink: 0;
      }

      /* product images inside circle */
      .st-demo__circle-img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 68.5%;
        height: 68.5%;
        object-fit: contain;
        opacity: 0;
        transform: translate(-50%, -50%) translateX(300px) scale(0.5);
        transition: none;
      }

      .st-demo__circle-img.is-active {
        opacity: 1;
        transform: translate(-50%, -50%) translateX(0) scale(1);
        animation: stCircleEnter 0.28s ease forwards;
      }

      @keyframes stCircleEnter {
        from { transform: translate(-50%, -50%) translateX(300px) scale(0.5); opacity: 0; }
        to   { transform: translate(-50%, -50%) translateX(0) scale(1); opacity: 1; }
      }

      [dir="rtl"] .st-demo__circle-img {
        transform: translate(-50%, -50%) translateX(-300px) scale(0.5);
      }

      [dir="rtl"] .st-demo__circle-img.is-active {
        transform: translate(-50%, -50%) translateX(0) scale(1);
        animation-name: stCircleEnterRtl;
      }

      @keyframes stCircleEnterRtl {
        from { transform: translate(-50%, -50%) translateX(-300px) scale(0.5); opacity: 0; }
        to   { transform: translate(-50%, -50%) translateX(0) scale(1); opacity: 1; }
      }

      /* controls row: reset btn + dots */
      .st-demo__controls-wrap {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }

      .st-demo__reset-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 1px solid ${dark};
        background: transparent;
        color: ${text};
        cursor: pointer;
        font-size: 1.125rem;
        flex-shrink: 0;
        transition: border-color 0.2s;
      }

      .st-demo__reset-btn:hover { border-color: ${brand}; color: ${brand}; }

      /* dot track */
      .st-demo__dot-track {
        display: flex;
        align-items: center;
        gap: 1.25rem;
      }

      .st-demo__dot-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.375rem;
        cursor: pointer;
      }

      .st-demo__dot-label {
        font-size: 0.6875rem;
        opacity: 0.55;
        white-space: nowrap;
        transition: opacity 0.2s;
      }

      .st-demo__dot-item:hover .st-demo__dot-label { opacity: 1; }

      .st-demo__dot-circle {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${dark};
        position: relative;
        transition: background 0.2s, transform 0.2s;
      }

      .st-demo__dot-circle.is-active {
        background: ${brand};
        transform: scale(1.4);
      }

      /* animated line under active dot */
      .st-demo__dot-line {
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 1.5rem;
        height: 2px;
        border-radius: 1px;
        background: ${brand};
        transform-origin: center;
        animation: stDotLine 0.25s ease forwards;
      }

      @keyframes stDotLine {
        from { width: 0; }
        to   { width: 1.5rem; }
      }
    `;
    document.head.appendChild(this.styleElement);
  }

  private selectImage(index: number) {
    this.currentViewerIndex = index;
    this.requestUpdate();
  }

  private reset() {
    this.currentViewerIndex = 0;
    this.requestUpdate();
  }

  render() {
    if (!this.config) return html``;

    const {
      panel1_title, panel1_body1, panel1_body2, panel1_image,
      panel2_title, panel2_body1, panel2_body2, panel2_image,
      panel2_button_label, panel2_button_link,
      viewer_images = [], viewer_bg_text,
    } = this.config;

    const brand = this.config.brand_color || '#0071E3';

    return html`
      <div id="st-demo" class="st-demo">

        <!-- ── Section 1: InsightPanel (enters from bottom, matches source) ── -->
        <div class="st-demo__section">
          <div class="st-demo__panel-row">

            <div class="st-demo__panel-content" data-animate="fade-up">
              ${panel1_title ? html`
                <h4 class="st-demo__panel-title">${panel1_title}</h4>
              ` : ''}
              ${(panel1_body1 || panel1_body2) ? html`
                <div class="st-demo__panel-body-group">
                  ${panel1_body1 ? html`<p class="st-demo__panel-body">${panel1_body1}</p>` : ''}
                  ${panel1_body2 ? html`<p class="st-demo__panel-body">${panel1_body2}</p>` : ''}
                </div>
              ` : ''}
            </div>

            ${panel1_image ? html`
              <div class="st-demo__panel-media" data-animate="fade-up">
                <img
                  class="st-demo__feat-img"
                  loading="lazy"
                  src="${panel1_image}"
                  alt="${panel1_title || ''}"
                />
              </div>
            ` : ''}
          </div>
        </div>

        <!-- ── Section 2: InsightModel (circular viewer) ─── -->
        <div class="st-demo__viewer-section">
          <div class="st-demo__viewer-inner">

            <!-- circle -->
            <div class="st-demo__circle">
              ${viewer_images.map((item, i) => html`
                <img
                  loading="lazy"
                  src="${item.image}"
                  class="st-demo__circle-img ${i === this.currentViewerIndex ? 'is-active' : ''}"
                  alt="${item.label}"
                />
              `)}
            </div>

            <!-- reset + dots -->
            <div class="st-demo__controls-wrap">
              <button
                type="button"
                class="st-demo__reset-btn"
                title="إعادة الإفتراض"
                @click="${() => this.reset()}"
              >
                <i class="sicon-rotate"></i>
              </button>

              ${viewer_images.length > 1 ? html`
                <div class="st-demo__dot-track">
                  ${viewer_images.map((item, i) => html`
                    <div
                      class="st-demo__dot-item"
                      @click="${() => this.selectImage(i)}"
                    >
                      <span class="st-demo__dot-label">${item.label}</span>
                      <div class="st-demo__dot-circle ${i === this.currentViewerIndex ? 'is-active' : ''}">
                        ${i === this.currentViewerIndex
                          ? html`<div class="st-demo__dot-line"></div>`
                          : ''}
                      </div>
                    </div>
                  `)}
                </div>
              ` : ''}
            </div>

            <!-- watermark -->
            ${viewer_bg_text ? html`
              <span class="st-demo__viewer-bg-text">${viewer_bg_text}</span>
            ` : ''}
          </div>
        </div>

        <!-- ── Section 3: InsightPanel reversed (enters from top, matches source) ── -->
        <div class="st-demo__section">
          <div class="st-demo__panel-row st-demo__panel-row--reversed">

            <div class="st-demo__panel-content" data-animate="fade-down">
              ${panel2_title ? html`
                <h4 class="st-demo__panel-title">${panel2_title}</h4>
              ` : ''}
              ${(panel2_body1 || panel2_body2) ? html`
                <div class="st-demo__panel-body-group">
                  ${panel2_body1 ? html`<p class="st-demo__panel-body">${panel2_body1}</p>` : ''}
                  ${panel2_body2 ? html`<p class="st-demo__panel-body">${panel2_body2}</p>` : ''}
                </div>
              ` : ''}
              ${panel2_button_label ? html`
                <div>
                  <a class="st-demo__btn" href="${panel2_button_link || '#'}">
                    <span>${panel2_button_label}</span>
                    <i class="sicon-caret-left-double"></i>
                  </a>
                </div>
              ` : ''}
            </div>

            ${panel2_image ? html`
              <div class="st-demo__panel-media" data-animate="fade-down">
                <img
                  class="st-demo__feat-img"
                  loading="lazy"
                  src="${panel2_image}"
                  alt="${panel2_title || ''}"
                />
              </div>
            ` : ''}
          </div>
        </div>

      </div>
    `;
  }
}
