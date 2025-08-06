/**
 * 将 HSL 颜色转换为十六进制字符串
 * @param hsl [H, S, L]
 *   - H ∈ [0, 360]（色相）
 *   - S ∈ [0, 100]（饱和度 %）
 *   - L ∈ [0, 100]（亮度 %）
 * @returns 十六进制颜色字符串，例如 "#1298ab"
 */
export function hslToRgb(hsl: [number, number, number]): string {
  const [h, s, l] = hsl;

  // 归一化
  const H = h / 360;
  const S = s / 100;
  const L = l / 100;

  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((H * 6) % 2) - 1));
  const m = L - C / 2;

  let r = 0, g = 0, b = 0;

  if (0 <= H && H < 1 / 6)       { r = C; g = X; b = 0; }
  else if (1 / 6 <= H && H < 2 / 6) { r = X; g = C; b = 0; }
  else if (2 / 6 <= H && H < 3 / 6) { r = 0; g = C; b = X; }
  else if (3 / 6 <= H && H < 4 / 6) { r = 0; g = X; b = C; }
  else if (4 / 6 <= H && H < 5 / 6) { r = X; g = 0; b = C; }
  else                              { r = C; g = 0; b = X; }

  // 转 0-255 并补零到两位
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// /* === 测试 === */
// console.log(hslToRgb([0, 100, 50]));   // "#ff0000"
// console.log(hslToRgb([120, 100, 50])); // "#00ff00"
// console.log(hslToRgb([210, 50, 60]));  // "#6099cc"