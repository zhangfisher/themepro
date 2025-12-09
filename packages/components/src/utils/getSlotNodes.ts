import type { LitElement } from "lit";

export function getSlotNodes(el: LitElement, slotName?: string): Node[] {
    const slot = el.renderRoot.querySelector(
        slotName ? `slot[name='${slotName}']` : "slot"
    );
    const nodes = Array.from(
        slot ? (slot as HTMLSlotElement).assignedNodes({ flatten: true }) : []
    ) as Node[];
    // 如果内部为空
    if (
        nodes.every(
            (node) => node instanceof Text && node.textContent?.trim() === ""
        )
    ) {
        return [];
    }
    return nodes;
}
