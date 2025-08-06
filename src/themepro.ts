import { createTheme, type ThemeOptions } from "./utils/createTheme";

 

export type ThemeproOptions = {
    theme?: 'dark' | 'light' | 'blue'
    size?: "x-small" | "small" | "medium" | "large" | "x-large";
    primaryColor?: string;  
    radius?: string;
}

export type ThemeSize = "x-small" | "small" | "medium" | "large" | "x-large";
export type ThemeType = "light" | "dark" | "blue" 
export type ThemeRadius = 'none' | ThemeSize

export class Themepro {
  _theme: string = 'light';
  _size: ThemeSize = "medium";
  _primaryColor: string = "var(--t-color-primary)";
  _radius: string = "none";
  options: ThemeproOptions;
  container!: HTMLElement;
  constructor(options?: ThemeproOptions) {
    this.options = Object.assign({},options);
    document.addEventListener(
      "DOMContentLoaded",
      this._onDomContentLoaded.bind(this)
    );
  }
  get size() {
    return this._size;
  }
  set size(value: ThemeSize) {
    this.container.setAttribute("size", value);
    this._size = value;
  }
  get radius(): string {
    return this._radius
  }
  set radius(value: string) {
    this.container.setAttribute("radius", value);
    this._radius = value;
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
    this._size = (this.container.getAttribute("size") as ThemeSize) || "medium";
    this._theme = (this.container.getAttribute("theme")) || "light";
    this._radius = (this.container.getAttribute("radius") as ThemeRadius) || "medium";     
  }
 
  setPrimaryColor(color: string) {} 
 
  createTheme(name:string,color:string,options?:ThemeOptions){
    createTheme(name,color,options)
  }
}

export const themePro = new Themepro();

globalThis.ThemePro = themePro;

declare global {
  var ThemePro: typeof themePro;
}
