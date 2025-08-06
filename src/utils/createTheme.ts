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
    dark?:boolean        // 是否为深色系主题
}

export function createTheme(name:string,baseColor:string, options?:{prefix?:string, range?:[number,number]}){
    
    const { prefix } = Object.assign({        
        prefix:"--t-color-theme-",
        range:[10,90]
    },options)

    const {colors,dark} = generateGradientColors(baseColor,options);

    const vars:Record<string,string> = colors.reduce((all, cur,i) => {        // @ts-ignore
        all[`--t-color-theme-${i}`] = cur;
        return all
    },{})

    vars[`--t-theme-color`] = `var(--t-color-theme-10)`
    vars[`--t-theme-bgcolor`] = `var(--t-color-theme-0)`
    vars[`--t-theme-bgcolor-1`] = `var(--t-color-theme-1)`
    vars[`--t-theme-bgcolor-2`] = `var(--t-color-theme-2)`
    

    injectStylesheet(`:host,[theme=${name}]{
        ${Object.entries(vars).map(([key,value])=>`${key}:${value}`).join(';\n')}}`,{
            id: `theme-${name || getId()}`,
            mode: "replace",
    })

}