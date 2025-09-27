"use strict";
(() => {
  // src/utils/toRGB.ts
  function toRGB(hexColor) {
    let str = hexColor.trim();
    if (str.startsWith("#")) str = str.slice(1);
    if (str.length === 3) {
      str = str.replace(/(.)/g, "$1$1");
    } else if (str.length === 4) {
      str = str.replace(/(.)/g, "$1$1");
    }
    if (str.length > 6) {
      str = str.slice(0, 6);
    }
    if (!/^[0-9a-f]{6}$/i.test(str)) {
      throw new Error("Invalid hex color");
    }
    const bigint = parseInt(str, 16);
    const r = bigint >> 16 & 255;
    const g = bigint >> 8 & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  // src/utils/isDark.ts
  function isDark(color) {
    const rgb = toRGB(color);
    const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
    return yiq < 128;
  }

  // src/utils/rgbToHsl.ts
  function rgbToHsl(color) {
    const [r, g, b] = Array.isArray(color) ? color : toRGB(color);
    const rd = r / 255;
    const gd = g / 255;
    const bd = b / 255;
    const max = Math.max(rd, gd, bd);
    const min = Math.min(rd, gd, bd);
    const delta = max - min;
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (delta !== 0) {
      if (max === rd) {
        h = ((gd - bd) / delta + (gd < bd ? 6 : 0)) / 6;
      } else if (max === gd) {
        h = ((bd - rd) / delta + 2) / 6;
      } else {
        h = ((rd - gd) / delta + 4) / 6;
      }
    }
    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));
    }
    return [
      Math.round(h * 360),
      // 0-360
      Math.round(s * 100),
      // 0-100
      Math.round(l * 100)
      // 0-100
    ];
  }

  // src/utils/hslToRgb.ts
  function hslToRgb(hsl) {
    const [h, s, l] = hsl;
    const H = h / 360;
    const S = s / 100;
    const L = l / 100;
    const C = (1 - Math.abs(2 * L - 1)) * S;
    const X = C * (1 - Math.abs(H * 6 % 2 - 1));
    const m = L - C / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= H && H < 1 / 6) {
      r = C;
      g = X;
      b = 0;
    } else if (1 / 6 <= H && H < 2 / 6) {
      r = X;
      g = C;
      b = 0;
    } else if (2 / 6 <= H && H < 3 / 6) {
      r = 0;
      g = C;
      b = X;
    } else if (3 / 6 <= H && H < 4 / 6) {
      r = 0;
      g = X;
      b = C;
    } else if (4 / 6 <= H && H < 5 / 6) {
      r = X;
      g = 0;
      b = C;
    } else {
      r = C;
      g = 0;
      b = X;
    }
    const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // src/utils/generateGradientColors.ts
  function generateGradientColors(options) {
    const { color, range, dark, count } = Object.assign(
      {
        range: [5, 98],
        count: 5
      },
      options
    );
    const baseHsl = rgbToHsl(color);
    const isDarkColor = dark ?? isDark(color);
    const colors = Array.from({ length: 2 * count + 1 });
    colors[count] = color;
    let lightnessRange = Math.abs(baseHsl[2] - range[0]);
    let step = lightnessRange / count;
    let lightness = baseHsl[2];
    for (let i = count - 1; i >= 0; i--) {
      lightness = lightness + (isDarkColor ? -1 : 1) * step;
      if (lightness < 0) lightness = 0;
      if (lightness > 100) lightness = 100;
      colors[i] = hslToRgb([baseHsl[0], baseHsl[1], lightness]);
    }
    lightness = baseHsl[2];
    lightnessRange = Math.abs(baseHsl[2] - range[1]);
    step = lightnessRange / count;
    for (let i = count + 1; i < count * 2 + 1; i++) {
      lightness = lightness + (isDarkColor ? 1 : -1) * step;
      if (lightness < 0) lightness = 0;
      if (lightness > 100) lightness = 100;
      colors[i] = hslToRgb([baseHsl[0], baseHsl[1], lightness]);
    }
    return { colors, dark: isDarkColor };
  }

  // src/utils/createVariantVars.ts
  function createVariantVars(prefix, options) {
    const opts = Object.assign(
      {
        levels: [5, 1, 2, 3, 4, 5],
        range: [10, 98],
        count: 5
      },
      typeof options === "string" ? { color: options } : options
    );
    const { colors, dark } = generateGradientColors(opts);
    const vars = {};
    colors.reduce((all, cur, i) => {
      vars[`${prefix}${i}`] = cur;
      return all;
    }, {});
    const ps = prefix.split("-");
    const levelPrefix = `--t-${ps[4]}`;
    if (opts.levels) {
      vars[`${levelPrefix}-color`] = `var(${prefix}${opts.levels[0]})`;
      vars[`${levelPrefix}-bgcolor`] = `var(${prefix}${opts.levels[1]})`;
      opts.levels.slice(2).forEach((level, i) => {
        vars[`${levelPrefix}-bgcolor-${i + 1}`] = `var(${prefix}${level})`;
      });
    }
    return { vars, colors, dark };
  }

  // src/utils/getId.ts
  function getId(len = 10) {
    return Math.random().toString(36).substring(2, len + 2);
  }

  // src/utils/injectStylesheet.ts
  function injectStylesheet(css2, options) {
    if (globalThis.document === void 0) return;
    const { id, mode, location = "head" } = Object.assign({ mode: "default" }, options);
    let style = document.head.querySelector(`#${id}`);
    const scopeId = id || getId();
    if (!style) {
      style = document.createElement("style");
      style.innerHTML = css2;
      style.id = scopeId;
      if (options?.el) {
        options.el.appendChild(style);
      } else if (location === "head") {
        document.head.appendChild(style);
      } else {
        document.body.appendChild(style);
      }
    }
    if (mode === "replace") {
      style.innerHTML = css2;
    } else if (mode === "append") {
      style.innerHTML += css2;
    }
    return scopeId;
  }

  // src/utils/createTheme.ts
  function createTheme(options) {
    const opts = Object.assign(
      {
        name: getId(),
        variants: {},
        onInjectStyles: (themeStyles, themeName) => {
          return `:host,:root[data-theme=${themeName}]{
${themeStyles}
}`;
        }
      },
      options
    );
    const themeOpts = Object.assign(
      {
        prefix: "--t-color-theme-",
        range: [10, 100],
        levels: [10, 1, 2, 3, 4, 5]
      },
      typeof opts.theme === "string" ? { color: opts.theme } : opts.theme
    );
    const { vars, dark } = createVariantVars("--t-color-theme-", themeOpts);
    if (opts.variants.primary) createVariantVars("--t-color-primary-", opts.variants.primary);
    if (opts.variants.danger) createVariantVars("--t-color-danger-", opts.variants.danger);
    if (opts.variants.success) createVariantVars("--t-color-success-", opts.variants.success);
    if (opts.variants.warning) createVariantVars("--t-color-warning-", opts.variants.warning);
    if (opts.variants.info) createVariantVars("--t-color-info-", opts.variants.info);
    const style = opts.onInjectStyles(
      `${`color-schema: ${dark ? "dark" : "light"}`};
        ${Object.entries(vars).map(([key, value]) => `${key}:${value}`).join(";\n")}`,
      opts.name
    );
    injectStylesheet(
      style,
      Object.assign(
        {
          id: `theme-${opts.name || getId()}`,
          mode: "replace"
        },
        options?.injectStyle
      )
    );
    return style;
  }

  // src/themepro.ts
  var Themepro = class {
    constructor() {
      this.root = document.documentElement;
      document.addEventListener("DOMContentLoaded", this._onDomContentLoaded.bind(this));
    }
    get size() {
      return this.root.dataset.size || "medium";
    }
    set size(value) {
      this.root.dataset.size = value;
    }
    get spacing() {
      return this.root.dataset.spacing || "medium";
    }
    set spacing(value) {
      this.root.dataset.spacing = String(value);
    }
    get radius() {
      return this.root.dataset.radius || "medium";
    }
    set radius(value) {
      this.root.dataset.radius = value;
    }
    get theme() {
      return this.root.dataset.theme || "light";
    }
    set theme(value) {
      this.root.dataset.theme = value;
    }
    _onDomContentLoaded() {
      this.root = document.documentElement;
    }
    createVariant(variant, options) {
      const { vars } = createVariantVars(`--t-color-${variant}-`, options);
      const selector = this.theme === "light" ? `:root,:host` : `:host,
:root[data-theme=${this.theme}]`;
      const styles = `${selector}{${Object.entries(vars).map(([name, value]) => `${name}: ${value};`).join("\n")}`;
      injectStylesheet(styles, {
        id: `t-${this.theme}-${variant}`,
        mode: "replace"
      });
    }
    create(options) {
      createTheme(options);
    }
  };
  var themePro = new Themepro();
  globalThis.ThemePro = themePro;

  // src/utils/css.ts
  var global = globalThis;
  var supportsAdoptingStyleSheets = global.ShadowRoot && // @ts-expect-error
  (global.ShadyCSS === void 0 || global.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var constructionToken = Symbol();
  var cssTagCache = /* @__PURE__ */ new WeakMap();
  var CSSResult = class {
    constructor(cssText, strings, safeToken) {
      // This property needs to remain unminified.
      this["_$cssResult$"] = true;
      if (safeToken !== constructionToken) {
        throw new Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
        );
      }
      this.cssText = cssText;
      this._strings = strings;
    }
    // This is a getter so that it's lazy. In practice, this means stylesheets
    // are not created until the first element instance is made.
    get styleSheet() {
      let styleSheet = this._styleSheet;
      const strings = this._strings;
      if (supportsAdoptingStyleSheets && styleSheet === void 0) {
        const cacheable = strings !== void 0 && strings.length === 1;
        if (cacheable) {
          styleSheet = cssTagCache.get(strings);
        }
        if (styleSheet === void 0) {
          (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
          if (cacheable) {
            cssTagCache.set(strings, styleSheet);
          }
        }
      }
      return styleSheet;
    }
    toString() {
      return this.cssText;
    }
  };
  var textFromCSSResult = (value) => {
    if (value["_$cssResult$"] === true) {
      return value.cssText;
    } else if (typeof value === "number") {
      return value;
    } else {
      throw new Error(
        `Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`
      );
    }
  };
  var css = (strings, ...values) => {
    const cssText = strings.length === 1 ? strings[0] : values.reduce(
      (acc, v, idx) => (
        // @ts-expect-error
        acc + textFromCSSResult(v) + strings[idx + 1]
      ),
      strings[0]
    );
    return new CSSResult(
      // @ts-expect-error
      cssText,
      strings,
      constructionToken
    );
  };
  var adoptStyles = (renderRoot, styles) => {
    if (supportsAdoptingStyleSheets) {
      renderRoot.adoptedStyleSheets = styles.map(
        (s) => s instanceof CSSStyleSheet ? s : s.styleSheet
      );
    } else {
      for (const s of styles) {
        const style = document.createElement("style");
        const nonce = global["litNonce"];
        if (nonce !== void 0) {
          style.setAttribute("nonce", nonce);
        }
        style.textContent = s.cssText;
        renderRoot.appendChild(style);
      }
    }
  };
})();
//# sourceMappingURL=index.global.js.map