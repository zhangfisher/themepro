import type { ReactiveController } from 'lit'

/**
 * ResizeObserver controller for Lit elements
 * Observes size changes of the host element and calls host.onResize({width, height})
 */
export class ResizeObserver implements ReactiveController {
    private host: HTMLElement
    private observer: globalThis.ResizeObserver | null = null
    private debounceTimeout: number | null = null
    private debounceDelay: number = 100 // Default debounce delay in ms
    private lastWidth: number = 0
    private lastHeight: number = 0

    /**
     * @param host The host element to observe
     * @param options Configuration options
     */
    constructor(host: any, options: { debounceDelay?: number } = {}) {
        this.host = host
        host.addController(this)

        if (options.debounceDelay !== undefined) {
            this.debounceDelay = options.debounceDelay
        }
    }

    /**
     * Called when the host element is connected to the DOM
     */
    hostConnected() {
        // Check if ResizeObserver is supported in the browser
        if (typeof globalThis.ResizeObserver !== 'undefined') {
            try {
                this.observer = new globalThis.ResizeObserver(this.handleResize.bind(this))
                this.observer.observe(this.host)
            } catch (error) {
                console.error('Error initializing ResizeObserver:', error)
            }
        } else {
            console.warn('ResizeObserver is not supported in this browser')
        }
    }

    /**
     * Called when the host element is disconnected from the DOM
     */
    hostDisconnected() {
        this.cleanup()
    }

    /**
     * Called when the host element updates
     */
    hostUpdate() {
        // No specific action needed on update
    }

    /**
     * Handle resize events with debouncing
     */
    private handleResize(entries: globalThis.ResizeObserverEntry[]) {
        // Clear any existing timeout
        if (this.debounceTimeout !== null) {
            window.clearTimeout(this.debounceTimeout)
        }

        // Set a new timeout
        this.debounceTimeout = window.setTimeout(() => {
            for (const entry of entries) {
                if (entry.target === this.host) {
                    // Get the new dimensions
                    const width = entry.contentRect.width
                    const height = entry.contentRect.height

                    // Only trigger if dimensions actually changed
                    if (width !== this.lastWidth || height !== this.lastHeight) {
                        this.lastWidth = width
                        this.lastHeight = height

                        // Check if onResize method exists on host
                        // @ts-expect-error
                        if (typeof this.host.onResize === 'function') {
                            try {
                                // @ts-expect-error
                                this.host.onResize({ width, height })
                            } catch (error) {
                                console.error('Error calling onResize method:', error)
                            }
                        }
                    }
                }
            }
            this.debounceTimeout = null
        }, this.debounceDelay)
    }

    /**
     * Clean up resources
     */
    private cleanup() {
        // Stop observing
        if (this.observer) {
            this.observer.disconnect()
            this.observer = null
        }

        // Clear any pending timeout
        if (this.debounceTimeout !== null) {
            window.clearTimeout(this.debounceTimeout)
            this.debounceTimeout = null
        }
    }
}
