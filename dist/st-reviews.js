import { LitElement as y, html as s } from "lit";
import { property as x, state as h } from "lit/decorators.js";
import { classMap as b } from "lit/directives/class-map.js";
import { A as f } from "./animate-on-scroll-ROUn9sF1.js";
import "./fonts-ClHg20Ea.js";
var $ = Object.defineProperty, c = (p, e, t, a) => {
  for (var n = void 0, r = p.length - 1, i; r >= 0; r--)
    (i = p[r]) && (n = i(e, t, n) || n);
  return n && $(e, t, n), n;
};
class d extends y {
  constructor() {
    super(...arguments), this.currentIndex = 0, this.expandedSet = /* @__PURE__ */ new Set(), this.playingIndex = null, this.textLimit = window.innerWidth >= 1440 ? 160 : 95, this.styleElement = null, this.instanceId = Math.random().toString(36).slice(2, 8), this.touchStartX = null, this.resizeHandler = () => {
      const e = window.innerWidth >= 1440 ? 160 : 95;
      e !== this.textLimit && (this.textLimit = e);
    }, this.onTouchStart = (e) => {
      var t;
      this.touchStartX = ((t = e.touches[0]) == null ? void 0 : t.clientX) ?? null;
    }, this.onTouchEnd = (e) => {
      var r;
      if (this.touchStartX === null) return;
      const a = (((r = e.changedTouches[0]) == null ? void 0 : r.clientX) ?? this.touchStartX) - this.touchStartX;
      if (this.touchStartX = null, Math.abs(a) < 50) return;
      const n = (document.documentElement.dir || "rtl") === "rtl";
      a < 0 ? this.go(n ? -1 : 1) : this.go(n ? 1 : -1);
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.injectStyles(), window.addEventListener("resize", this.resizeHandler, { passive: !0 }), f.init();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), window.removeEventListener("resize", this.resizeHandler), (e = this.styleElement) == null || e.remove();
  }
  updated(e) {
    super.updated(e), f.refresh();
  }
  get bg() {
    var e;
    return ((e = this.config) == null ? void 0 : e.bg_color) || "#ffffff";
  }
  get primary() {
    var e;
    return ((e = this.config) == null ? void 0 : e.primary_color) || "#050505";
  }
  get brand() {
    var e;
    return ((e = this.config) == null ? void 0 : e.brand_color) || "#0071E3";
  }
  get secondary() {
    var e;
    return ((e = this.config) == null ? void 0 : e.secondary_color) || "#525252";
  }
  get shade() {
    var e;
    return ((e = this.config) == null ? void 0 : e.shade_color) || "rgba(0,0,0,0.04)";
  }
  injectStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
      .st-reviews {
        display: block;
        width: 100%;
        overflow: hidden;
      }

      .st-reviews__inner {
        max-width: 1440px;
        margin: 0 auto;
        padding: 3.5rem 0.5rem 4rem;
      }

      @media (min-width: 768px) {
        .st-reviews__inner { padding: 3.5rem 1rem 4rem; }
      }

      @media (min-width: 1024px) {
        .st-reviews__inner { padding: 3.5rem 2.5rem 4rem; }
      }

      @media (min-width: 1280px) {
        .st-reviews__inner { padding: 3.5rem 88px 4rem; }
      }

      /* ── Slide ──────────────────────────────────── */
      .st-reviews__slides { position: relative; overflow: hidden; }

      .st-reviews__slide {
        display: none;
        width: 100%;
        flex-direction: column;
        gap: 2rem;
        min-height: 0;
      }

      .st-reviews__slide.is-active {
        display: flex;
      }

      @media (min-width: 1024px) {
        .st-reviews__slide {
          flex-direction: row;
          align-items: center;
          min-height: 577px;
          gap: 4.5rem;
        }
      }

