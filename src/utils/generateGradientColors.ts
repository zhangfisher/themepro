/**
 * 
 * 
 * 输入一个基础颜色，
 * 
 * 根据访颜色是暗色或者亮色生成梯度颜色
 * 
 * - 基础颜色位于中间
 * - 如果基础颜色是亮色，梯度是从亮到暗
 * - 如果基础颜色是暗色，梯度是从暗到亮
 * - 生成梯度颜色时，最亮颜色为偏移值0.5，最暗颜色偏移值-0.5
 * 
 * 
 * @param base 
 * 
 * 
 * 
 */
import color from "color"

export function generateGradientColors (base:string,options?:{range?:[number,number],dark?:boolean}):string[]{
    const range = options?.range ?? [5,95]
    
  // 创建颜色对象
  const baseColor = color(base);
  
  // 判断基础颜色是暗色还是亮色
  const isDarkColor = options?.dark ?? baseColor.isDark();
  
  // 生成11个梯度颜色
  const colors: string[] = [];
  
  // 偏移范围从-0.5到0.5
  const step = 0.1; // (0.5 - (-0.5)) / 10
  
  for (let i = 0; i < 11; i++) {
    // 计算当前偏移值，从-0.5到0.5
    const offset = -0.5 + i * step;
    
    let adjustedColor;
    
    // 获取基础颜色的HSL值
    const baseHue = baseColor.hue();
    const baseSaturation = baseColor.saturationl();
    
    // 设置亮度的最小和最大限制，避免纯黑色和纯白色
    const minLightness = range[0];  // 最小亮度，接近黑色但不是纯黑
    const maxLightness = range[1]; // 最大亮度，接近白色但不是纯白
    
    // 获取基础颜色的亮度
    const baseLightness = baseColor.lightness();
    
    // 根据基础颜色是暗色还是亮色来决定梯度方向
    // 同时确保基础颜色位于梯度的中间位置
    
    // 计算当前偏移在-0.5到0.5范围内的相对位置(-1到1)
    const relativePosition = offset / 0.5; // 从-1到1
    
    let newLightness;
    
    // 确保基础颜色在中间位置(offset=0时)
    if (isDarkColor) {
      // 暗色基础：从暗到亮
      // 负偏移：比基础更暗，正偏移：比基础更亮
      if (relativePosition <= 0) {
        // 从最小亮度到基础亮度
        newLightness = minLightness + (baseLightness - minLightness) * (relativePosition + 1);
      } else {
        // 从基础亮度到最大亮度
        newLightness = baseLightness + (maxLightness - baseLightness) * relativePosition;
      }
    } else {
      // 亮色基础：从亮到暗
      // 负偏移：比基础更亮，正偏移：比基础更暗
      if (relativePosition <= 0) {
        // 从最大亮度到基础亮度
        newLightness = maxLightness - (maxLightness - baseLightness) * (relativePosition + 1);
      } else {
        // 从基础亮度到最小亮度
        newLightness = baseLightness - (baseLightness - minLightness) * relativePosition;
      }
    }
    
    // 确保亮度在有效范围内
    const adjustedLightness = Math.max(minLightness, Math.min(newLightness, maxLightness));
    
    // 创建新颜色，保持色相和饱和度不变，只调整亮度
    adjustedColor = color.hsl(baseHue, baseSaturation, adjustedLightness);
    
    // 将颜色转换为十六进制格式并添加到数组
    colors.push(adjustedColor.hex());
  }
  
  return colors;
}

 