function y(e) {
  let t = e.trim();
  if (t.startsWith("#") && (t = t.slice(1)), t.length === 3 ? t = t.replace(/(.)/g, "$1$1") : t.length === 4 && (t = t.replace(/(.)/g, "$1$1")), t.length > 6 && (t = t.slice(0, 6)), !/^[0-9a-f]{6}$/i.test(t))
    throw new Error("Invalid hex color");
  const n = parseInt(t, 16), a = n >> 16 & 255, o = n >> 8 & 255, s = n & 255;
  return [a, o, s];
}
function M(e) {
  const t = y(e);
  return (t[0] * 2126 + t[1] * 7152 + t[2] * 722) / 1e4 < 128;
}
function w(e) {
  const [t, n, a] = Array.isArray(e) ? e : y(e), o = t / 255, s = n / 255, c = a / 255, i = Math.max(o, s, c), l = Math.min(o, s, c), d = i - l;
  let r = 0, h = 0;
  const u = (i + l) / 2;
  return d !== 0 && (i === o ? r = ((s - c) / d + (s < c ? 6 : 0)) / 6 : i === s ? r = ((c - o) / d + 2) / 6 : r = ((o - s) / d + 4) / 6), d !== 0 && (h = d / (1 - Math.abs(2 * u - 1))), [
    Math.round(r * 360),
    // 0-360
    Math.round(h * 100),
    // 0-100
    Math.round(u * 100)
    // 0-100
  ];
}
function p(e) {
  const [t, n, a] = e, o = t / 360, s = n / 100, c = a / 100, i = (1 - Math.abs(2 * c - 1)) * s, l = i * (1 - Math.abs(o * 6 % 2 - 1)), d = c - i / 2;
  let r = 0, h = 0, u = 0;
  0 <= o && o < 1 / 6 ? (r = i, h = l, u = 0) : 1 / 6 <= o && o < 2 / 6 ? (r = l, h = i, u = 0) : 2 / 6 <= o && o < 3 / 6 ? (r = 0, h = i, u = l) : 3 / 6 <= o && o < 4 / 6 ? (r = 0, h = l, u = i) : 4 / 6 <= o && o < 5 / 6 ? (r = l, h = 0, u = i) : (r = i, h = 0, u = l);
  const g = (T) => Math.round((T + d) * 255).toString(16).padStart(2, "0");
  return `#${g(r)}${g(h)}${g(u)}`;
}
function x(e) {
  const { color: t, range: n, dark: a, count: o } = Object.assign(
    {
      range: [5, 98],
      count: 5
    },
    e
  ), s = w(t), c = a ?? M(t), i = Array.from({ length: 2 * o + 1 });
  i[o] = t;
  let l = Math.abs(s[2] - n[0]), d = l / o, r = s[2];
  for (let h = o - 1; h >= 0; h--)
    r = r + (c ? -1 : 1) * d, r < 0 && (r = 0), r > 100 && (r = 100), i[h] = p([s[0], s[1], r]);
  r = s[2], l = Math.abs(s[2] - n[1]), d = l / o;
  for (let h = o + 1; h < o * 2 + 1; h++)
    r = r + (c ? 1 : -1) * d, r < 0 && (r = 0), r > 100 && (r = 100), i[h] = p([s[0], s[1], r]);
  return { colors: i, dark: c };
}
function m(e, t) {
  const n = Object.assign(
    {
      levels: [5, 1, 2, 3, 4, 5],
      range: [10, 98],
      count: 5
    },
    typeof t == "string" ? { color: t } : t
  ), { colors: a, dark: o } = x(n), s = {};
  a.reduce((l, d, r) => (s[`${e}${r}`] = d, l), {});
  const i = `--t-${e.split("-")[4]}`;
  return n.levels && (s[`${i}-color`] = `var(${e}${n.levels[0]})`, s[`${i}-bgcolor`] = `var(${e}${n.levels[1]})`, n.levels.slice(2).forEach((l, d) => {
    s[`${i}-bgcolor-${d + 1}`] = `var(${e}${l})`;
  })), { vars: s, colors: a, dark: o };
}
function S(e = 10) {
  return Math.random().toString(36).substring(2, e + 2);
}
function b(e, t) {
  if (globalThis.document == null) return;
  const { id: n, mode: a, location: o = "head" } = Object.assign({ mode: "default" }, t);
  let s = document.head.querySelector(`#${n}`), c = n || S();
  return s ? (a == "replace" ? s.innerHTML = e : a == "append" && (s.innerHTML += e), c) : (s = document.createElement("style"), s.innerHTML = e, s.id = c, t?.el ? t.el.appendChild(s) : o == "head" ? document.head.appendChild(s) : document.body.appendChild(s), s);
}
function j(e) {
  const t = Object.assign(
    {
      name: S(),
      variants: {}
    },
    e
  ), n = Object.assign(
    {
      prefix: "--t-color-theme-",
      range: [10, 100],
      levels: [10, 1, 2, 3, 4, 5]
    },
    typeof t.theme == "string" ? { color: t.theme } : t.theme
  ), a = t.selector || ":root,:host", { vars: o, dark: s } = m("--t-color-theme-", n);
  t.variants.primary && m("--t-color-primary-", t.variants.primary), t.variants.danger && m("--t-color-danger-", t.variants.danger), t.variants.success && m("--t-color-success-", t.variants.success), t.variants.warning && m("--t-color-warning-", t.variants.warning), t.variants.info && m("--t-color-info-", t.variants.info);
  const c = `${a}[data-theme=${t.name}]{
        ${`color-schema: ${s ? "dark" : "light"}`};
        ${Object.entries(o).map(([i, l]) => `${i}:${l}`).join(`;
`)}}`;
  return b(c, {
    id: `theme-${t.name || S()}`,
    mode: "replace"
  }), c;
}
class k {
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
  createVariant(t, n) {
    const { vars: a } = m(`--t-color-${t}-`, n), s = `${this.theme === "light" ? ":root,:host" : `:host,
:root[data-theme=${this.theme}]`}{${Object.entries(a).map(([c, i]) => `${c}: ${i};`).join(`
`)}`;
    b(s, {
      id: `t-${this.theme}-${t}`,
      mode: "replace"
    });
  }
  create(t) {
    j(t);
  }
}
const _ = new k();
globalThis.ThemePro = _;
const f = globalThis, v = f.ShadowRoot && // @ts-expect-error
(f.ShadyCSS === void 0 || f.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, C = Symbol(), $ = /* @__PURE__ */ new WeakMap();
class E {
  // This property needs to remain unminified.
  _$cssResult$ = !0;
  cssText;
  _styleSheet;
  _strings;
  constructor(t, n, a) {
    if (a !== C)
      throw new Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    this.cssText = t, this._strings = n;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  get styleSheet() {
    let t = this._styleSheet;
    const n = this._strings;
    if (v && t === void 0) {
      const a = n !== void 0 && n.length === 1;
      a && (t = $.get(n)), t === void 0 && ((this._styleSheet = t = new CSSStyleSheet()).replaceSync(this.cssText), a && $.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const O = (e) => {
  if (e._$cssResult$ === !0)
    return e.cssText;
  if (typeof e == "number")
    return e;
  throw new Error(
    `Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`
  );
}, L = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce(
    (a, o, s) => (
      // @ts-expect-error
      a + O(o) + e[s + 1]
    ),
    e[0]
  );
  return new E(
    // @ts-expect-error
    n,
    e,
    C
  );
}, R = (e, t) => {
  if (v)
    e.adoptedStyleSheets = t.map(
      (n) => n instanceof CSSStyleSheet ? n : n.styleSheet
    );
  else
    for (const n of t) {
      const a = document.createElement("style"), o = f.litNonce;
      o !== void 0 && a.setAttribute("nonce", o), a.textContent = n.cssText, e.appendChild(a);
    }
};
export {
  E as CSSResult,
  k as Themepro,
  R as adoptStyles,
  j as createTheme,
  L as css,
  x as generateGradientColors,
  S as getId,
  b as injectStylesheet,
  v as supportsAdoptingStyleSheets,
  _ as themePro
};
//# sourceMappingURL=index.js.map
