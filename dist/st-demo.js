import { LitElement as b, html as i } from "lit";
import { property as v, state as y } from "lit/decorators.js";
import { A as g } from "./animate-on-scroll-ROUn9sF1.js";
import "./fonts-CqDo7kag.js";
var $ = Object.defineProperty, w = (_, e, t, o) => {
  for (var n = void 0, s = _.length - 1, a; s >= 0; s--)
    (a = _[s]) && (n = a(e, t, n) || n);
  return n && $(e, t, n), n;
};
class p extends b {
  constructor() {
    super(...arguments), this.currentViewerIndex = -1, this.styleElement = null;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), g.init();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.styleElement) == null || e.remove();
  }
  updated(e) {
    super.updated(e), g.refresh();
  }
  // Source defaults to the middle image: keys[floor((len - 1) / 2)]
  get defaultViewerIndex() {
    var t, o;
    const e = ((o = (t = this.config) == null ? void 0 : t.viewer_images) == null ? void 0 : o.length) || 0;
    return e ? Math.floor((e - 1) / 2) : 0;
  }
  get viewerIndex() {
    return this.currentViewerIndex === -1 ? this.defaultViewerIndex : this.currentViewerIndex;
  }
  injectStyles() {
    var a, r, d;
    if (this.styleElement) return;
    const e = ((a = this.config) == null ? void 0 : a.bg_color) || "#050505", t = ((r = this.config) == null ? void 0 : r.text_color) || "#ffffff", o = ((d = this.config) == null ? void 0 : d.brand_color) || "#0071E3", n = "#222222", s = "#EEEEEE";
    this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      /* ── root ─────────────────────────────────────────── */
      .st-demo {
        display: block;
        width: 100%;
        background: ${e};
        color: ${t};
        overflow: hidden;
      }

      /* ══════════════════════════════════════════════════
         SECTION 1 & 3 — InsightPanel
      ══════════════════════════════════════════════════ */
      /* container-xl + container-padding + container-padding-y (matches source) */
      .st-demo__panel-row {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2.5rem 0.5rem;
        display: flex;
        flex-direction: column-reverse;
        gap: 1.5rem;
        overflow: hidden;
      }

      @media (min-width: 768px) {
        .st-demo__panel-row {
          padding: 4rem 1rem;
          flex-direction: row;
          align-items: center;
          gap: 40px;
        }

        .st-demo__panel-row--reversed { flex-direction: row-reverse; }
      }

      @media (min-width: 1024px) {
        .st-demo__panel-row { padding: 4rem 2.5rem; gap: 60px; }
      }

      @media (min-width: 1280px) {
        .st-demo__panel-row { padding: 88px 88px; gap: 88px; }
      }

      /* ── content column ── */
      .st-demo__panel-content {
        width: 100%;
        max-width: 36rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        text-align: center;
      }

      @media (min-width: 768px) {
        .st-demo__panel-content {
          width: 50%;
          max-width: none;
          margin: 0;
          text-align: start;
        }
      }

      /* Title: font-extrabold, 20px -> md 24px -> lg 32px/51px (matches source) */
      .st-demo__panel-title {
        width: 100%;
        font-size: 1.25rem;
        font-weight: 800;
        line-height: 1.4;
        margin: 0;
        color: ${t};
      }

      @media (min-width: 768px) {
        .st-demo__panel-title { font-size: 1.5rem; }
      }

      @media (min-width: 1024px) {
        .st-demo__panel-title { font-size: 32px; line-height: 51px; }
      }

      .st-demo__panel-body-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      /* Body: 12px -> md 14px -> lg 16px, normal weight, light color (matches source) */
      .st-demo__panel-body {
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 400;
        margin: 0;
        color: ${s};
      }

      @media (min-width: 768px) {
        .st-demo__panel-body { font-size: 0.875rem; line-height: 1.25rem; }
      }

      @media (min-width: 1024px) {
        .st-demo__panel-body { font-size: 1rem; line-height: 1.5rem; }
      }

      /* CTA button — source LinkButton white variant with text-swap hover */
      .st-demo__btn-row {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      @media (min-width: 768px) {
        .st-demo__btn-row { justify-content: flex-start; }
      }

      .st-demo__btn {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-radius: 0.75rem;
        border: 1px solid ${t};
        background: ${t};
        color: ${e};
        font-size: 0.875rem;
        text-decoration: none;
        width: max-content;
        white-space: nowrap;
        cursor: pointer;
      }

      @media (min-width: 768px) {
        .st-demo__btn { font-size: 1rem; }
      }

      @media (min-width: 1024px) {
        .st-demo__btn { font-size: 1.125rem; }
      }

      .st-demo__btn span { font-weight: 800; }
      .st-demo__btn i { font-size: 1.25rem; line-height: 1; }

      .st-demo__btn-text-a,
      .st-demo__btn-text-b {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: transform 0.25s ease, opacity 0.25s ease;
        white-space: nowrap;
      }

      .st-demo__btn-text-b {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transform: translateY(150%);
        opacity: 0;
      }

      .st-demo__btn:hover .st-demo__btn-text-a {
        transform: translateY(-150%);
        opacity: 0;
      }

      .st-demo__btn:hover .st-demo__btn-text-b {
        transform: translateY(0);
        opacity: 1;
      }

      /* ── media column ── */
      .st-demo__panel-media {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (min-width: 768px) {
        .st-demo__panel-media { width: 50%; }
      }

      .st-demo__feat-img {
        width: 100%;
        max-width: 36rem;
        height: auto;
        object-fit: cover;
        display: block;
      }

      @media (min-width: 768px) {
        .st-demo__feat-img { max-width: none; }
      }

      /* ══════════════════════════════════════════════════
         SECTION 2 — InsightModel (circular 3-D viewer)
      ══════════════════════════════════════════════════ */
      .st-demo__viewer-section {
        padding: 2rem 0;
        overflow: hidden;
      }

      @media (min-width: 768px) {
        .st-demo__viewer-section { padding: 4rem 0; }
      }

      @media (min-width: 1024px) {
        .st-demo__viewer-section { padding: 85px 0; }
      }

      .st-demo__viewer-inner {
        position: relative;
        width: 100%;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
      }

      /* watermark: 50px -> sm 60px -> md 96px -> xl 150px/240px, #D9D9D9 at 5% */
      .st-demo__viewer-bg-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        text-align: center;
        font-size: 50px;
        line-height: 1.625;
        font-weight: 900;
        white-space: nowrap;
        user-select: none;
        pointer-events: none;
        color: rgba(217, 217, 217, 0.05);
        z-index: 10;
      }

      @media (min-width: 640px) {
        .st-demo__viewer-bg-text { font-size: 60px; }
      }

      @media (min-width: 768px) {
        .st-demo__viewer-bg-text { font-size: 96px; }
      }

      @media (min-width: 1280px) {
        .st-demo__viewer-bg-text { font-size: 150px; line-height: 240px; }
      }

      /* circle */
      .st-demo__circle {
        position: relative;
        z-index: 20;
        width: min(100%, 605px);
        max-height: 605px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        border: 1px solid ${n};
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* product images inside circle */
      .st-demo__circle-img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 68.5%;
        aspect-ratio: 1 / 1;
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

      /* controls: reset icon stacked ABOVE the dot track (matches source) */
      .st-demo__controls-wrap {
        position: relative;
        z-index: 20;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        text-align: center;
        overflow: auto;
      }

      .st-demo__reset-btn {
        background: none;
        border: none;
        padding: 0;
        color: ${t};
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 1;
        white-space: nowrap;
      }

      /* dot track: items linked by 88px connector lines */
      .st-demo__dot-track {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 88px;
        width: max-content;
        max-width: 100%;
        margin: 0 auto;
        overflow-x: auto;
        padding-bottom: 1rem;
        scrollbar-width: thin;
        scrollbar-color: ${o} #F1F1F1;
      }

      .st-demo__dot-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        color: ${t};
      }

      .st-demo__dot-label {
        font-size: 0.875rem;
        font-weight: 800;
        white-space: nowrap;
        min-width: max-content;
        text-align: center;
      }

      @media (min-width: 768px) {
        .st-demo__dot-label { font-size: 1rem; line-height: 25.6px; }
      }

      /* 12px dot with 2px outline; active = white with 2px offset (matches source) */
      .st-demo__dot-circle {
        position: relative;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 9999px;
        background: ${n};
        outline: 2px solid ${n};
        outline-offset: 0;
        transition: all 0.2s ease;
      }

      .st-demo__dot-circle.is-active {
        background: ${t};
        outline-color: ${t};
        outline-offset: 2px;
      }

      /* connector line to the next dot (hidden on last item) */
      .st-demo__dot-connector {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        inset-inline-start: calc(100% + 12px);
        width: 88px;
        height: 1px;
        background: ${n};
        pointer-events: none;
      }
    `, document.head.appendChild(this.styleElement);
  }
  selectImage(e) {
    this.currentViewerIndex = e, this.requestUpdate();
  }
  reset() {
    this.currentViewerIndex = this.defaultViewerIndex, this.requestUpdate();
  }
  render() {
    if (!this.config) return i``;
    const {
      panel1_title: e,
      panel1_body1: t,
      panel1_body2: o,
      panel1_image: n,
      panel2_title: s,
      panel2_body1: a,
      panel2_body2: r,
      panel2_image: d,
      panel2_button_label: h,
      panel2_button_link: u,
      viewer_images: c = [],
      viewer_bg_text: x
    } = this.config, f = this.viewerIndex;
    return i`
      <div id="st-demo" class="st-demo">

        <!-- ── Section 1: InsightPanel (enters from bottom, matches source) ── -->
        <div class="st-demo__section">
          <div class="st-demo__panel-row">

            <div class="st-demo__panel-content" data-animate="fade-up">
              ${e ? i`
                <h4 class="st-demo__panel-title">${e}</h4>
              ` : ""}
              ${t || o ? i`
                <div class="st-demo__panel-body-group">
                  ${t ? i`<p class="st-demo__panel-body">${t}</p>` : ""}
                  ${o ? i`<p class="st-demo__panel-body">${o}</p>` : ""}
                </div>
              ` : ""}
            </div>

            ${n ? i`
              <div class="st-demo__panel-media" data-animate="fade-up">
                <img
                  class="st-demo__feat-img"
                  loading="lazy"
                  src="${n}"
                  alt="${e || ""}"
                />
              </div>
            ` : ""}
          </div>
        </div>

        <!-- ── Section 2: InsightModel (circular viewer) ─── -->
        <div class="st-demo__viewer-section">
          <div class="st-demo__viewer-inner">

            <!-- circle -->
            <div class="st-demo__circle">
              ${c.map((l, m) => i`
                <img
                  loading="lazy"
                  src="${l.image}"
                  class="st-demo__circle-img ${m === f ? "is-active" : ""}"
                  alt="${l.label}"
                />
              `)}
            </div>

            <!-- reset (above) + dot track (below), matches source layout -->
            <div class="st-demo__controls-wrap">
              <button
                type="button"
                class="st-demo__reset-btn"
                title="إعادة الإفتراض"
                @click="${() => this.reset()}"
              >
                <i class="sicon-rotate"></i>
              </button>

              ${c.length > 1 ? i`
                <div class="st-demo__dot-track">
                  ${c.map((l, m) => i`
                    <button
                      type="button"
                      class="st-demo__dot-item"
                      title="${l.label}"
                      @click="${() => this.selectImage(m)}"
                    >
                      <span class="st-demo__dot-label">${l.label}</span>
                      <span class="st-demo__dot-circle ${m === f ? "is-active" : ""}">
                        ${m < c.length - 1 ? i`<span class="st-demo__dot-connector"></span>` : ""}
                      </span>
                    </button>
                  `)}
                </div>
              ` : ""}
            </div>

            <!-- watermark -->
            ${x ? i`
              <span class="st-demo__viewer-bg-text">${x}</span>
            ` : ""}
          </div>
        </div>

        <!-- ── Section 3: InsightPanel reversed (enters from top, matches source) ── -->
        <div class="st-demo__section">
          <div class="st-demo__panel-row st-demo__panel-row--reversed">

            <div class="st-demo__panel-content" data-animate="fade-down">
              ${s ? i`
                <h4 class="st-demo__panel-title">${s}</h4>
              ` : ""}
              ${a || r ? i`
                <div class="st-demo__panel-body-group">
                  ${a ? i`<p class="st-demo__panel-body">${a}</p>` : ""}
                  ${r ? i`<p class="st-demo__panel-body">${r}</p>` : ""}
                </div>
              ` : ""}
              ${h ? i`
                <div class="st-demo__btn-row">
                  <a class="st-demo__btn" href="${u || "#"}">
                    <span class="st-demo__btn-text-a">
                      <span>${h}</span>
                      <i class="sicon-caret-left-double"></i>
                    </span>
                    <span class="st-demo__btn-text-b">
                      <span>${h}</span>
                      <i class="sicon-caret-left-double"></i>
                    </span>
                  </a>
                </div>
              ` : ""}
            </div>

            ${d ? i`
              <div class="st-demo__panel-media" data-animate="fade-down">
                <img
                  class="st-demo__feat-img"
                  loading="lazy"
                  src="${d}"
                  alt="${s || ""}"
                />
              </div>
            ` : ""}
          </div>
        </div>

      </div>
    `;
  }
}
w([
  v({ type: Object })
], p.prototype, "config");
w([
  y()
], p.prototype, "currentViewerIndex");
typeof p < "u" && p.registerSallaComponent("salla-st-demo");
export {
  p as default
};
