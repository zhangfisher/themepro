function p(o) {
  let t = o.trim();
  if (t.startsWith("#") && (t = t.slice(1)), t.length === 3 ? t = t.replace(/(.)/g, "$1$1") : t.length === 4 && (t = t.replace(/(.)/g, "$1$1")), t.length > 6 && (t = t.slice(0, 6)), !/^[0-9a-f]{6}$/i.test(t))
    throw new Error("Invalid hex color");
  const a = parseInt(t, 16), l = a >> 16 & 255, n = a >> 8 & 255, e = a & 255;
  return [l, n, e];
}
function y(o) {
  const t = p(o);
  return (t[0] * 2126 + t[1] * 7152 + t[2] * 722) / 1e4 < 128;
}
function M(o) {
  const [t, a, l] = Array.isArray(o) ? o : p(o), n = t / 255, e = a / 255, i = l / 255, r = Math.max(n, e, i), d = Math.min(n, e, i), h = r - d;
  let s = 0, c = 0;
  const m = (r + d) / 2;
  return h !== 0 && (r === n ? s = ((e - i) / h + (e < i ? 6 : 0)) / 6 : r === e ? s = ((i - n) / h + 2) / 6 : s = ((n - e) / h + 4) / 6), h !== 0 && (c = h / (1 - Math.abs(2 * m - 1))), [
    Math.round(s * 360),
    // 0-360
    Math.round(c * 100),
    // 0-100
    Math.round(m * 100)
    // 0-100
  ];
}
function $(o) {
  const [t, a, l] = o, n = t / 360, e = a / 100, i = l / 100, r = (1 - Math.abs(2 * i - 1)) * e, d = r * (1 - Math.abs(n * 6 % 2 - 1)), h = i - r / 2;
  let s = 0, c = 0, m = 0;
  0 <= n && n < 1 / 6 ? (s = r, c = d, m = 0) : 1 / 6 <= n && n < 2 / 6 ? (s = d, c = r, m = 0) : 2 / 6 <= n && n < 3 / 6 ? (s = 0, c = r, m = d) : 3 / 6 <= n && n < 4 / 6 ? (s = 0, c = d, m = r) : 4 / 6 <= n && n < 5 / 6 ? (s = d, c = 0, m = r) : (s = r, c = 0, m = d);
  const g = (v) => Math.round((v + h) * 255).toString(16).padStart(2, "0");
  return `#${g(s)}${g(c)}${g(m)}`;
}
function j(o) {
  const { color: t, range: a, dark: l, count: n } = Object.assign(
    {
      range: [5, 98],
      count: 5
    },
    o
  ), e = M(t), i = l ?? y(t), r = Array.from({ length: 2 * n + 1 });
  r[n] = t;
  let d = Math.abs(e[2] - a[0]), h = d / n, s = e[2];
  for (let c = n - 1; c >= 0; c--)
    s = s + (i ? -1 : 1) * h, s < 0 && (s = 0), s > 100 && (s = 100), r[c] = $([e[0], e[1], s]);
  s = e[2], d = Math.abs(e[2] - a[1]), h = d / n;
  for (let c = n + 1; c < n * 2 + 1; c++)
    s = s + (i ? 1 : -1) * h, s < 0 && (s = 0), s > 100 && (s = 100), r[c] = $([e[0], e[1], s]);
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
  ), { colors: l, dark: n } = j(a), e = {};
  l.reduce((d, h, s) => (e[`${o}${s}`] = h, d), {});
  const r = `--t-${o.split("-")[4]}`;
  return a.levels && (e[`${r}-color`] = `var(${o}${a.levels[0]})`, e[`${r}-bgcolor`] = `var(${o}${a.levels[1]})`, a.levels.slice(2).forEach((d, h) => {
    e[`${r}-bgcolor-${h + 1}`] = `var(${o}${d})`;
  })), { vars: e, colors: l, dark: n };
}
function f(o = 10) {
  return Math.random().toString(36).substring(2, o + 2);
}
function b(o, t) {
  if (globalThis.document == null) return;
  const { id: a, mode: l, location: n = "head" } = Object.assign({ mode: "default" }, t);
  let e = document.head.querySelector(`#${a}`), i = a || f();
  return e ? (l == "replace" ? e.innerHTML = o : l == "append" && (e.innerHTML += o), i) : (e = document.createElement("style"), e.innerHTML = o, e.id = i, t?.el ? t.el.appendChild(e) : n == "head" ? document.head.appendChild(e) : document.body.appendChild(e), e);
}
function T(o) {
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
  ), { vars: l, dark: n } = u("--t-color-theme-", a);
  t.variants.primary && u("--t-color-primary-", t.variants.primary), t.variants.danger && u("--t-color-danger-", t.variants.danger), t.variants.success && u("--t-color-success-", t.variants.success), t.variants.warning && u("--t-color-warning-", t.variants.warning), t.variants.info && u("--t-color-info-", t.variants.info);
  const e = `:host,:root[data-theme=${t.name}]{
        ${`color-schema: ${n ? "dark" : "light"}`};
        ${Object.entries(l).map(([i, r]) => `${i}:${r}`).join(`;
`)}}`;
  return b(e, {
    id: `theme-${t.name || f()}`,
    mode: "replace"
  }), e;
}
class C {
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
    const { vars: l } = u(`--t-color-${t}-`, a), e = `${this.theme === "light" ? ":root,:host" : `:host,
:root[data-theme=${this.theme}]`}{${Object.entries(l).map(([i, r]) => `${i}: ${r};`).join(`
`)}`;
    b(e, {
      id: `t-${this.theme}-${t}`,
      mode: "replace"
    });
  }
  create(t) {
    T(t);
  }
}
const O = new C();
globalThis.ThemePro = O;
export {
  C as Themepro,
  T as createTheme,
  j as generateGradientColors,
  f as getId,
  b as injectStylesheet,
  O as themePro
};
//# sourceMappingURL=index.js.map
