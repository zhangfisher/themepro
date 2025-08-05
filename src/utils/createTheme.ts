import { generateGradientColors } from "./generateGradientColors"
import { getId } from "./getId"
import { injectStylesheet } from "./injectStylesheet"

/**
 * 在header中创建主题颜色CSS变量
 * 
 * 
 * 
 * 
 */
export type ThemeOptions = {
    prefix?:string
    range?:[number,number]
}
export function createTheme(name:string,baseColor:string, options?:{prefix?:string, range?:[number,number]}){
    
    const { prefix } = Object.assign({        
        prefix:"--t-color-neutral-",
        range:[5,95]
    },options)

    const colors = generateGradientColors(baseColor,options);

    const vars = {
        [`${prefix}50`]:colors[0],
        [`${prefix}950`]:colors[10],
    }

    for(let i=1;i<colors.length-1;i++){        
        vars[`${prefix}${i}00`] = colors[i]
    }

    injectStylesheet(`:host,[theme=${name}]{
        ${Object.entries(vars).map(([key,value])=>`${key}:${value}`).join(';\n')}}`,{
            id: `theme-${name || getId()}`
    })

}