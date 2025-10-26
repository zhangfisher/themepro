import { createContext } from '@lit/context'
import type { AutoStore } from 'autostore'

// biome-ignore lint/suspicious/noEmptyInterface: <noEmptyInterface>
export interface ThemeProState {}
export type ThemeProStore = AutoStore<ThemeProState>
export const ThemeProContext = createContext<AutoStore<any>>('themepro')
