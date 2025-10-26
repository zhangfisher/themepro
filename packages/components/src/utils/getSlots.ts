import type { LitElement } from 'lit'

export function getSlots(el: LitElement): HTMLElement[] {
    const slot = el.renderRoot.querySelector('slot')
    return Array.from(slot ? (slot as HTMLSlotElement).assignedElements({ flatten: true }) : []) as HTMLElement[]
}
