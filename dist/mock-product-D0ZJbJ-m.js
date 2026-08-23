import { LitElement as y, html as a } from "lit";
import { property as r } from "lit/decorators.js";
var h = Object.defineProperty, l = (t, e, o, n) => {
  for (var s = void 0, c = t.length - 1, u; c >= 0; c--)
    (u = t[c]) && (s = u(e, o, s) || s);
  return s && h(e, o, s), s;
};
const f = "نفذت الكمية";
function p(t, e = "ر.س") {
  return `${t.toLocaleString("ar-SA")} ${e}`;
}
function _(t) {
  return !!(t.isOnSale && t.regularPrice && t.regularPrice > t.price);
}
function d(t, e, o = f) {
  if (t.isOutOfStock)
    return a`<span class="st-buy-btn__label">${o}</span>`;
  const n = _(t);
  return a`
    <span class="st-buy-btn__label">
      ${e}
      ${t.price > 0 ? a` <span class="st-buy-btn__price">${p(t.price, t.currency)}</span>` : ""}
    </span>
    ${n ? a`<span class="st-buy-btn__original">${p(t.regularPrice, t.currency)}</span>` : ""}
  `;
}
const w = `
  buy-now-button {
    display: contents;
  }

  .st-buy-btn__original {
    text-decoration: line-through;
    opacity: 0.6;
    font-weight: 400;
    font-size: 0.8em;
    margin-inline-start: 0.4em;
  }

  .st-buy-btn.is-out-of-stock {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Hover text-swap chrome (hover-swap attribute) — callers add the
     :hover trigger rules that animate --a out / --b in. */
  .st-buy-btn__swap {
    display: inline-flex;
    transition: transform 0.22s ease, opacity 0.22s ease;
    white-space: nowrap;
  }

  .st-buy-btn__swap--b {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(150%);
    opacity: 0;
  }
`;
let b = !1;
function m() {
  if (b) return;
  b = !0;
  const t = document.createElement("style");
  t.textContent = w, document.head.appendChild(t);
}
class i extends y {
  constructor() {
    super(...arguments), this.label = "", this.link = "#", this.btnClass = "", this.icon = "", this.hoverSwap = !1, this.inlineStyle = "";
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), m();
  }
  // Same behavior as tw-start-bundle's buy-now-button: rather than navigate
  // via `link`, jump straight to the store's fast-checkout block — scroll it
  // into view on desktop, or open it as a side drawer on mobile/when it's
  // configured for that layout (or isn't on the page at all).
  handleClick(e) {
    var c;
    if ((c = this.product) != null && c.isOutOfStock) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const o = window.innerWidth < 1024, n = document.querySelector(".s-block--fast-checkout"), s = n == null ? void 0 : n.getAttribute("data-layout");
    if (o || s === "side-drawer" || !n) {
      window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
      return;
    }
    n.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  render() {
    const e = this.product, o = !!(e != null && e.isOutOfStock), n = e ? d(e, this.label) : a`<span class="st-buy-btn__label">${this.label}</span>`;
    return a`
      <a
        class="st-buy-btn ${this.btnClass} ${o ? "is-out-of-stock" : ""}"
        style=${this.inlineStyle}
        href=${this.link || "#"}
        aria-disabled=${o ? "true" : "false"}
        @click=${(s) => this.handleClick(s)}
      >
        ${this.hoverSwap ? a`
              <span class="st-buy-btn__swap st-buy-btn__swap--a">${n}</span>
              <span class="st-buy-btn__swap st-buy-btn__swap--b">${n}</span>
            ` : n}
        ${this.icon ? a`<i class="${this.icon}"></i>` : ""}
      </a>
    `;
  }
}
l([
  r({ type: Object })
], i.prototype, "product");
l([
  r({ type: String })
], i.prototype, "label");
l([
  r({ type: String })
], i.prototype, "link");
l([
  r({ type: String, attribute: "btn-class" })
], i.prototype, "btnClass");
l([
  r({ type: String })
], i.prototype, "icon");
l([
  r({ type: Boolean, attribute: "hover-swap" })
], i.prototype, "hoverSwap");
l([
  r({ type: String, attribute: "inline-style" })
], i.prototype, "inlineStyle");
customElements.get("buy-now-button") || customElements.define("buy-now-button", i);
const $ = {
  price: 1990,
  regularPrice: 2500,
  currency: "ر.س",
  isOnSale: !0,
  isOutOfStock: !1
};
export {
  $ as m
};
