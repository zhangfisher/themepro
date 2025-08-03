import { getId } from "./getId";

export interface InjectStylesheetOptions {
  location?: "head" | "body";
  id: string;
  // 默认仅当指定id的样式不存在时注入
  mode?: "replace" | "append" | 'default'
  // 当指定时，将在该元素下注入样式
  el?: HTMLElement;
}

export function injectStylesheet(css: string,options?: InjectStylesheetOptions) {
  if (globalThis.document == undefined) return;
  const {id, mode, location = "head" } = Object.assign({ mode: "default" }, options);
  let style = document.head.querySelector(`#${id}`) as HTMLStyleElement;
  let scopeId: string = id || getId();
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
  } else if(mode == "append"){
    style.innerHTML += css;
  }
  return scopeId;
}
