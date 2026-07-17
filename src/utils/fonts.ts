/**
 * Global PingAr font registration — mirrors source theme src/index.css:
 * five @font-face weights plus the global family/weight defaults.
 */

const FONT_STYLE_ID = 'st-pingar-fonts';

const COMPONENT_TAGS = [
  'st-hero',
  'st-cards',
  'st-feature',
  'st-demo',
  'st-product-images',
  'st-variants',
  'st-specification',
  'st-offers',
  'st-images-slider',
  'st-reviews',
  'st-footer',
];

function injectFonts() {
  if (document.getElementById(FONT_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = FONT_STYLE_ID;
  style.textContent = `
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

    ${COMPONENT_TAGS.join(',\n    ')} {
      font-family: 'PingAr', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 500;
    }
  `;
  document.head.appendChild(style);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFonts);
} else {
  injectFonts();
}

export default injectFonts;
