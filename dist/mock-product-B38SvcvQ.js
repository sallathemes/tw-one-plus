import { html as e } from "lit";
const i = "نفذت الكمية";
function r(n, t = "ر.س") {
  return `${n.toLocaleString("ar-SA")} ${t}`;
}
function o(n) {
  return !!(n.isOnSale && n.regularPrice && n.regularPrice > n.price);
}
function l(n, t, s = i) {
  if (n.isOutOfStock)
    return e`<span>${s}</span>`;
  const a = o(n);
  return e`
    <span class="st-buy-btn__label">
      ${t}
      ${n.price > 0 ? e` <span class="st-buy-btn__price">${r(n.price, n.currency)}</span>` : ""}
    </span>
    ${a ? e`<span class="st-buy-btn__original">${r(n.regularPrice, n.currency)}</span>` : ""}
  `;
}
const u = `
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
`, b = {
  price: 1990,
  regularPrice: 2500,
  currency: "ر.س",
  isOnSale: !0,
  isOutOfStock: !1
};
export {
  u as b,
  b as m,
  l as r
};
