import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import AOS from '../../utils/animate-on-scroll';
import '../../utils/fonts';

export default class StReviews extends LitElement {
  @property({ type: Object })
  config?: {
    bg_color: string;
    primary_color: string;
    brand_color: string;
    secondary_color: string;
    shade_color: string;
    section_icon: string;
    rating_icon: string;
    subheader: string;
    next_icon: string;
    prev_icon: string;
    reviews: Array<{
      body: string;
      user: string;
      stars: number;
      audio_url: string;
      media_type: string; // 'image' | 'video' | 'iframe' | ''
      media_src: string;
    }>;
  };

  @state() private currentIndex = 0;
  @state() private expandedSet: Set<number> = new Set();
  @state() private playingIndex: number | null = null;
  // Source: textCutout is 95 below 1440px and 160 at >=1440px
  @state() private textLimit = window.innerWidth >= 1440 ? 160 : 95;

  createRenderRoot() { return this; }

  private styleElement: HTMLStyleElement | null = null;
  private instanceId = Math.random().toString(36).slice(2, 8);
  private touchStartX: number | null = null;

  private resizeHandler = () => {
    const limit = window.innerWidth >= 1440 ? 160 : 95;
    if (limit !== this.textLimit) this.textLimit = limit;
  };

  connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
    window.addEventListener('resize', this.resizeHandler, { passive: true });
    AOS.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resizeHandler);
    this.styleElement?.remove();
  }

  // Swipe gestures (replaces source's Swiper touch support)
  private onTouchStart = (e: TouchEvent) => {
    this.touchStartX = e.touches[0]?.clientX ?? null;
  };

  private onTouchEnd = (e: TouchEvent) => {
    if (this.touchStartX === null) return;
    const endX = e.changedTouches[0]?.clientX ?? this.touchStartX;
    const delta = endX - this.touchStartX;
    this.touchStartX = null;
    if (Math.abs(delta) < 50) return;
    const isRtl = (document.documentElement.dir || 'rtl') === 'rtl';
    if (delta < 0) {
      this.go(isRtl ? -1 : 1);
    } else {
      this.go(isRtl ? 1 : -1);
    }
  };

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    AOS.refresh();
  }

  private get bg() { return this.config?.bg_color || '#ffffff'; }
  private get primary() { return this.config?.primary_color || '#050505'; }
  private get brand() { return this.config?.brand_color || '#0071E3'; }
  private get secondary() { return this.config?.secondary_color || '#525252'; }
  private get shade() { return this.config?.shade_color || 'rgba(0,0,0,0.04)'; }

  injectStyles() {
    if (this.styleElement) return;
    this.styleElement = document.createElement('style');
    this.styleElement.textContent = `
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
    `;
    document.head.appendChild(this.styleElement);
  }

  private go(dir: 1 | -1) {
    const total = this.config?.reviews?.length || 0;
    if (!total) return;
    this.currentIndex = (this.currentIndex + dir + total) % total;

    // stop any playing audio when slide changes
    if (this.playingIndex !== null) {
      const audio = this.querySelector(`#rv-audio-${this.instanceId}-${this.playingIndex}`) as HTMLAudioElement;
      audio?.pause();
      this.playingIndex = null;
    }
  }

  private toggleExpand(i: number) {
    const s = new Set(this.expandedSet);
    s.has(i) ? s.delete(i) : s.add(i);
    this.expandedSet = s;
  }

  private toggleAudio(i: number) {
    const audio = this.querySelector(`#rv-audio-${this.instanceId}-${i}`) as HTMLAudioElement;
    if (!audio) return;
    if (this.playingIndex === i) {
      audio.pause();
      this.playingIndex = null;
    } else {
      if (this.playingIndex !== null) {
        const prev = this.querySelector(`#rv-audio-${this.instanceId}-${this.playingIndex}`) as HTMLAudioElement;
        prev?.pause();
      }
      audio.play();
      this.playingIndex = i;
    }
  }

  private renderStars(value: number) {
    const full = Math.floor(value);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < full
        ? html`<i class="${this.config?.rating_icon || 'sicon-star2'}" style="color:#F6D52A;"></i>`
        : html`<i class="${this.config?.rating_icon || 'sicon-star2'}" style="opacity:0.3;"></i>`
      );
    }
    return html`${stars}`;
  }

  render() {
    if (!this.config) return html``;

    const reviews = this.config.reviews || [];
    const total = reviews.length;
    const icon = this.config.section_icon || 'sicon-quote-close';
    const subheader = this.config.subheader || 'تجارب ملهمة من عملائنا';
    const TEXT_LIMIT = this.textLimit;

    return html`
      <section class="st-reviews" style="background:${this.bg};" data-animate="fade-up">
        <div class="st-reviews__inner">
          <div
            class="st-reviews__slides"
            @touchstart="${this.onTouchStart}"
            @touchend="${this.onTouchEnd}"
          >
            ${reviews.map((review, i) => {
              const isActive = i === this.currentIndex;
              const expanded = this.expandedSet.has(i);
              const body = review.body || '';
              const truncated = body.length > TEXT_LIMIT && !expanded;
              const displayBody = truncated ? body.slice(0, TEXT_LIMIT) : body;

              return html`
                <div class="st-reviews__slide ${isActive ? 'is-active' : ''}">

                  <!-- Content column (right on LTR/desktop) -->
                  <div class="st-reviews__content">

                    <!-- Blue circle icon -->
                    <div class="st-reviews__icon-circle" style="background:${this.brand};">
                      <i class="${icon}"></i>
                    </div>

                    <!-- Subheader -->
                    <h4 class="st-reviews__subheader" style="color:${this.brand};">${subheader}</h4>

                    <!-- Large body quote -->
                    ${body ? html`
                      <h5 class="${classMap({ 'st-reviews__body': true, 'is-expanded': expanded })}" style="color:${this.primary};">
                        "${displayBody}${truncated ? html`
                          <button class="st-reviews__more-btn"
                                  style="color:${this.secondary};"
                                  @click="${() => this.toggleExpand(i)}">...مزيد</button>
                        ` : ''}${!truncated && body.length > TEXT_LIMIT ? html`
                          <span>"</span>
                          <button class="st-reviews__more-btn"
                                  style="color:${this.secondary};"
                                  @click="${() => this.toggleExpand(i)}">...أقل</button>
                        ` : html`"`}
                      </h5>
                    ` : ''}

                    <!-- Native audio + custom play overlay -->
                    ${review.audio_url ? html`
                      <div class="st-reviews__audio-wrap">
                        <audio
                          id="rv-audio-${this.instanceId}-${i}"
                          class="st-reviews__audio-native"
                          controls
                          src="${review.audio_url}"
                          @pause="${() => { if (this.playingIndex === i) this.playingIndex = null; }}"
                          @play="${() => { this.playingIndex = i; }}"
                        ></audio>
                        <button
                          class="st-reviews__audio-play-btn"
                          style="background:${this.brand};"
                          @click="${() => this.toggleAudio(i)}"
                          title="${this.playingIndex === i ? 'إيقاف' : 'تشغيل'}"
                        >
                          <i class="${this.playingIndex === i ? 'sicon-pause' : 'sicon-play'}"></i>
                        </button>
                      </div>
                    ` : ''}

                    <!-- User + stars -->
                    <div class="st-reviews__meta" style="color:${this.secondary};">
                      ${review.user ? html`<span class="st-reviews__user">${review.user}</span>` : ''}
                      ${review.stars ? html`
                        <span class="st-reviews__rating">
                          ${this.renderStars(review.stars)}
                          <span style="margin-inline-start:0.25rem;">${review.stars}</span>
                        </span>
                      ` : ''}
                    </div>

                    <!-- Pagination pill: ← 1/4 → -->
                    ${total > 1 ? html`
                      <div class="st-reviews__pager" style="background:${this.shade}; color:${this.secondary};">
                        <button class="st-reviews__pager-btn" @click="${() => this.go(1)}" title="التالي">
                          <i class="${this.config?.next_icon || 'sicon-arrow-left'}"></i>
                        </button>
                        <div class="st-reviews__pager-count">
                          <span>${total}</span><span>/</span><span>${this.currentIndex + 1}</span>
                        </div>
                        <button class="st-reviews__pager-btn" @click="${() => this.go(-1)}" title="السابق">
                          <i class="${this.config?.prev_icon || 'sicon-arrow-right'}"></i>
                        </button>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Side media (left column) -->
                  ${review.media_src && review.media_type ? html`
                    <div class="st-reviews__media">
                      ${review.media_type === 'image' ? html`
                        <img class="st-reviews__media-img"
                             src="${review.media_src}"
                             alt="${review.user || ''}"
                             loading="lazy" />
                      ` : review.media_type === 'video' ? html`
                        <video class="st-reviews__media-video" controls>
                          <source src="${review.media_src}">
                        </video>
                      ` : html`
                        <iframe class="st-reviews__media-iframe"
                                src="${review.media_src}"
                                allowfullscreen></iframe>
                      `}
                    </div>
                  ` : ''}
                </div>
              `;
            })}
          </div>
        </div>
      </section>
    `;
  }
}
