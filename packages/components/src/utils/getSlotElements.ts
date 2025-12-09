import type { LitElement } from "lit";

export function getSlotElements(
    el: LitElement,
    slotName?: string
): HTMLElement[] {
    const slot = el.renderRoot.querySelector(
        slotName ? `slot[name='${slotName}']` : "slot"
    );
    return Array.from(
        slot
            ? (slot as HTMLSlotElement).assignedElements({ flatten: true })
            : []
    ) as HTMLElement[];
}
