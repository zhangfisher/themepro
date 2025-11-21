import type { LitElement } from "lit";

export function getSlotNodes(el: LitElement, slotName?: string): Node[] {
    const slot = el.renderRoot.querySelector(
        slotName ? `slot[name='${slotName}']` : "slot"
    );
    return Array.from(
        slot ? (slot as HTMLSlotElement).assignedNodes({ flatten: true }) : []
    ) as Node[];
}
