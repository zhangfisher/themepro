/**
* RGB → HSL
* @param rgb [R, G, B]，取值 0-255 的整数
* @returns   [H, S, L]，H 为 0-360，S/L 为 0-100
*/
export declare function rgbToHsl(color: string | [number, number, number]): [number, number, number];
