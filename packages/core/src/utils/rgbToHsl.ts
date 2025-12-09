import { toRGB } from "./toRGB";

   /**
 * RGB → HSL
 * @param rgb [R, G, B]，取值 0-255 的整数
 * @returns   [H, S, L]，H 为 0-360，S/L 为 0-100
 */
export function rgbToHsl(color: string | [number, number, number]): [number, number, number] {
    const [r, g, b] = Array.isArray(color) ? color : toRGB(color);
    // 1. 归一化到 [0,1]
    const rd = r / 255;
    const gd = g / 255;
    const bd = b / 255;

    const max = Math.max(rd, gd, bd);
    const min = Math.min(rd, gd, bd);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    // 2. 计算色相 H
    if (delta !== 0) {
        if (max === rd) {
            h = ((gd - bd) / delta + (gd < bd ? 6 : 0)) / 6;
        } else if (max === gd) {
            h = ((bd - rd) / delta + 2) / 6;
        } else {
            h = ((rd - gd) / delta + 4) / 6;
        }
    }

    // 3. 计算饱和度 S
    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));
    }

    // 4. 结果映射
    return [
        Math.round(h * 360),         // 0-360
        Math.round(s * 100),         // 0-100
        Math.round(l * 100)          // 0-100
    ];
}
 

// /* === 简单测试 === */
// console.log(rgbToHsl([255, 0, 0]));    // [0, 100, 50]   纯红
// console.log(rgbToHsl([128, 128, 128])); // [0, 0, 50]     中灰
// console.log(rgbToHsl([0, 255, 255]));   // [180, 100, 50] 青色  