import type { ThemeOptions } from "../types";
import { createVariantVars } from "./createVariantVars";
import { getId } from "./getId";
import { injectStylesheet } from "./injectStylesheet";

export function createTheme(options: ThemeOptions) {
    const opts = Object.assign(
        {
            name: getId(),
            variants: {},
        },
        options
    ) as Required<ThemeOptions>;

    const themeOpts = Object.assign(
        {
            prefix: "--t-color-theme-",
            range: [10, 100],
            levels: [10, 1, 2, 3, 4, 5],
        },
        typeof opts.theme === "string" ? { color: opts.theme } : opts.theme
    );

    const selector = opts.selector || `:root,:host`;

    const { vars, dark } = createVariantVars("--t-color-theme-", themeOpts);

    if (opts.variants.primary)
        createVariantVars("--t-color-primary-", opts.variants.primary);
    if (opts.variants.danger)
        createVariantVars("--t-color-danger-", opts.variants.danger);
    if (opts.variants.success)
        createVariantVars("--t-color-success-", opts.variants.success);
    if (opts.variants.warning)
        createVariantVars("--t-color-warning-", opts.variants.warning);
    if (opts.variants.info)
        createVariantVars("--t-color-info-", opts.variants.info);

    const style = `${selector}[data-theme=${opts.name}]{
        ${`color-schema: ${dark ? "dark" : "light"}`};
        ${Object.entries(vars)
            .map(([key, value]) => `${key}:${value}`)
            .join(";\n")}}`;

    injectStylesheet(
        style,
        Object.assign(
            {
                id: `theme-${opts.name || getId()}`,
                mode: "replace",
            },
            options?.injectStyle
        )
    );
    return style;
}
