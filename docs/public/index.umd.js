(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.themepro = {}));
})(this, function(exports2) {
  "use strict";
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
  function isDark(color) {
    const rgb = toRGB(color);
    const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
    return yiq < 128;
  }
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
  function getId(len = 10) {
    return Math.random().toString(36).substring(2, len + 2);
  }
  function injectStylesheet(css, options) {
    if (globalThis.document == void 0) return;
    const { id, mode, location = "head" } = Object.assign({ mode: "default" }, options);
    let style = document.head.querySelector(`#${id}`);
    let scopeId = id || getId();
    if (!style) {
      style = document.createElement("style");
      style.innerHTML = css;
      style.id = scopeId;
      if (options?.el) {
        options.el.appendChild(style);
      } else if (location == "head") {
        document.head.appendChild(style);
      } else {
        document.body.appendChild(style);
      }
      return style;
    }
    if (mode == "replace") {
      style.innerHTML = css;
    } else if (mode == "append") {
      style.innerHTML += css;
    }
    return scopeId;
  }
  function createTheme(options) {
    const opts = Object.assign(
      {
        name: getId(),
        variants: {}
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
    const style = `:host,:root[data-theme=${opts.name}]{
        ${`color-schema: ${dark ? "dark" : "light"}`};
        ${Object.entries(vars).map(([key, value]) => `${key}:${value}`).join(";\n")}}`;
    injectStylesheet(style, {
      id: `theme-${opts.name || getId()}`,
      mode: "replace"
    });
    return style;
  }
  class Themepro {
    root;
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
  }
  const themePro = new Themepro();
  globalThis.ThemePro = themePro;
  exports2.Themepro = Themepro;
  exports2.createTheme = createTheme;
  exports2.generateGradientColors = generateGradientColors;
  exports2.getId = getId;
  exports2.injectStylesheet = injectStylesheet;
  exports2.themePro = themePro;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=index.umd.js.map
