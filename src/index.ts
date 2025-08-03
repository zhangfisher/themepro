import { injectStylesheet } from "./utils/injectStylesheet";
import { rootStyle } from "./styles";

export type ThemeproOptions = {
  container: string;
};

export type ThemeProSize = "x-small" | "small" | "medium" | "large" | "x-large";
export class Themepro {
  _dark: boolean = false;
  _size: ThemeProSize = "medium";
  _primaryColor: string = "var(--color_primary)";
  options: Required<ThemeproOptions>;
  container!: HTMLElement;
  constructor(options?: ThemeproOptions) {
    this.options = Object.assign(
      {
        container: "body",
      },
      options
    );
    document.addEventListener(
      "DOMContentLoaded",
      this._onDomContentLoaded.bind(this)
    );
  }
  get dark() {
    return this._dark;
  }
  set dark(value: boolean) {
    if (value) {
      this.container.classList.add("dark");
    } else {
      this.container.classList.remove("dark");
    }
    this._dark = value;
  }
  get size() {
    return this._size;
  }
  set size(value: ThemeProSize) {
    this.container.setAttribute("size", value);
    this._size = value;
  }

  _onDomContentLoaded() {
    this.container = document.querySelector(
      this.options.container || "body"
    ) as HTMLElement;
    this._injectThemedStyles()
    this._dark = this.container.classList.contains("dark") || false;
    this._size =
      (this.container.getAttribute("size") as ThemeProSize) || "medium";
    
  }

  _injectThemedStyles(){
    injectStylesheet(rootStyle,{id:'themepro'})
  }

  setPrimaryColor(color: string) {}
}

export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
  var ThemePro: typeof themePro;
}
