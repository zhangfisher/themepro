import { toRGB } from "./toRGB";

 
export function isDark(color:string):boolean{
    const rgb = toRGB(color);
    const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 10000;
    return yiq < 128;
}
