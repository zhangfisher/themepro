 

export type ThemeproOptions = {
    theme?: 'dark' | 'light' | 'blue'
    dark?: boolean;
    size?: "x-small" | "small" | "medium" | "large" | "x-large";
    primaryColor?: string;  
    borderRadius?: string;
}

export type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ThemeType = "light" | "dark" | "blue" 

export class Themepro {
  _dark: boolean = false;
  _theme: string = 'light';
  _size: ThemeSize = "medium";
  _primaryColor: string = "var(--color_primary)";
  _borderRadius: string = "none";
  options: ThemeproOptions;
  container!: HTMLElement;
  constructor(options?: ThemeproOptions) {
    this.options = Object.assign(
      {
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
  set size(value: ThemeSize) {
    this.container.setAttribute("size", value);
    this._size = value;
  }
  get borderRadius(): string {
    return this._borderRadius
  }
  set borderRadius(value: string) {
    this.container.setAttribute("size", value);
    this._borderRadius = value;
  }

  get theme(): string {
    return this._theme
  }
  set theme(value: string) {
    if(value==='light'){
        this.container.removeAttribute("theme"); 
    }else{
        this.container.setAttribute("theme", value);
    }    
    this._theme = value;
  }

  _onDomContentLoaded() {
    this.container = document.documentElement 
    this._dark = this.container.classList.contains("dark") || false;
    this._size =
      (this.container.getAttribute("size") as ThemeSize) || "medium";
    
  }
 
  setPrimaryColor(color: string) {}

  /**
   * 在head创建一个主题样式
   * 
   * 
   * @param name
   * @param color
   * 
   * <style id=`theme-${name}`
   * 
   * :host,
   * [theme=dark] {
   *     --t-color-neutral-50: #001c49;
        --t-color-neutral-100: #002766;
        --t-color-neutral-200: #003a8c;
        --t-color-neutral-300: #0050b3;
        --t-color-neutral-400: #096dd9;
        --t-color-neutral-500: #1890ff;
        --t-color-neutral-600: #40a9ff;
        --t-color-neutral-700: #69c0ff;
        --t-color-neutral-800: #91d5ff;
        --t-color-neutral-900: #bae7ff;
        --t-color-neutral-950: #e6f7ff;
    }
   */
  createTheme(name:string,color:string){

  }
}

export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
  var ThemePro: typeof themePro;
}
