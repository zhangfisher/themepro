import { isDark } from "./isDark";

export function isLight(color:string):boolean{
    return isDark(color)
}
