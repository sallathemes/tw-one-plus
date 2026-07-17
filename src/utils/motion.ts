/**
 * Shared easing / interpolation helpers for scroll-driven motion.
 * Companion to ScrollScene — animation math lives here so components
 * stay declarative.
 */

export const clamp = (v: number, min = 0, max = 1): number => Math.min(max, Math.max(min, v));

export const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export const easeOutExpo = (x: number): number => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));

/**
 * Segment-local progress with a resting plateau: stays at 0 while `frac`
 * is inside the hold zone, then eases 0→1 across the remainder. Gives each
 * keyframe a moment to "be discovered" before the next transition begins.
 */
export const holdEase = (frac: number, hold: number): number =>
  frac <= hold ? 0 : easeInOutCubic(clamp((frac - hold) / (1 - hold)));

const parseHex = (input: string): [number, number, number] | null => {
  const hex = input.trim().replace(/^#/, '');
  const full =
    hex.length === 3
      ? hex.split('').map((c) => c + c).join('')
      : hex.length === 6
        ? hex
        : null;
  if (!full || /[^0-9a-f]/i.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
};

/**
 * Blends `color` into `base` (`weight` = share of base, 0..1).
 * Unparseable input falls back to `base` — safe for merchant-entered values.
 */
export const mixHex = (color: string, base: string, weight: number): string => {
  const c = parseHex(color);
  if (!c) return base;
  const b = parseHex(base) ?? [255, 255, 255];
  const [r, g, bl] = c.map((v, i) => Math.round(v * (1 - weight) + b[i] * weight));
  return `rgb(${r}, ${g}, ${bl})`;
};
