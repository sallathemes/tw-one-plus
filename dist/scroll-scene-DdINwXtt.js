function a(l) {
  var s;
  const t = l.document;
  return Math.max(t.documentElement.scrollHeight, ((s = t.body) == null ? void 0 : s.scrollHeight) ?? 0) - l.innerHeight > 1;
}
function f(l) {
  const t = l.getBoundingClientRect();
  let i = t.top, s = t.left, e = window;
  if (!a(e))
    for (; e.frameElement; ) {
      const h = e.frameElement.getBoundingClientRect();
      if (i += h.top, s += h.left, e = e.parent, a(e)) break;
    }
  return { top: i, left: s, width: t.width, height: t.height, win: e };
}
class d {
  constructor(t, i) {
    this.rafId = null, this.alive = !0, this.lastProgress = -1, this.lastTop = NaN, this.lastLeft = NaN, this.lastWidth = NaN, this.loop = () => {
      if (!this.alive) {
        this.rafId = null;
        return;
      }
      this.measure(), this.rafId = requestAnimationFrame(this.loop);
    }, this.el = t, this.cb = i, this.loop();
  }
  measure() {
    const { top: t, left: i, width: s, height: e, win: h } = f(this.el), n = h.innerHeight, r = e - n, o = r > 0 ? Math.min(1, Math.max(0, -t / r)) : t <= 0 ? 1 : 0;
    if (o !== this.lastProgress || t !== this.lastTop || i !== this.lastLeft || s !== this.lastWidth) {
      this.lastProgress = o, this.lastTop = t, this.lastLeft = i, this.lastWidth = s;
      const c = { top: t, left: i, width: s, height: e, bottom: t + e, right: i + s };
      this.cb(o, c, n);
    }
  }
  /** Force a re-measure (e.g. after layout-affecting changes). */
  refresh() {
    this.lastProgress = -1, this.alive && this.rafId === null && this.loop();
  }
  destroy() {
    this.alive = !1, this.rafId !== null && cancelAnimationFrame(this.rafId), this.rafId = null;
  }
}
export {
  d as S
};
