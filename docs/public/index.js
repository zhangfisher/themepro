import { C as k, a as H, c as w, s as E } from "./css-B6jjRtQ2.js";
function p(o) {
  let t = o.trim();
  if (t.startsWith("#") && (t = t.slice(1)), t.length === 3 ? t = t.replace(/(.)/g, "$1$1") : t.length === 4 && (t = t.replace(/(.)/g, "$1$1")), t.length > 6 && (t = t.slice(0, 6)), !/^[0-9a-f]{6}$/i.test(t))
    throw new Error("Invalid hex color");
  const a = parseInt(t, 16), d = a >> 16 & 255, s = a >> 8 & 255, e = a & 255;
  return [d, s, e];
}
function y(o) {
  const t = p(o);
  return (t[0] * 2126 + t[1] * 7152 + t[2] * 722) / 1e4 < 128;
}
function M(o) {
  const [t, a, d] = Array.isArray(o) ? o : p(o), s = t / 255, e = a / 255, i = d / 255, r = Math.max(s, e, i), c = Math.min(s, e, i), h = r - c;
  let n = 0, l = 0;
  const m = (r + c) / 2;
  return h !== 0 && (r === s ? n = ((e - i) / h + (e < i ? 6 : 0)) / 6 : r === e ? n = ((i - s) / h + 2) / 6 : n = ((s - e) / h + 4) / 6), h !== 0 && (l = h / (1 - Math.abs(2 * m - 1))), [
    Math.round(n * 360),
    // 0-360
    Math.round(l * 100),
    // 0-100
    Math.round(m * 100)
    // 0-100
  ];
}
function $(o) {
  const [t, a, d] = o, s = t / 360, e = a / 100, i = d / 100, r = (1 - Math.abs(2 * i - 1)) * e, c = r * (1 - Math.abs(s * 6 % 2 - 1)), h = i - r / 2;
  let n = 0, l = 0, m = 0;
  0 <= s && s < 1 / 6 ? (n = r, l = c, m = 0) : 1 / 6 <= s && s < 2 / 6 ? (n = c, l = r, m = 0) : 2 / 6 <= s && s < 3 / 6 ? (n = 0, l = r, m = c) : 3 / 6 <= s && s < 4 / 6 ? (n = 0, l = c, m = r) : 4 / 6 <= s && s < 5 / 6 ? (n = c, l = 0, m = r) : (n = r, l = 0, m = c);
  const g = (v) => Math.round((v + h) * 255).toString(16).padStart(2, "0");
  return `#${g(n)}${g(l)}${g(m)}`;
}
function S(o) {
  const { color: t, range: a, dark: d, count: s } = Object.assign(
    {
      range: [5, 98],
      count: 5
    },
    o
  ), e = M(t), i = d ?? y(t), r = Array.from({ length: 2 * s + 1 });
  r[s] = t;
  let c = Math.abs(e[2] - a[0]), h = c / s, n = e[2];
  for (let l = s - 1; l >= 0; l--)
    n = n + (i ? -1 : 1) * h, n < 0 && (n = 0), n > 100 && (n = 100), r[l] = $([e[0], e[1], n]);
  n = e[2], c = Math.abs(e[2] - a[1]), h = c / s;
  for (let l = s + 1; l < s * 2 + 1; l++)
    n = n + (i ? 1 : -1) * h, n < 0 && (n = 0), n > 100 && (n = 100), r[l] = $([e[0], e[1], n]);
  return { colors: r, dark: i };
}
function u(o, t) {
  const a = Object.assign(
    {
      levels: [5, 1, 2, 3, 4, 5],
      range: [10, 98],
      count: 5
    },
    typeof t == "string" ? { color: t } : t
  ), { colors: d, dark: s } = S(a), e = {};
  d.reduce((c, h, n) => (e[`${o}${n}`] = h, c), {});
  const r = `--t-${o.split("-")[4]}`;
  return a.levels && (e[`${r}-color`] = `var(${o}${a.levels[0]})`, e[`${r}-bgcolor`] = `var(${o}${a.levels[1]})`, a.levels.slice(2).forEach((c, h) => {
    e[`${r}-bgcolor-${h + 1}`] = `var(${o}${c})`;
  })), { vars: e, colors: d, dark: s };
}
function f(o = 10) {
  return Math.random().toString(36).substring(2, o + 2);
}
function b(o, t) {
  if (globalThis.document == null) return;
  const { id: a, mode: d, location: s = "head" } = Object.assign({ mode: "default" }, t);
  let e = document.head.querySelector(`#${a}`), i = a || f();
  return e ? (d == "replace" ? e.innerHTML = o : d == "append" && (e.innerHTML += o), i) : (e = document.createElement("style"), e.innerHTML = o, e.id = i, t?.el ? t.el.appendChild(e) : s == "head" ? document.head.appendChild(e) : document.body.appendChild(e), e);
}
function C(o) {
  const t = Object.assign(
    {
      name: f(),
      variants: {}
    },
    o
  ), a = Object.assign(
    {
      prefix: "--t-color-theme-",
      range: [10, 100],
      levels: [10, 1, 2, 3, 4, 5]
    },
    typeof t.theme == "string" ? { color: t.theme } : t.theme
  ), d = t.selector || ":root,:host", { vars: s, dark: e } = u("--t-color-theme-", a);
  t.variants.primary && u("--t-color-primary-", t.variants.primary), t.variants.danger && u("--t-color-danger-", t.variants.danger), t.variants.success && u("--t-color-success-", t.variants.success), t.variants.warning && u("--t-color-warning-", t.variants.warning), t.variants.info && u("--t-color-info-", t.variants.info);
  const i = `${d}[data-theme=${t.name}]{
        ${`color-schema: ${e ? "dark" : "light"}`};
        ${Object.entries(s).map(([r, c]) => `${r}:${c}`).join(`;
`)}}`;
  return b(i, {
    id: `theme-${t.name || f()}`,
    mode: "replace"
  }), i;
}
class j {
  root;
  constructor() {
    this.root = document.documentElement, document.addEventListener("DOMContentLoaded", this._onDomContentLoaded.bind(this));
  }
  get size() {
    return this.root.dataset.size || "medium";
  }
  set size(t) {
    this.root.dataset.size = t;
  }
  get spacing() {
    return this.root.dataset.spacing || "medium";
  }
  set spacing(t) {
    this.root.dataset.spacing = String(t);
  }
  get radius() {
    return this.root.dataset.radius || "medium";
  }
  set radius(t) {
    this.root.dataset.radius = t;
  }
  get theme() {
    return this.root.dataset.theme || "light";
  }
  set theme(t) {
    this.root.dataset.theme = t;
  }
  _onDomContentLoaded() {
    this.root = document.documentElement;
  }
  createVariant(t, a) {
    const { vars: d } = u(`--t-color-${t}-`, a), e = `${this.theme === "light" ? ":root,:host" : `:host,
:root[data-theme=${this.theme}]`}{${Object.entries(d).map(([i, r]) => `${i}: ${r};`).join(`
`)}`;
    b(e, {
      id: `t-${this.theme}-${t}`,
      mode: "replace"
    });
  }
  create(t) {
    C(t);
  }
}
const T = new j();
globalThis.ThemePro = T;
export {
  k as CSSResult,
  j as Themepro,
  H as adoptStyles,
  C as createTheme,
  w as css,
  S as generateGradientColors,
  f as getId,
  b as injectStylesheet,
  E as supportsAdoptingStyleSheets,
  T as themePro
};
//# sourceMappingURL=index.js.map
