"use strict";
(() => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __decorateClass = (decorators, target, key, kind) => {
		var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
		for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
			if ((decorator = decorators[i4]))
				result = (kind ? decorator(target, key, result) : decorator(result)) || result;
		if (kind && result) __defProp(target, key, result);
		return result;
	};

	// node_modules/@lit-labs/ssr-dom-shim/lib/element-internals.js
	var ElementInternalsShim = class ElementInternals {
		get shadowRoot() {
			return this.__host.__shadowRoot;
		}
		constructor(_host) {
			this.ariaAtomic = "";
			this.ariaAutoComplete = "";
			this.ariaBrailleLabel = "";
			this.ariaBrailleRoleDescription = "";
			this.ariaBusy = "";
			this.ariaChecked = "";
			this.ariaColCount = "";
			this.ariaColIndex = "";
			this.ariaColSpan = "";
			this.ariaCurrent = "";
			this.ariaDescription = "";
			this.ariaDisabled = "";
			this.ariaExpanded = "";
			this.ariaHasPopup = "";
			this.ariaHidden = "";
			this.ariaInvalid = "";
			this.ariaKeyShortcuts = "";
			this.ariaLabel = "";
			this.ariaLevel = "";
			this.ariaLive = "";
			this.ariaModal = "";
			this.ariaMultiLine = "";
			this.ariaMultiSelectable = "";
			this.ariaOrientation = "";
			this.ariaPlaceholder = "";
			this.ariaPosInSet = "";
			this.ariaPressed = "";
			this.ariaReadOnly = "";
			this.ariaRequired = "";
			this.ariaRoleDescription = "";
			this.ariaRowCount = "";
			this.ariaRowIndex = "";
			this.ariaRowSpan = "";
			this.ariaSelected = "";
			this.ariaSetSize = "";
			this.ariaSort = "";
			this.ariaValueMax = "";
			this.ariaValueMin = "";
			this.ariaValueNow = "";
			this.ariaValueText = "";
			this.role = "";
			this.form = null;
			this.labels = [];
			this.states = /* @__PURE__ */ new Set();
			this.validationMessage = "";
			this.validity = {};
			this.willValidate = true;
			this.__host = _host;
		}
		checkValidity() {
			console.warn(
				"`ElementInternals.checkValidity()` was called on the server.This method always returns true.",
			);
			return true;
		}
		reportValidity() {
			return true;
		}
		setFormValue() {}
		setValidity() {}
	};

	// node_modules/@lit-labs/ssr-dom-shim/lib/events.js
	var __classPrivateFieldSet = function (receiver, state, value, kind, f3) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f3) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f3.call(receiver, value) : f3 ? (f3.value = value) : state.set(receiver, value), value;
	};
	var __classPrivateFieldGet = function (receiver, state, kind, f3) {
		if (kind === "a" && !f3) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
	};
	var _Event_cancelable;
	var _Event_bubbles;
	var _Event_composed;
	var _Event_defaultPrevented;
	var _Event_timestamp;
	var _Event_propagationStopped;
	var _Event_type;
	var _Event_target;
	var _Event_isBeingDispatched;
	var _a;
	var _CustomEvent_detail;
	var _b;
	var isCaptureEventListener = (options) => (typeof options === "boolean" ? options : (options?.capture ?? false));
	var NONE = 0;
	var CAPTURING_PHASE = 1;
	var AT_TARGET = 2;
	var BUBBLING_PHASE = 3;
	var EventTarget = class {
		constructor() {
			this.__eventListeners = /* @__PURE__ */ new Map();
			this.__captureEventListeners = /* @__PURE__ */ new Map();
		}
		addEventListener(type, callback, options) {
			if (callback === void 0 || callback === null) {
				return;
			}
			const eventListenersMap = isCaptureEventListener(options)
				? this.__captureEventListeners
				: this.__eventListeners;
			let eventListeners = eventListenersMap.get(type);
			if (eventListeners === void 0) {
				eventListeners = /* @__PURE__ */ new Map();
				eventListenersMap.set(type, eventListeners);
			} else if (eventListeners.has(callback)) {
				return;
			}
			const normalizedOptions = typeof options === "object" && options ? options : {};
			normalizedOptions.signal?.addEventListener("abort", () =>
				this.removeEventListener(type, callback, options),
			);
			eventListeners.set(callback, normalizedOptions ?? {});
		}
		removeEventListener(type, callback, options) {
			if (callback === void 0 || callback === null) {
				return;
			}
			const eventListenersMap = isCaptureEventListener(options)
				? this.__captureEventListeners
				: this.__eventListeners;
			const eventListeners = eventListenersMap.get(type);
			if (eventListeners !== void 0) {
				eventListeners.delete(callback);
				if (!eventListeners.size) {
					eventListenersMap.delete(type);
				}
			}
		}
		dispatchEvent(event) {
			const composedPath = [this];
			let parent = this.__eventTargetParent;
			if (event.composed) {
				while (parent) {
					composedPath.push(parent);
					parent = parent.__eventTargetParent;
				}
			} else {
				while (parent && parent !== this.__host) {
					composedPath.push(parent);
					parent = parent.__eventTargetParent;
				}
			}
			let stopPropagation = false;
			let stopImmediatePropagation = false;
			let eventPhase = NONE;
			let target = null;
			let tmpTarget = null;
			let currentTarget = null;
			const originalStopPropagation = event.stopPropagation;
			const originalStopImmediatePropagation = event.stopImmediatePropagation;
			Object.defineProperties(event, {
				target: {
					get() {
						return target ?? tmpTarget;
					},
					...enumerableProperty,
				},
				srcElement: {
					get() {
						return event.target;
					},
					...enumerableProperty,
				},
				currentTarget: {
					get() {
						return currentTarget;
					},
					...enumerableProperty,
				},
				eventPhase: {
					get() {
						return eventPhase;
					},
					...enumerableProperty,
				},
				composedPath: {
					value: () => composedPath,
					...enumerableProperty,
				},
				stopPropagation: {
					value: () => {
						stopPropagation = true;
						originalStopPropagation.call(event);
					},
					...enumerableProperty,
				},
				stopImmediatePropagation: {
					value: () => {
						stopImmediatePropagation = true;
						originalStopImmediatePropagation.call(event);
					},
					...enumerableProperty,
				},
			});
			const invokeEventListener = (listener, options, eventListenerMap) => {
				if (typeof listener === "function") {
					listener(event);
				} else if (typeof listener?.handleEvent === "function") {
					listener.handleEvent(event);
				}
				if (options.once) {
					eventListenerMap.delete(listener);
				}
			};
			const finishDispatch = () => {
				currentTarget = null;
				eventPhase = NONE;
				return !event.defaultPrevented;
			};
			const captureEventPath = composedPath.slice().reverse();
			target = !this.__host || !event.composed ? this : null;
			const retarget = (eventTargets) => {
				tmpTarget = this;
				while (tmpTarget.__host && eventTargets.includes(tmpTarget.__host)) {
					tmpTarget = tmpTarget.__host;
				}
			};
			for (const eventTarget of captureEventPath) {
				if (!target && (!tmpTarget || tmpTarget === eventTarget.__host)) {
					retarget(captureEventPath.slice(captureEventPath.indexOf(eventTarget)));
				}
				currentTarget = eventTarget;
				eventPhase = eventTarget === event.target ? AT_TARGET : CAPTURING_PHASE;
				const captureEventListeners = eventTarget.__captureEventListeners.get(event.type);
				if (captureEventListeners) {
					for (const [listener, options] of captureEventListeners) {
						invokeEventListener(listener, options, captureEventListeners);
						if (stopImmediatePropagation) {
							return finishDispatch();
						}
					}
				}
				if (stopPropagation) {
					return finishDispatch();
				}
			}
			const bubbleEventPath = event.bubbles ? composedPath : [this];
			tmpTarget = null;
			for (const eventTarget of bubbleEventPath) {
				if (!target && (!tmpTarget || eventTarget === tmpTarget.__host)) {
					retarget(bubbleEventPath.slice(0, bubbleEventPath.indexOf(eventTarget) + 1));
				}
				currentTarget = eventTarget;
				eventPhase = eventTarget === event.target ? AT_TARGET : BUBBLING_PHASE;
				const captureEventListeners = eventTarget.__eventListeners.get(event.type);
				if (captureEventListeners) {
					for (const [listener, options] of captureEventListeners) {
						invokeEventListener(listener, options, captureEventListeners);
						if (stopImmediatePropagation) {
							return finishDispatch();
						}
					}
				}
				if (stopPropagation) {
					return finishDispatch();
				}
			}
			return finishDispatch();
		}
	};
	var EventTargetShimWithRealType = EventTarget;
	var enumerableProperty = { __proto__: null };
	enumerableProperty.enumerable = true;
	Object.freeze(enumerableProperty);
	var EventShim =
		((_a = class Event {
			constructor(type, options = {}) {
				_Event_cancelable.set(this, false);
				_Event_bubbles.set(this, false);
				_Event_composed.set(this, false);
				_Event_defaultPrevented.set(this, false);
				_Event_timestamp.set(this, Date.now());
				_Event_propagationStopped.set(this, false);
				_Event_type.set(this, void 0);
				_Event_target.set(this, void 0);
				_Event_isBeingDispatched.set(this, void 0);
				this.NONE = NONE;
				this.CAPTURING_PHASE = CAPTURING_PHASE;
				this.AT_TARGET = AT_TARGET;
				this.BUBBLING_PHASE = BUBBLING_PHASE;
				if (arguments.length === 0) throw new Error(`The type argument must be specified`);
				if (typeof options !== "object" || !options) {
					throw new Error(`The "options" argument must be an object`);
				}
				const { bubbles, cancelable, composed } = options;
				__classPrivateFieldSet(this, _Event_cancelable, !!cancelable, "f");
				__classPrivateFieldSet(this, _Event_bubbles, !!bubbles, "f");
				__classPrivateFieldSet(this, _Event_composed, !!composed, "f");
				__classPrivateFieldSet(this, _Event_type, `${type}`, "f");
				__classPrivateFieldSet(this, _Event_target, null, "f");
				__classPrivateFieldSet(this, _Event_isBeingDispatched, false, "f");
			}
			initEvent(_type, _bubbles, _cancelable) {
				throw new Error("Method not implemented.");
			}
			stopImmediatePropagation() {
				this.stopPropagation();
			}
			preventDefault() {
				__classPrivateFieldSet(this, _Event_defaultPrevented, true, "f");
			}
			get target() {
				return __classPrivateFieldGet(this, _Event_target, "f");
			}
			get currentTarget() {
				return __classPrivateFieldGet(this, _Event_target, "f");
			}
			get srcElement() {
				return __classPrivateFieldGet(this, _Event_target, "f");
			}
			get type() {
				return __classPrivateFieldGet(this, _Event_type, "f");
			}
			get cancelable() {
				return __classPrivateFieldGet(this, _Event_cancelable, "f");
			}
			get defaultPrevented() {
				return (
					__classPrivateFieldGet(this, _Event_cancelable, "f") &&
					__classPrivateFieldGet(this, _Event_defaultPrevented, "f")
				);
			}
			get timeStamp() {
				return __classPrivateFieldGet(this, _Event_timestamp, "f");
			}
			composedPath() {
				return __classPrivateFieldGet(this, _Event_isBeingDispatched, "f")
					? [__classPrivateFieldGet(this, _Event_target, "f")]
					: [];
			}
			get returnValue() {
				return (
					!__classPrivateFieldGet(this, _Event_cancelable, "f") ||
					!__classPrivateFieldGet(this, _Event_defaultPrevented, "f")
				);
			}
			get bubbles() {
				return __classPrivateFieldGet(this, _Event_bubbles, "f");
			}
			get composed() {
				return __classPrivateFieldGet(this, _Event_composed, "f");
			}
			get eventPhase() {
				return __classPrivateFieldGet(this, _Event_isBeingDispatched, "f") ? _a.AT_TARGET : _a.NONE;
			}
			get cancelBubble() {
				return __classPrivateFieldGet(this, _Event_propagationStopped, "f");
			}
			set cancelBubble(value) {
				if (value) {
					__classPrivateFieldSet(this, _Event_propagationStopped, true, "f");
				}
			}
			stopPropagation() {
				__classPrivateFieldSet(this, _Event_propagationStopped, true, "f");
			}
			get isTrusted() {
				return false;
			}
		}),
		(_Event_cancelable = /* @__PURE__ */ new WeakMap()),
		(_Event_bubbles = /* @__PURE__ */ new WeakMap()),
		(_Event_composed = /* @__PURE__ */ new WeakMap()),
		(_Event_defaultPrevented = /* @__PURE__ */ new WeakMap()),
		(_Event_timestamp = /* @__PURE__ */ new WeakMap()),
		(_Event_propagationStopped = /* @__PURE__ */ new WeakMap()),
		(_Event_type = /* @__PURE__ */ new WeakMap()),
		(_Event_target = /* @__PURE__ */ new WeakMap()),
		(_Event_isBeingDispatched = /* @__PURE__ */ new WeakMap()),
		(_a.NONE = NONE),
		(_a.CAPTURING_PHASE = CAPTURING_PHASE),
		(_a.AT_TARGET = AT_TARGET),
		(_a.BUBBLING_PHASE = BUBBLING_PHASE),
		_a);
	Object.defineProperties(EventShim.prototype, {
		initEvent: enumerableProperty,
		stopImmediatePropagation: enumerableProperty,
		preventDefault: enumerableProperty,
		target: enumerableProperty,
		currentTarget: enumerableProperty,
		srcElement: enumerableProperty,
		type: enumerableProperty,
		cancelable: enumerableProperty,
		defaultPrevented: enumerableProperty,
		timeStamp: enumerableProperty,
		composedPath: enumerableProperty,
		returnValue: enumerableProperty,
		bubbles: enumerableProperty,
		composed: enumerableProperty,
		eventPhase: enumerableProperty,
		cancelBubble: enumerableProperty,
		stopPropagation: enumerableProperty,
		isTrusted: enumerableProperty,
	});
	var CustomEventShim =
		((_b = class CustomEvent extends EventShim {
			constructor(type, options = {}) {
				super(type, options);
				_CustomEvent_detail.set(this, void 0);
				__classPrivateFieldSet(this, _CustomEvent_detail, options?.detail ?? null, "f");
			}
			initCustomEvent(_type, _bubbles, _cancelable, _detail) {
				throw new Error("Method not implemented.");
			}
			get detail() {
				return __classPrivateFieldGet(this, _CustomEvent_detail, "f");
			}
		}),
		(_CustomEvent_detail = /* @__PURE__ */ new WeakMap()),
		_b);
	Object.defineProperties(CustomEventShim.prototype, {
		detail: enumerableProperty,
	});
	var EventShimWithRealType = EventShim;
	var CustomEventShimWithRealType = CustomEventShim;

	// node_modules/@lit-labs/ssr-dom-shim/index.js
	globalThis.Event ??= EventShimWithRealType;
	globalThis.CustomEvent ??= CustomEventShimWithRealType;
	var attributes = /* @__PURE__ */ new WeakMap();
	var attributesForElement = (element) => {
		let attrs = attributes.get(element);
		if (attrs === void 0) {
			attributes.set(element, (attrs = /* @__PURE__ */ new Map()));
		}
		return attrs;
	};
	var ElementShim = class Element extends EventTargetShimWithRealType {
		constructor() {
			super(...arguments);
			this.__shadowRootMode = null;
			this.__shadowRoot = null;
			this.__internals = null;
		}
		get attributes() {
			return Array.from(attributesForElement(this)).map(([name, value]) => ({
				name,
				value,
			}));
		}
		get shadowRoot() {
			if (this.__shadowRootMode === "closed") {
				return null;
			}
			return this.__shadowRoot;
		}
		get localName() {
			return this.constructor.__localName;
		}
		get tagName() {
			return this.localName?.toUpperCase();
		}
		setAttribute(name, value) {
			attributesForElement(this).set(name, String(value));
		}
		removeAttribute(name) {
			attributesForElement(this).delete(name);
		}
		toggleAttribute(name, force) {
			if (this.hasAttribute(name)) {
				if (force === void 0 || !force) {
					this.removeAttribute(name);
					return false;
				}
			} else {
				if (force === void 0 || force) {
					this.setAttribute(name, "");
					return true;
				} else {
					return false;
				}
			}
			return true;
		}
		hasAttribute(name) {
			return attributesForElement(this).has(name);
		}
		attachShadow(init) {
			const shadowRoot = { host: this };
			this.__shadowRootMode = init.mode;
			if (init && init.mode === "open") {
				this.__shadowRoot = shadowRoot;
			}
			return shadowRoot;
		}
		attachInternals() {
			if (this.__internals !== null) {
				throw new Error(
					`Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.`,
				);
			}
			const internals = new ElementInternalsShim(this);
			this.__internals = internals;
			return internals;
		}
		getAttribute(name) {
			const value = attributesForElement(this).get(name);
			return value ?? null;
		}
	};
	var HTMLElementShim = class HTMLElement extends ElementShim {};
	var HTMLElementShimWithRealType = HTMLElementShim;
	globalThis.litServerRoot ??= Object.defineProperty(new HTMLElementShimWithRealType(), "localName", {
		// Patch localName (and tagName) to return a unique name.
		get() {
			return "lit-server-root";
		},
	});
	function promiseWithResolvers() {
		let resolve;
		let reject;
		const promise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});
		return { promise, resolve, reject };
	}
	var CustomElementRegistry = class {
		constructor() {
			this.__definitions = /* @__PURE__ */ new Map();
			this.__reverseDefinitions = /* @__PURE__ */ new Map();
			this.__pendingWhenDefineds = /* @__PURE__ */ new Map();
		}
		define(name, ctor) {
			if (this.__definitions.has(name)) {
				if (process.env.NODE_ENV === "development") {
					console.warn(`'CustomElementRegistry' already has "${name}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);
				} else {
					throw new Error(
						`Failed to execute 'define' on 'CustomElementRegistry': the name "${name}" has already been used with this registry`,
					);
				}
			}
			if (this.__reverseDefinitions.has(ctor)) {
				throw new Error(
					`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(ctor)}`,
				);
			}
			ctor.__localName = name;
			this.__definitions.set(name, {
				ctor,
				// Note it's important we read `observedAttributes` in case it is a getter
				// with side-effects, as is the case in Lit, where it triggers class
				// finalization.
				//
				// TODO(aomarks) To be spec compliant, we should also capture the
				// registration-time lifecycle methods like `connectedCallback`. For them
				// to be actually accessible to e.g. the Lit SSR element renderer, though,
				// we'd need to introduce a new API for accessing them (since `get` only
				// returns the constructor).
				observedAttributes: ctor.observedAttributes ?? [],
			});
			this.__reverseDefinitions.set(ctor, name);
			this.__pendingWhenDefineds.get(name)?.resolve(ctor);
			this.__pendingWhenDefineds.delete(name);
		}
		get(name) {
			const definition = this.__definitions.get(name);
			return definition?.ctor;
		}
		getName(ctor) {
			return this.__reverseDefinitions.get(ctor) ?? null;
		}
		upgrade(_element) {
			throw new Error(
				`customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.`,
			);
		}
		async whenDefined(name) {
			const definition = this.__definitions.get(name);
			if (definition) {
				return definition.ctor;
			}
			let withResolvers = this.__pendingWhenDefineds.get(name);
			if (!withResolvers) {
				withResolvers = promiseWithResolvers();
				this.__pendingWhenDefineds.set(name, withResolvers);
			}
			return withResolvers.promise;
		}
	};
	var CustomElementRegistryShimWithRealType = CustomElementRegistry;
	var customElements2 = new CustomElementRegistryShimWithRealType();

	// node_modules/@lit/reactive-element/node/css-tag.js
	var t = globalThis;
	var e =
		t.ShadowRoot &&
		(void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
		"adoptedStyleSheets" in Document.prototype &&
		"replace" in CSSStyleSheet.prototype;
	var s = Symbol();
	var o = /* @__PURE__ */ new WeakMap();
	var n = class {
		constructor(t4, e4, o6) {
			if (((this._$cssResult$ = true), o6 !== s))
				throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			(this.cssText = t4), (this.t = e4);
		}
		get styleSheet() {
			let t4 = this.o;
			const s4 = this.t;
			if (e && void 0 === t4) {
				const e4 = void 0 !== s4 && 1 === s4.length;
				e4 && (t4 = o.get(s4)),
					void 0 === t4 &&
						((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s4, t4));
			}
			return t4;
		}
		toString() {
			return this.cssText;
		}
	};
	var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
	var i = (t4, ...e4) => {
		const o6 =
			1 === t4.length
				? t4[0]
				: e4.reduce(
						(e5, s4, o7) =>
							e5 +
							((t5) => {
								if (true === t5._$cssResult$) return t5.cssText;
								if ("number" == typeof t5) return t5;
								throw Error(
									"Value passed to 'css' function must be a 'css' function result: " +
										t5 +
										". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
								);
							})(s4) +
							t4[o7 + 1],
						t4[0],
					);
		return new n(o6, t4, s);
	};
	var S = (s4, o6) => {
		if (e) s4.adoptedStyleSheets = o6.map((t4) => (t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet));
		else
			for (const e4 of o6) {
				const o7 = document.createElement("style"),
					n5 = t.litNonce;
				void 0 !== n5 && o7.setAttribute("nonce", n5), (o7.textContent = e4.cssText), s4.appendChild(o7);
			}
	};
	var c =
		e || void 0 === t.CSSStyleSheet
			? (t4) => t4
			: (t4) =>
					t4 instanceof CSSStyleSheet
						? ((t5) => {
								let e4 = "";
								for (const s4 of t5.cssRules) e4 += s4.cssText;
								return r(e4);
							})(t4)
						: t4;

	// node_modules/@lit/reactive-element/node/reactive-element.js
	var {
		is: h,
		defineProperty: r2,
		getOwnPropertyDescriptor: o2,
		getOwnPropertyNames: n2,
		getOwnPropertySymbols: a,
		getPrototypeOf: c2,
	} = Object;
	var l = globalThis;
	l.customElements ??= customElements2;
	var p = l.trustedTypes;
	var d = p ? p.emptyScript : "";
	var u = l.reactiveElementPolyfillSupport;
	var f = (t4, s4) => t4;
	var b = {
		toAttribute(t4, s4) {
			switch (s4) {
				case Boolean:
					t4 = t4 ? d : null;
					break;
				case Object:
				case Array:
					t4 = null == t4 ? t4 : JSON.stringify(t4);
			}
			return t4;
		},
		fromAttribute(t4, s4) {
			let i4 = t4;
			switch (s4) {
				case Boolean:
					i4 = null !== t4;
					break;
				case Number:
					i4 = null === t4 ? null : Number(t4);
					break;
				case Object:
				case Array:
					try {
						i4 = JSON.parse(t4);
					} catch (t5) {
						i4 = null;
					}
			}
			return i4;
		},
	};
	var m = (t4, s4) => !h(t4, s4);
	var y = { attribute: true, type: String, converter: b, reflect: false, useDefault: false, hasChanged: m };
	(Symbol.metadata ??= Symbol("metadata")), (l.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap());
	var g = class extends (globalThis.HTMLElement ?? HTMLElementShimWithRealType) {
		static addInitializer(t4) {
			this._$Ei(), (this.l ??= []).push(t4);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(t4, s4 = y) {
			if (
				(s4.state && (s4.attribute = false),
				this._$Ei(),
				this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true),
				this.elementProperties.set(t4, s4),
				!s4.noAccessor)
			) {
				const i4 = Symbol(),
					e4 = this.getPropertyDescriptor(t4, i4, s4);
				void 0 !== e4 && r2(this.prototype, t4, e4);
			}
		}
		static getPropertyDescriptor(t4, s4, i4) {
			const { get: e4, set: h3 } = o2(this.prototype, t4) ?? {
				get() {
					return this[s4];
				},
				set(t5) {
					this[s4] = t5;
				},
			};
			return {
				get: e4,
				set(s5) {
					const r5 = e4?.call(this);
					h3?.call(this, s5), this.requestUpdate(t4, r5, i4);
				},
				configurable: true,
				enumerable: true,
			};
		}
		static getPropertyOptions(t4) {
			return this.elementProperties.get(t4) ?? y;
		}
		static _$Ei() {
			if (this.hasOwnProperty(f("elementProperties"))) return;
			const t4 = c2(this);
			t4.finalize(),
				void 0 !== t4.l && (this.l = [...t4.l]),
				(this.elementProperties = new Map(t4.elementProperties));
		}
		static finalize() {
			if (this.hasOwnProperty(f("finalized"))) return;
			if (((this.finalized = true), this._$Ei(), this.hasOwnProperty(f("properties")))) {
				const t5 = this.properties,
					s4 = [...n2(t5), ...a(t5)];
				for (const i4 of s4) this.createProperty(i4, t5[i4]);
			}
			const t4 = this[Symbol.metadata];
			if (null !== t4) {
				const s4 = litPropertyMetadata.get(t4);
				if (void 0 !== s4) for (const [t5, i4] of s4) this.elementProperties.set(t5, i4);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (const [t5, s4] of this.elementProperties) {
				const i4 = this._$Eu(t5, s4);
				void 0 !== i4 && this._$Eh.set(i4, t5);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(t4) {
			const s4 = [];
			if (Array.isArray(t4)) {
				const e4 = new Set(t4.flat(1 / 0).reverse());
				for (const t5 of e4) s4.unshift(c(t5));
			} else void 0 !== t4 && s4.push(c(t4));
			return s4;
		}
		static _$Eu(t4, s4) {
			const i4 = s4.attribute;
			return false === i4
				? void 0
				: "string" == typeof i4
					? i4
					: "string" == typeof t4
						? t4.toLowerCase()
						: void 0;
		}
		constructor() {
			super(),
				(this._$Ep = void 0),
				(this.isUpdatePending = false),
				(this.hasUpdated = false),
				(this._$Em = null),
				this._$Ev();
		}
		_$Ev() {
			(this._$ES = new Promise((t4) => (this.enableUpdating = t4))),
				(this._$AL = /* @__PURE__ */ new Map()),
				this._$E_(),
				this.requestUpdate(),
				this.constructor.l?.forEach((t4) => t4(this));
		}
		addController(t4) {
			(this._$EO ??= /* @__PURE__ */ new Set()).add(t4),
				void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
		}
		removeController(t4) {
			this._$EO?.delete(t4);
		}
		_$E_() {
			const t4 = /* @__PURE__ */ new Map(),
				s4 = this.constructor.elementProperties;
			for (const i4 of s4.keys()) this.hasOwnProperty(i4) && (t4.set(i4, this[i4]), delete this[i4]);
			t4.size > 0 && (this._$Ep = t4);
		}
		createRenderRoot() {
			const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return S(t4, this.constructor.elementStyles), t4;
		}
		connectedCallback() {
			(this.renderRoot ??= this.createRenderRoot()),
				this.enableUpdating(true),
				this._$EO?.forEach((t4) => t4.hostConnected?.());
		}
		enableUpdating(t4) {}
		disconnectedCallback() {
			this._$EO?.forEach((t4) => t4.hostDisconnected?.());
		}
		attributeChangedCallback(t4, s4, i4) {
			this._$AK(t4, i4);
		}
		_$ET(t4, s4) {
			const i4 = this.constructor.elementProperties.get(t4),
				e4 = this.constructor._$Eu(t4, i4);
			if (void 0 !== e4 && true === i4.reflect) {
				const h3 = (void 0 !== i4.converter?.toAttribute ? i4.converter : b).toAttribute(s4, i4.type);
				(this._$Em = t4), null == h3 ? this.removeAttribute(e4) : this.setAttribute(e4, h3), (this._$Em = null);
			}
		}
		_$AK(t4, s4) {
			const i4 = this.constructor,
				e4 = i4._$Eh.get(t4);
			if (void 0 !== e4 && this._$Em !== e4) {
				const t5 = i4.getPropertyOptions(e4),
					h3 =
						"function" == typeof t5.converter
							? { fromAttribute: t5.converter }
							: void 0 !== t5.converter?.fromAttribute
								? t5.converter
								: b;
				this._$Em = e4;
				const r5 = h3.fromAttribute(s4, t5.type);
				(this[e4] = r5 ?? this._$Ej?.get(e4) ?? r5), (this._$Em = null);
			}
		}
		requestUpdate(t4, s4, i4) {
			if (void 0 !== t4) {
				const e4 = this.constructor,
					h3 = this[t4];
				if (
					((i4 ??= e4.getPropertyOptions(t4)),
					!(
						(i4.hasChanged ?? m)(h3, s4) ||
						(i4.useDefault &&
							i4.reflect &&
							h3 === this._$Ej?.get(t4) &&
							!this.hasAttribute(e4._$Eu(t4, i4)))
					))
				)
					return;
				this.C(t4, s4, i4);
			}
			false === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(t4, s4, { useDefault: i4, reflect: e4, wrapped: h3 }, r5) {
			(i4 &&
				!(this._$Ej ??= /* @__PURE__ */ new Map()).has(t4) &&
				(this._$Ej.set(t4, r5 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r5)) ||
				(this._$AL.has(t4) || (this.hasUpdated || i4 || (s4 = void 0), this._$AL.set(t4, s4)),
				true === e4 && this._$Em !== t4 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t4));
		}
		async _$EP() {
			this.isUpdatePending = true;
			try {
				await this._$ES;
			} catch (t5) {
				Promise.reject(t5);
			}
			const t4 = this.scheduleUpdate();
			return null != t4 && (await t4), !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
					for (const [t6, s5] of this._$Ep) this[t6] = s5;
					this._$Ep = void 0;
				}
				const t5 = this.constructor.elementProperties;
				if (t5.size > 0)
					for (const [s5, i4] of t5) {
						const { wrapped: t6 } = i4,
							e4 = this[s5];
						true !== t6 || this._$AL.has(s5) || void 0 === e4 || this.C(s5, void 0, i4, e4);
					}
			}
			let t4 = false;
			const s4 = this._$AL;
			try {
				(t4 = this.shouldUpdate(s4)),
					t4
						? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4))
						: this._$EM();
			} catch (s5) {
				throw ((t4 = false), this._$EM(), s5);
			}
			t4 && this._$AE(s4);
		}
		willUpdate(t4) {}
		_$AE(t4) {
			this._$EO?.forEach((t5) => t5.hostUpdated?.()),
				this.hasUpdated || ((this.hasUpdated = true), this.firstUpdated(t4)),
				this.updated(t4);
		}
		_$EM() {
			(this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = false);
		}
		get updateComplete() {
			return this.getUpdateComplete();
		}
		getUpdateComplete() {
			return this._$ES;
		}
		shouldUpdate(t4) {
			return true;
		}
		update(t4) {
			(this._$Eq &&= this._$Eq.forEach((t5) => this._$ET(t5, this[t5]))), this._$EM();
		}
		updated(t4) {}
		firstUpdated(t4) {}
	};
	(g.elementStyles = []),
		(g.shadowRootOptions = { mode: "open" }),
		(g[f("elementProperties")] = /* @__PURE__ */ new Map()),
		(g[f("finalized")] = /* @__PURE__ */ new Map()),
		u?.({ ReactiveElement: g }),
		(l.reactiveElementVersions ??= []).push("2.1.1");

	// node_modules/lit-html/node/lit-html.js
	var t2 = globalThis;
	var i2 = t2.trustedTypes;
	var s2 = i2 ? i2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
	var e2 = "$lit$";
	var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
	var o3 = "?" + h2;
	var n3 = `<${o3}>`;
	var r3 = void 0 === t2.document ? { createTreeWalker: () => ({}) } : document;
	var l2 = () => r3.createComment("");
	var c3 = (t4) => null === t4 || ("object" != typeof t4 && "function" != typeof t4);
	var a2 = Array.isArray;
	var u2 = (t4) => a2(t4) || "function" == typeof t4?.[Symbol.iterator];
	var d2 = "[ 	\n\f\r]";
	var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
	var v = /-->/g;
	var _ = />/g;
	var m2 = RegExp(
		`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
		"g",
	);
	var p2 = /'/g;
	var g2 = /"/g;
	var $ = /^(?:script|style|textarea|title)$/i;
	var y2 =
		(t4) =>
		(i4, ...s4) => ({ _$litType$: t4, strings: i4, values: s4 });
	var x = y2(1);
	var T = y2(2);
	var b2 = y2(3);
	var w = Symbol.for("lit-noChange");
	var E = Symbol.for("lit-nothing");
	var A = /* @__PURE__ */ new WeakMap();
	var C = r3.createTreeWalker(r3, 129);
	function P(t4, i4) {
		if (!a2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
		return void 0 !== s2 ? s2.createHTML(i4) : i4;
	}
	var V = (t4, i4) => {
		const s4 = t4.length - 1,
			o6 = [];
		let r5,
			l3 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "",
			c4 = f2;
		for (let i5 = 0; i5 < s4; i5++) {
			const s5 = t4[i5];
			let a3,
				u3,
				d3 = -1,
				y3 = 0;
			for (; y3 < s5.length && ((c4.lastIndex = y3), (u3 = c4.exec(s5)), null !== u3); )
				(y3 = c4.lastIndex),
					c4 === f2
						? "!--" === u3[1]
							? (c4 = v)
							: void 0 !== u3[1]
								? (c4 = _)
								: void 0 !== u3[2]
									? ($.test(u3[2]) && (r5 = RegExp("</" + u3[2], "g")), (c4 = m2))
									: void 0 !== u3[3] && (c4 = m2)
						: c4 === m2
							? ">" === u3[0]
								? ((c4 = r5 ?? f2), (d3 = -1))
								: void 0 === u3[1]
									? (d3 = -2)
									: ((d3 = c4.lastIndex - u3[2].length),
										(a3 = u3[1]),
										(c4 = void 0 === u3[3] ? m2 : '"' === u3[3] ? g2 : p2))
							: c4 === g2 || c4 === p2
								? (c4 = m2)
								: c4 === v || c4 === _
									? (c4 = f2)
									: ((c4 = m2), (r5 = void 0));
			const x2 = c4 === m2 && t4[i5 + 1].startsWith("/>") ? " " : "";
			l3 +=
				c4 === f2
					? s5 + n3
					: d3 >= 0
						? (o6.push(a3), s5.slice(0, d3) + e2 + s5.slice(d3) + h2 + x2)
						: s5 + h2 + (-2 === d3 ? i5 : x2);
		}
		return [P(t4, l3 + (t4[s4] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), o6];
	};
	var N = class _N {
		constructor({ strings: t4, _$litType$: s4 }, n5) {
			let r5;
			this.parts = [];
			let c4 = 0,
				a3 = 0;
			const u3 = t4.length - 1,
				d3 = this.parts,
				[f3, v2] = V(t4, s4);
			if (((this.el = _N.createElement(f3, n5)), (C.currentNode = this.el.content), 2 === s4 || 3 === s4)) {
				const t5 = this.el.content.firstChild;
				t5.replaceWith(...t5.childNodes);
			}
			for (; null !== (r5 = C.nextNode()) && d3.length < u3; ) {
				if (1 === r5.nodeType) {
					if (r5.hasAttributes())
						for (const t5 of r5.getAttributeNames())
							if (t5.endsWith(e2)) {
								const i4 = v2[a3++],
									s5 = r5.getAttribute(t5).split(h2),
									e4 = /([.?@])?(.*)/.exec(i4);
								d3.push({
									type: 1,
									index: c4,
									name: e4[2],
									strings: s5,
									ctor: "." === e4[1] ? H : "?" === e4[1] ? I : "@" === e4[1] ? L : R,
								}),
									r5.removeAttribute(t5);
							} else t5.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r5.removeAttribute(t5));
					if ($.test(r5.tagName)) {
						const t5 = r5.textContent.split(h2),
							s5 = t5.length - 1;
						if (s5 > 0) {
							r5.textContent = i2 ? i2.emptyScript : "";
							for (let i4 = 0; i4 < s5; i4++)
								r5.append(t5[i4], l2()), C.nextNode(), d3.push({ type: 2, index: ++c4 });
							r5.append(t5[s5], l2());
						}
					}
				} else if (8 === r5.nodeType)
					if (r5.data === o3) d3.push({ type: 2, index: c4 });
					else {
						let t5 = -1;
						for (; -1 !== (t5 = r5.data.indexOf(h2, t5 + 1)); )
							d3.push({ type: 7, index: c4 }), (t5 += h2.length - 1);
					}
				c4++;
			}
		}
		static createElement(t4, i4) {
			const s4 = r3.createElement("template");
			return (s4.innerHTML = t4), s4;
		}
	};
	function S2(t4, i4, s4 = t4, e4) {
		if (i4 === w) return i4;
		let h3 = void 0 !== e4 ? s4._$Co?.[e4] : s4._$Cl;
		const o6 = c3(i4) ? void 0 : i4._$litDirective$;
		return (
			h3?.constructor !== o6 &&
				(h3?._$AO?.(false),
				void 0 === o6 ? (h3 = void 0) : ((h3 = new o6(t4)), h3._$AT(t4, s4, e4)),
				void 0 !== e4 ? ((s4._$Co ??= [])[e4] = h3) : (s4._$Cl = h3)),
			void 0 !== h3 && (i4 = S2(t4, h3._$AS(t4, i4.values), h3, e4)),
			i4
		);
	}
	var M = class {
		constructor(t4, i4) {
			(this._$AV = []), (this._$AN = void 0), (this._$AD = t4), (this._$AM = i4);
		}
		get parentNode() {
			return this._$AM.parentNode;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		u(t4) {
			const {
					el: { content: i4 },
					parts: s4,
				} = this._$AD,
				e4 = (t4?.creationScope ?? r3).importNode(i4, true);
			C.currentNode = e4;
			let h3 = C.nextNode(),
				o6 = 0,
				n5 = 0,
				l3 = s4[0];
			for (; void 0 !== l3; ) {
				if (o6 === l3.index) {
					let i5;
					2 === l3.type
						? (i5 = new k(h3, h3.nextSibling, this, t4))
						: 1 === l3.type
							? (i5 = new l3.ctor(h3, l3.name, l3.strings, this, t4))
							: 6 === l3.type && (i5 = new z(h3, this, t4)),
						this._$AV.push(i5),
						(l3 = s4[++n5]);
				}
				o6 !== l3?.index && ((h3 = C.nextNode()), o6++);
			}
			return (C.currentNode = r3), e4;
		}
		p(t4) {
			let i4 = 0;
			for (const s4 of this._$AV)
				void 0 !== s4 &&
					(void 0 !== s4.strings ? (s4._$AI(t4, s4, i4), (i4 += s4.strings.length - 2)) : s4._$AI(t4[i4])),
					i4++;
		}
	};
	var k = class _k {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(t4, i4, s4, e4) {
			(this.type = 2),
				(this._$AH = E),
				(this._$AN = void 0),
				(this._$AA = t4),
				(this._$AB = i4),
				(this._$AM = s4),
				(this.options = e4),
				(this._$Cv = e4?.isConnected ?? true);
		}
		get parentNode() {
			let t4 = this._$AA.parentNode;
			const i4 = this._$AM;
			return void 0 !== i4 && 11 === t4?.nodeType && (t4 = i4.parentNode), t4;
		}
		get startNode() {
			return this._$AA;
		}
		get endNode() {
			return this._$AB;
		}
		_$AI(t4, i4 = this) {
			(t4 = S2(this, t4, i4)),
				c3(t4)
					? t4 === E || null == t4 || "" === t4
						? (this._$AH !== E && this._$AR(), (this._$AH = E))
						: t4 !== this._$AH && t4 !== w && this._(t4)
					: void 0 !== t4._$litType$
						? this.$(t4)
						: void 0 !== t4.nodeType
							? this.T(t4)
							: u2(t4)
								? this.k(t4)
								: this._(t4);
		}
		O(t4) {
			return this._$AA.parentNode.insertBefore(t4, this._$AB);
		}
		T(t4) {
			this._$AH !== t4 && (this._$AR(), (this._$AH = this.O(t4)));
		}
		_(t4) {
			this._$AH !== E && c3(this._$AH) ? (this._$AA.nextSibling.data = t4) : this.T(r3.createTextNode(t4)),
				(this._$AH = t4);
		}
		$(t4) {
			const { values: i4, _$litType$: s4 } = t4,
				e4 =
					"number" == typeof s4
						? this._$AC(t4)
						: (void 0 === s4.el && (s4.el = N.createElement(P(s4.h, s4.h[0]), this.options)), s4);
			if (this._$AH?._$AD === e4) this._$AH.p(i4);
			else {
				const t5 = new M(e4, this),
					s5 = t5.u(this.options);
				t5.p(i4), this.T(s5), (this._$AH = t5);
			}
		}
		_$AC(t4) {
			let i4 = A.get(t4.strings);
			return void 0 === i4 && A.set(t4.strings, (i4 = new N(t4))), i4;
		}
		k(t4) {
			a2(this._$AH) || ((this._$AH = []), this._$AR());
			const i4 = this._$AH;
			let s4,
				e4 = 0;
			for (const h3 of t4)
				e4 === i4.length
					? i4.push((s4 = new _k(this.O(l2()), this.O(l2()), this, this.options)))
					: (s4 = i4[e4]),
					s4._$AI(h3),
					e4++;
			e4 < i4.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), (i4.length = e4));
		}
		_$AR(t4 = this._$AA.nextSibling, i4) {
			for (this._$AP?.(false, true, i4); t4 !== this._$AB; ) {
				const i5 = t4.nextSibling;
				t4.remove(), (t4 = i5);
			}
		}
		setConnected(t4) {
			void 0 === this._$AM && ((this._$Cv = t4), this._$AP?.(t4));
		}
	};
	var R = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(t4, i4, s4, e4, h3) {
			(this.type = 1),
				(this._$AH = E),
				(this._$AN = void 0),
				(this.element = t4),
				(this.name = i4),
				(this._$AM = e4),
				(this.options = h3),
				s4.length > 2 || "" !== s4[0] || "" !== s4[1]
					? ((this._$AH = Array(s4.length - 1).fill(new String())), (this.strings = s4))
					: (this._$AH = E);
		}
		_$AI(t4, i4 = this, s4, e4) {
			const h3 = this.strings;
			let o6 = false;
			if (void 0 === h3)
				(t4 = S2(this, t4, i4, 0)), (o6 = !c3(t4) || (t4 !== this._$AH && t4 !== w)), o6 && (this._$AH = t4);
			else {
				const e5 = t4;
				let n5, r5;
				for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++)
					(r5 = S2(this, e5[s4 + n5], i4, n5)),
						r5 === w && (r5 = this._$AH[n5]),
						(o6 ||= !c3(r5) || r5 !== this._$AH[n5]),
						r5 === E ? (t4 = E) : t4 !== E && (t4 += (r5 ?? "") + h3[n5 + 1]),
						(this._$AH[n5] = r5);
			}
			o6 && !e4 && this.j(t4);
		}
		j(t4) {
			t4 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
		}
	};
	var H = class extends R {
		constructor() {
			super(...arguments), (this.type = 3);
		}
		j(t4) {
			this.element[this.name] = t4 === E ? void 0 : t4;
		}
	};
	var I = class extends R {
		constructor() {
			super(...arguments), (this.type = 4);
		}
		j(t4) {
			this.element.toggleAttribute(this.name, !!t4 && t4 !== E);
		}
	};
	var L = class extends R {
		constructor(t4, i4, s4, e4, h3) {
			super(t4, i4, s4, e4, h3), (this.type = 5);
		}
		_$AI(t4, i4 = this) {
			if ((t4 = S2(this, t4, i4, 0) ?? E) === w) return;
			const s4 = this._$AH,
				e4 =
					(t4 === E && s4 !== E) ||
					t4.capture !== s4.capture ||
					t4.once !== s4.once ||
					t4.passive !== s4.passive,
				h3 = t4 !== E && (s4 === E || e4);
			e4 && this.element.removeEventListener(this.name, this, s4),
				h3 && this.element.addEventListener(this.name, this, t4),
				(this._$AH = t4);
		}
		handleEvent(t4) {
			"function" == typeof this._$AH
				? this._$AH.call(this.options?.host ?? this.element, t4)
				: this._$AH.handleEvent(t4);
		}
	};
	var z = class {
		constructor(t4, i4, s4) {
			(this.element = t4), (this.type = 6), (this._$AN = void 0), (this._$AM = i4), (this.options = s4);
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(t4) {
			S2(this, t4);
		}
	};
	var Z = t2.litHtmlPolyfillSupport;
	Z?.(N, k), (t2.litHtmlVersions ??= []).push("3.3.1");
	var j = (t4, i4, s4) => {
		const e4 = s4?.renderBefore ?? i4;
		let h3 = e4._$litPart$;
		if (void 0 === h3) {
			const t5 = s4?.renderBefore ?? null;
			e4._$litPart$ = h3 = new k(i4.insertBefore(l2(), t5), t5, void 0, s4 ?? {});
		}
		return h3._$AI(t4), h3;
	};

	// node_modules/lit-element/lit-element.js
	var s3 = globalThis;
	var i3 = class extends g {
		constructor() {
			super(...arguments), (this.renderOptions = { host: this }), (this._$Do = void 0);
		}
		createRenderRoot() {
			const t4 = super.createRenderRoot();
			return (this.renderOptions.renderBefore ??= t4.firstChild), t4;
		}
		update(t4) {
			const r5 = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
				super.update(t4),
				(this._$Do = j(r5, this.renderRoot, this.renderOptions));
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(true);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(false);
		}
		render() {
			return w;
		}
	};
	(i3._$litElement$ = true), (i3["finalized"] = true), s3.litElementHydrateSupport?.({ LitElement: i3 });
	var o4 = s3.litElementPolyfillSupport;
	o4?.({ LitElement: i3 });
	(s3.litElementVersions ??= []).push("4.2.1");

	// node_modules/@lit/reactive-element/node/decorators/custom-element.js
	var t3 = (t4) => (e4, o6) => {
		void 0 !== o6
			? o6.addInitializer(() => {
					customElements.define(t4, e4);
				})
			: customElements.define(t4, e4);
	};

	// node_modules/@lit/reactive-element/node/decorators/property.js
	var o5 = { attribute: true, type: String, converter: b, reflect: false, hasChanged: m };
	var r4 = (t4 = o5, e4, r5) => {
		const { kind: n5, metadata: i4 } = r5;
		let s4 = globalThis.litPropertyMetadata.get(i4);
		if (
			(void 0 === s4 && globalThis.litPropertyMetadata.set(i4, (s4 = /* @__PURE__ */ new Map())),
			"setter" === n5 && ((t4 = Object.create(t4)).wrapped = true),
			s4.set(r5.name, t4),
			"accessor" === n5)
		) {
			const { name: o6 } = r5;
			return {
				set(r6) {
					const n6 = e4.get.call(this);
					e4.set.call(this, r6), this.requestUpdate(o6, n6, t4);
				},
				init(e5) {
					return void 0 !== e5 && this.C(o6, void 0, t4, e5), e5;
				},
			};
		}
		if ("setter" === n5) {
			const { name: o6 } = r5;
			return function (r6) {
				const n6 = this[o6];
				e4.call(this, r6), this.requestUpdate(o6, n6, t4);
			};
		}
		throw Error("Unsupported decorator location: " + n5);
	};
	function n4(t4) {
		return (e4, o6) =>
			"object" == typeof o6
				? r4(t4, e4, o6)
				: ((t5, e5, o7) => {
						const r5 = e5.hasOwnProperty(o7);
						return (
							e5.constructor.createProperty(o7, t5), r5 ? Object.getOwnPropertyDescriptor(e5, o7) : void 0
						);
					})(t4, e4, o6);
	}

	// examples/card.ts
	var AutoCardComponent = class extends i3 {
		constructor() {
			super(...arguments);
			this.title = "";
		}
		render() {
			return x`
        <div class="auto-card">
            <div class="auto-card-header">${this.title}</div>
            <div class="auto-card-body">
                <slot></slot>         
            </div>
        </div>
        `;
		}
	};
	AutoCardComponent.styles = i`
        :host {
        display: block;
        }
        .auto-card {
        display: flex;
        flex-direction: column;
        background: var(--auto-panel-bgcolor);
        color: var(--auto-color);
        border-radius: var(--auto-border-radius);
        border: var(--auto-border);
        padding: 0;
        box-shadow: var(--auto-shadow);
        box-sizing: border-box;
        }
        .auto-card-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: var(--auto-border);
        padding: calc(0.6 * var(--auto-spacing));
        border-radius: var(--auto-border-radius) var(--auto-border-radius) 0 0;
        flex-shrink: 0;
        font: var(--auto-title-font);
        color: var(--auto-panel-title-color);
        background: var(--auto-title-bgcolor);
        }
        .auto-card-body {
        flex: 1 1 auto;
        padding: var(--auto-spacing);
        border-radius: 0 0 var(--auto-border-radius) var(--auto-border-radius);        
        }  
    `;
	__decorateClass([n4({ type: String, reflect: true })], AutoCardComponent.prototype, "title", 2);
	AutoCardComponent = __decorateClass([t3("auto-card")], AutoCardComponent);
})();
/*! Bundled license information:

@lit-labs/ssr-dom-shim/lib/element-internals.js:
@lit-labs/ssr-dom-shim/lib/events.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/ssr-dom-shim/index.js:
@lit/reactive-element/node/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/node/decorators/custom-element.js:
@lit/reactive-element/node/decorators/property.js:
@lit/reactive-element/node/decorators/state.js:
@lit/reactive-element/node/decorators/event-options.js:
@lit/reactive-element/node/decorators/base.js:
@lit/reactive-element/node/decorators/query.js:
@lit/reactive-element/node/decorators/query-all.js:
@lit/reactive-element/node/decorators/query-async.js:
@lit/reactive-element/node/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/node/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
