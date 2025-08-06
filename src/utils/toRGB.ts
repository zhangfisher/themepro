export function toRGB(hexColor: string): [number, number, number] {
    let str = hexColor.trim();

    // 去掉可选的 #
    if (str.startsWith('#')) str = str.slice(1);

    // 3 位 → 6 位
    if (str.length === 3) {
        str = str.replace(/(.)/g, '$1$1');
    }
    // 4 位 → 8 位
    else if (str.length === 4) {
        str = str.replace(/(.)/g, '$1$1');
    }

    // 去掉末尾的 alpha（8 位 → 6 位）
    if (str.length === 8) {
        str = str.slice(0, 6);
    }

    // 必须是 6 位十六进制
    if (!/^[0-9a-f]{6}$/i.test(str)) {
        throw new Error('Invalid hex color');
    }

    const bigint = parseInt(str, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}