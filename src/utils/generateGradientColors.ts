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
import { isDark } from "./isDark";
import { rgbToHsl } from "./rgbToHsl";
import { hslToRgb } from "./hslToRgb";


export type GenerateGradientOptions = {
    /**
     * 根据亮度范围
     */
    range?:[number,number]
    dark?:boolean,
    count?:number, // 生成颜色数，默认是5,所以生成的颜色是11，包含基础颜色在内，最暗和最亮颜色位于两边
}
export function generateGradientColors (base:string,options?:GenerateGradientOptions):{colors:string[],dark:boolean}{
    const { range,dark,count } = Object.assign({
        range:[5,98],
        count:5
    },options)
    
  // 创建颜色对象
  const baseHsl= rgbToHsl(base);


  // 判断基础颜色是暗色还是亮色
  const isDarkColor = dark ?? isDark(base);
  
  // 生成11个梯度颜色
  const colors: string[] = Array.from({length:2*count+1})
  colors[count] = base;

    
    let lightnessRange = Math.abs(baseHsl[2] - range[0])
    let step = lightnessRange / count  

    let lightness = baseHsl[2] 
    for (let i = count-1; i >= 0; i--) {        
        lightness = lightness + (isDarkColor ? -1 : 1) * step        
        if(lightness<0) lightness = 0
        if(lightness>100) lightness = 100
        colors[i] = hslToRgb([baseHsl[0], baseHsl[1], lightness])
    }
    lightness = baseHsl[2] 
    lightnessRange = Math.abs(baseHsl[2] - range[1])
    step = lightnessRange / count  
    for (let i = count+1; i < count*2+1; i++) {
        lightness = lightness  + (isDarkColor ? 1 : -1) * step
        if(lightness<0) lightness = 0
        if(lightness>100) lightness = 100
        colors[i] = hslToRgb([baseHsl[0], baseHsl[1], lightness])
    } 
  return {colors,dark:isDarkColor}
}

// console.log(`.a{\n${generateGradientColors("#ff0000").colors.map(color=>"color:"+color).join(';\n')}}`) 
// console.log(`.a{\n${generateGradientColors("#00ff00").colors.map(color=>"color:"+color).join(';\n')}}`) 
// console.log(`.a{\n${generateGradientColors("#0000ff",{range:[20,80]}).colors.map(color=>"color:"+color).join(';\n')}}`) 
  