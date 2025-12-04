import { isNumber } from "flex-tools/typecheck/isNumber";
import { jsonParser } from "./jsonParser";
export function getDatasetFromElement(
    el: HTMLElement,
    keys: string[],
    prefix?: string
): Record<string, any> {
    const dataset: Record<string, any> = {};
    keys.forEach((key) => {
        const value =
            el.dataset[
                prefix
                    ? `${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`
                    : key
            ];
        if (value !== undefined) {
            try {
                if (["true", "false"].includes(value)) {
                    dataset[key] = value === "true";
                } else if (isNumber(value)) {
                    dataset[key] = Number(value);
                } else if (
                    (value.startsWith("[") && value.endsWith("]")) ||
                    (value.startsWith("{") && value.endsWith("}"))
                ) {
                    dataset[key] = jsonParser(value);
                } else {
                    dataset[key] = value;
                }
            } catch {
                dataset[key] = value;
            }
        }
    });
    return dataset;
}