      /* ── Content column ─────────────────────────── */
      .st-reviews__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        min-width: 0;
        order: 2;
      }

      @media (min-width: 1024px) {
        .st-reviews__content { order: 2; }
      }

      /* Blue circle icon */
      .st-reviews__icon-circle {
        width: 67px;
        height: 67px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .st-reviews__icon-circle i {
        font-size: 2rem;
        color: #fff;
        line-height: 1;
      }

      /* Subheader */
      .st-reviews__subheader {
        font-size: 0.875rem;
        font-weight: 700;
        margin: 0;
      }

      @media (min-width: 768px) {
        .st-reviews__subheader { font-size: 1rem; }
      }

      /* Quote body — large bold */
      .st-reviews__body {
        font-size: 1.375rem;
        font-weight: 700;
        line-height: 1.6;
        margin: 0;
        padding-bottom: 0.125rem;
      }

      /* Scroll only kicks in once the shopper expands the full quote */
      .st-reviews__body.is-expanded {
        overflow-y: auto;
        max-height: 15rem;
      }

      @media (min-width: 768px) {
        .st-reviews__body {
          font-size: 2rem;
          line-height: 1.3125;
        }
      }

      .st-reviews__more-btn {
        background: none;
        border: none;
        font-size: 1.125rem;
        font-weight: 400;
        cursor: pointer;
        padding: 0;
        font-family: inherit;
        text-decoration: underline;
        display: inline;
      }

      /* Custom audio player */
      .st-reviews__audio-wrap {
        position: relative;
        width: max-content;
        max-width: 100%;
      }

      .st-reviews__audio-native {
        display: block;
        border-radius: 9999px;
        height: 36px;
        min-width: 220px;
        max-width: 320px;
      }

      .st-reviews__audio-play-btn {
        position: absolute;
        top: 50%;
        inset-inline-end: 8px;
        transform: translateY(-50%);
        width: 26px;
        height: 26px;
        border-radius: 9999px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }

      .st-reviews__audio-play-btn i {
        font-size: 1rem;
        color: #fff;
        line-height: 1;
      }

      /* User + rating row */
      .st-reviews__meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        font-size: 0.875rem;
      }

      @media (min-width: 768px) { .st-reviews__meta { font-size: 1rem; } }

      .st-reviews__user { font-weight: 400; }

      .st-reviews__rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .st-reviews__rating i { font-size: 1.25rem; margin-bottom: 0.1em; }

      /* Pagination pill — ← 1/4 → */
      .st-reviews__pager {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 9999px;
        padding: 0.375rem 0.75rem;
        width: max-content;
      }

      .st-reviews__pager-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.125rem 0.25rem;
        display: flex;
        align-items: center;
        line-height: 1;
        border-radius: 0.25rem;
        transition: opacity 0.15s;
      }

      .st-reviews__pager-btn:hover { opacity: 0.6; }
      .st-reviews__pager-btn i { font-size: 0.75rem; }

      .st-reviews__pager-count {
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.125rem;
      }

      @media (min-width: 768px) { .st-reviews__pager-count { font-size: 1rem; } }

      /* ── Media column ───────────────────────────── */
      .st-reviews__media {
        flex-shrink: 0;
        width: 100%;
        height: 280px;
        border-radius: 1.25rem;
        overflow: hidden;
        order: 1;
      }

      @media (min-width: 1024px) {
        .st-reviews__media {
          width: 629px;
          min-width: 50%;
          height: 450px;
          min-height: 450px;
          order: 1;
        }
      }

      .st-reviews__media-img,
      .st-reviews__media-video,
      .st-reviews__media-iframe {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 0;
        display: block;
        border-radius: 1.25rem;
      }

      /* Slide transition */
      @keyframes stReviewsFadeIn {
        from { opacity: 0; transform: translateX(24px); }
        to { opacity: 1; transform: translateX(0); }
      }

      .st-reviews__slide.is-active {
        animation: stReviewsFadeIn 0.3s ease forwards;
      }

      [dir="rtl"] .st-reviews__slide.is-active {
        animation-name: stReviewsFadeInRtl;
      }

      @keyframes stReviewsFadeInRtl {
        from { opacity: 0; transform: translateX(-24px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `, document.head.appendChild(this.styleElement));
  }
  go(e) {
    var a, n;
    const t = ((n = (a = this.config) == null ? void 0 : a.reviews) == null ? void 0 : n.length) || 0;
    if (t && (this.currentIndex = (this.currentIndex + e + t) % t, this.playingIndex !== null)) {
      const r = this.querySelector(`#rv-audio-${this.instanceId}-${this.playingIndex}`);
      r == null || r.pause(), this.playingIndex = null;
    }
  }
  toggleExpand(e) {
    const t = new Set(this.expandedSet);
    t.has(e) ? t.delete(e) : t.add(e), this.expandedSet = t;
  }
  toggleAudio(e) {
    const t = this.querySelector(`#rv-audio-${this.instanceId}-${e}`);
    if (t)
      if (this.playingIndex === e)
        t.pause(), this.playingIndex = null;
      else {
        if (this.playingIndex !== null) {
          const a = this.querySelector(`#rv-audio-${this.instanceId}-${this.playingIndex}`);
          a == null || a.pause();
        }
        t.play(), this.playingIndex = e;
      }
  }
  renderStars(e) {
    var n, r;
    const t = Math.floor(e), a = [];
    for (let i = 0; i < 5; i++)
      a.push(
        i < t ? s`<i class="${((n = this.config) == null ? void 0 : n.rating_icon) || "sicon-star2"}" style="color:#F6D52A;"></i>` : s`<i class="${((r = this.config) == null ? void 0 : r.rating_icon) || "sicon-star2"}" style="opacity:0.3;"></i>`
      );
    return s`${a}`;
  }
  render() {
    if (!this.config) return s``;
    const e = this.config.reviews || [], t = e.length, a = this.config.section_icon || "sicon-quote-close", n = this.config.subheader || "تجارب ملهمة من عملائنا", r = this.textLimit;
    return s`
      <section class="st-reviews" style="background:${this.bg};" data-animate="fade-up">
        <div class="st-reviews__inner">
          <div
            class="st-reviews__slides"
            @touchstart="${this.onTouchStart}"
            @touchend="${this.onTouchEnd}"
          >
            ${e.map((i, o) => {
      var _, g;
      const v = o === this.currentIndex, u = this.expandedSet.has(o), l = i.body || "", m = l.length > r && !u, w = m ? l.slice(0, r) : l;
      return s`
                <div class="st-reviews__slide ${v ? "is-active" : ""}">

                  <!-- Content column (right on LTR/desktop) -->
                  <div class="st-reviews__content">

                    <!-- Blue circle icon -->
                    <div class="st-reviews__icon-circle" style="background:${this.brand};">
                      <i class="${a}"></i>
                    </div>

                    <!-- Subheader -->
                    <h4 class="st-reviews__subheader" style="color:${this.brand};">${n}</h4>

                    <!-- Large body quote -->
                    ${l ? s`
                      <h5 class="${b({ "st-reviews__body": !0, "is-expanded": u })}" style="color:${this.primary};">
                        "${w}${m ? s`
                          <button class="st-reviews__more-btn"
                                  style="color:${this.secondary};"
                                  @click="${() => this.toggleExpand(o)}">...مزيد</button>
                        ` : ""}${!m && l.length > r ? s`
                          <span>"</span>
                          <button class="st-reviews__more-btn"
                                  style="color:${this.secondary};"
                                  @click="${() => this.toggleExpand(o)}">...أقل</button>
                        ` : s`"`}
                      </h5>
                    ` : ""}

                    <!-- Native audio + custom play overlay -->
                    ${i.audio_url ? s`
                      <div class="st-reviews__audio-wrap">
                        <audio
                          id="rv-audio-${this.instanceId}-${o}"
                          class="st-reviews__audio-native"
                          controls
                          src="${i.audio_url}"
                          @pause="${() => {
        this.playingIndex === o && (this.playingIndex = null);
      }}"
                          @play="${() => {
        this.playingIndex = o;
      }}"
                        ></audio>
                        <button
                          class="st-reviews__audio-play-btn"
                          style="background:${this.brand};"
                          @click="${() => this.toggleAudio(o)}"
                          title="${this.playingIndex === o ? "إيقاف" : "تشغيل"}"
                        >
                          <i class="${this.playingIndex === o ? "sicon-pause" : "sicon-play"}"></i>
                        </button>
                      </div>
                    ` : ""}

                    <!-- User + stars -->
                    <div class="st-reviews__meta" style="color:${this.secondary};">
                      ${i.user ? s`<span class="st-reviews__user">${i.user}</span>` : ""}
                      ${i.stars ? s`
                        <span class="st-reviews__rating">
                          ${this.renderStars(i.stars)}
                          <span style="margin-inline-start:0.25rem;">${i.stars}</span>
                        </span>
                      ` : ""}
                    </div>

                    <!-- Pagination pill: ← 1/4 → -->
                    ${t > 1 ? s`
                      <div class="st-reviews__pager" style="background:${this.shade}; color:${this.secondary};">
                        <button class="st-reviews__pager-btn" @click="${() => this.go(1)}" title="التالي">
                          <i class="${((_ = this.config) == null ? void 0 : _.next_icon) || "sicon-arrow-left"}"></i>
                        </button>
                        <div class="st-reviews__pager-count">
                          <span>${t}</span><span>/</span><span>${this.currentIndex + 1}</span>
                        </div>
                        <button class="st-reviews__pager-btn" @click="${() => this.go(-1)}" title="السابق">
                          <i class="${((g = this.config) == null ? void 0 : g.prev_icon) || "sicon-arrow-right"}"></i>
                        </button>
                      </div>
                    ` : ""}
                  </div>

                  <!-- Side media (left column) -->
                  ${i.media_src && i.media_type ? s`
                    <div class="st-reviews__media">
                      ${i.media_type === "image" ? s`
                        <img class="st-reviews__media-img"
                             src="${i.media_src}"
                             alt="${i.user || ""}"
                             loading="lazy" />
                      ` : i.media_type === "video" ? s`
                        <video class="st-reviews__media-video" controls>
                          <source src="${i.media_src}">
                        </video>
                      ` : s`
                        <iframe class="st-reviews__media-iframe"
                                src="${i.media_src}"
                                allowfullscreen></iframe>
                      `}
                    </div>
                  ` : ""}
                </div>
              `;
    })}
          </div>
        </div>
      </section>
    `;
  }
}
c([
  x({ type: Object })
], d.prototype, "config");
c([
  h()
], d.prototype, "currentIndex");
c([
  h()
], d.prototype, "expandedSet");
c([
  h()
], d.prototype, "playingIndex");
c([
  h()
], d.prototype, "textLimit");
typeof d < "u" && d.registerSallaComponent("salla-st-reviews");
export {
  d as default
};
