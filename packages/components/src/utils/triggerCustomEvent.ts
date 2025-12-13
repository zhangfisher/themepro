export function triggerCustomEvent(el: HTMLElement, name: string, detail: any) {
    const event = new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
    });
    el.dispatchEvent(event);
}
