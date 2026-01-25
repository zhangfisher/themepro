// @ts-expect-error
import relaxedJson from 'really-relaxed-json'

export function parseRelaxedJson<T>(value: string): T {
    return JSON.parse(relaxedJson.toJson(value)) as T
}
