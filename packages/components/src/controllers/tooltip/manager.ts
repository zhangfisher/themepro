import type { Tooltip } from "./tooltip";

export class TooltipManager extends Array<Tooltip> {
    has(el: HTMLElement) {
        return this.some((t) => t.el.deref() === el);
    }
    hide() {
        this.forEach((t) => {
            t.hide();
        });
    }
    destory() {
        this.forEach((t) => {
            t.hide();
            t.destroy();
        });
    }
}
