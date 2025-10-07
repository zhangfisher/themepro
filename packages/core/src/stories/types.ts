import type { TemplateResult } from 'lit'

declare global {
    var themeSelector: () => TemplateResult
    var themeBackgroundSelector: () => TemplateResult
    var sizeSelector: (value: string) => TemplateResult
    var borderRadiusSelector: () => TemplateResult
}

// biome-ignore lint/complexity/noUselessEmptyExport: <noUselessEmptyExport>
export {}
