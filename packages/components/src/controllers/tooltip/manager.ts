import type { TooltipController } from "./controller";
import { Tooltip } from "./tooltip";
import type { TooltipControllerOptions } from "./types";
export class TooltipManager extends Array<Tooltip> {
    constructor(public controller: TooltipController) {
        super();
    }
    has(el: HTMLElement) {
        return this.some((t) => t.el.deref() === el);
    }
    get(el: HTMLElement) {
        const index = this.findIndex((t) => t.el.deref() === el);
        if (index !== -1) {
            return this[index];
        }
        return null;
    }
    hide() {
        this.forEach((t) => {
            t.hide();
        });
    }
    remove(tooltip: Tooltip) {
        const index = this.indexOf(tooltip);
        if (index !== -1) {
            this.splice(index, 1);
        }
    }
    destory() {
        this.forEach((t) => {
            t.hide();
            t.destroy();
        });
    }
    add(el: HTMLElement, options: TooltipControllerOptions) {
        const tooltip = new Tooltip(el, this.controller, {
            ...options,
            trigger: "mouseover",
        });
        this.push(tooltip);
        return tooltip;
    }
}
