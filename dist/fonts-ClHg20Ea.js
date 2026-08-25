const e = "st-pingar-fonts", s = [
  "st-hero",
  "st-cards",
  "st-feature",
  "st-demo",
  "st-product-images",
  "st-variants",
  "st-specification",
  "st-offers",
  "st-images-slider",
  "st-reviews",
  "st-footer",
  "st-hotspots"
];
function n() {
  if (document.getElementById(e)) return;
  const t = document.createElement("style");
  t.id = e, t.textContent = `
    @font-face {
      font-family: 'PingAr';
      src: url('/assets/fonts/PingAR+LT-Regular.otf') format('opentype');
      font-weight: 400;
      font-display: swap;
    }
    @font-face {
      font-family: 'PingAr';
      src: url('/assets/fonts/PingAR+LT-Medium.otf') format('opentype');
      font-weight: 500 600;
      font-display: swap;
    }
    @font-face {
      font-family: 'PingAr';
      src: url('/assets/fonts/PingAR+LT-Bold.otf') format('opentype');
      font-weight: 700;
      font-display: swap;
    }
    @font-face {
      font-family: 'PingAr';
      src: url('/assets/fonts/PingAR+LT-Heavy.otf') format('opentype');
      font-weight: 800;
      font-display: swap;
    }
    @font-face {
      font-family: 'PingAr';
      src: url('/assets/fonts/PingAR+LT-Black.otf') format('opentype');
      font-weight: 900;
      font-display: swap;
    }

    ${s.join(`,
    `)} {
      font-family: 'PingAr', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 500;
    }
  `, document.head.appendChild(t);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", n) : n();
