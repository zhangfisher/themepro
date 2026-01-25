'use strict'
;(() => {
    // src/observer.ts
    var AttrObserver = class {
        constructor(el, attrs, callback) {
            this.el = el
            this.attrs = attrs
            this.callback = callback
            this.observer = null
            this.connected = false
            if (!el || !(el instanceof Element)) {
                throw new Error('\u7B2C\u4E00\u4E2A\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2ADOM\u5143\u7D20')
            }
            if (!Array.isArray(attrs)) {
                throw new Error(
                    '\u7B2C\u4E8C\u4E2A\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2A\u5C5E\u6027\u540D\u79F0\u6570\u7EC4',
                )
            }
            if (typeof callback !== 'function') {
                throw new Error('\u7B2C\u4E09\u4E2A\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2A\u56DE\u8C03\u51FD\u6570')
            }
            this.connect()
        }
        connect() {
            if (this.connected) return
            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (
                        mutation.type === 'attributes' &&
                        mutation.attributeName &&
                        this.attrs.includes(mutation.attributeName)
                    ) {
                        const newValue = this.el.getAttribute(mutation.attributeName)
                        this.callback(mutation.attributeName, newValue, this.el)
                    }
                })
            })
            this.observer.observe(this.el, {
                attributes: true,
                attributeFilter: this.attrs,
            })
            this.connected = true
        }
        disconnect() {
            if (this.observer) {
                this.observer.disconnect()
                this.observer = null
            }
        }
    }

    // src/presets.ts
    var presetThemes = {
        light: {
            baseColor: '#c5c5c5',
            title: '\u4EAE\u8272',
        },
        dark: {
            baseColor: '#7d7d7d',
            title: '\u6697\u9ED1',
        },
        red: {
            baseColor: '#f5222d',
            title: '\u8584\u66AE',
        },
        volcano: {
            baseColor: '#fa541c',
            title: '\u706B\u5C71',
        },
        orange: {
            baseColor: '#fa8c16',
            title: '\u65E5\u66AE',
        },
        lime: {
            baseColor: '#a0d911',
            title: '\u9752\u67E0',
        },
        gold: {
            baseColor: '#faad14',
            title: '\u91D1\u76CF\u82B1',
        },
        yellow: {
            baseColor: '#fadb14',
            title: '\u65E5\u51FA',
        },
        green: {
            baseColor: '#52c41a',
            title: '\u6781\u5149\u7EFF',
        },
        cyan: {
            baseColor: '#13c2c2',
            title: '\u660E\u9752',
        },
        blue: {
            baseColor: '#1677ff',
            title: '\u62C2\u6653\u84DD',
        },
        geekblue: {
            baseColor: '#2f54eb',
            title: '\u6781\u5BA2\u84DD',
        },
        purple: {
            baseColor: '#722ed1',
            title: '\u9171\u7D2B',
        },
        magenta: {
            baseColor: '#eb2f96',
            title: '\u6CD5\u5F0F\u6D0B\u7EA2',
        },
    }

    // node_modules/@ant-design/fast-color/es/presetColors.js
    var presetColors_default = {
        aliceblue: '9ehhb',
        antiquewhite: '9sgk7',
        aqua: '1ekf',
        aquamarine: '4zsno',
        azure: '9eiv3',
        beige: '9lhp8',
        bisque: '9zg04',
        black: '0',
        blanchedalmond: '9zhe5',
        blue: '73',
        blueviolet: '5e31e',
        brown: '6g016',
        burlywood: '8ouiv',
        cadetblue: '3qba8',
        chartreuse: '4zshs',
        chocolate: '87k0u',
        coral: '9yvyo',
        cornflowerblue: '3xael',
        cornsilk: '9zjz0',
        crimson: '8l4xo',
        cyan: '1ekf',
        darkblue: '3v',
        darkcyan: 'rkb',
        darkgoldenrod: '776yz',
        darkgray: '6mbhl',
        darkgreen: 'jr4',
        darkgrey: '6mbhl',
        darkkhaki: '7ehkb',
        darkmagenta: '5f91n',
        darkolivegreen: '3bzfz',
        darkorange: '9yygw',
        darkorchid: '5z6x8',
        darkred: '5f8xs',
        darksalmon: '9441m',
        darkseagreen: '5lwgf',
        darkslateblue: '2th1n',
        darkslategray: '1ugcv',
        darkslategrey: '1ugcv',
        darkturquoise: '14up',
        darkviolet: '5rw7n',
        deeppink: '9yavn',
        deepskyblue: '11xb',
        dimgray: '442g9',
        dimgrey: '442g9',
        dodgerblue: '16xof',
        firebrick: '6y7tu',
        floralwhite: '9zkds',
        forestgreen: '1cisi',
        fuchsia: '9y70f',
        gainsboro: '8m8kc',
        ghostwhite: '9pq0v',
        goldenrod: '8j4f4',
        gold: '9zda8',
        gray: '50i2o',
        green: 'pa8',
        greenyellow: '6senj',
        grey: '50i2o',
        honeydew: '9eiuo',
        hotpink: '9yrp0',
        indianred: '80gnw',
        indigo: '2xcoy',
        ivory: '9zldc',
        khaki: '9edu4',
        lavenderblush: '9ziet',
        lavender: '90c8q',
        lawngreen: '4vk74',
        lemonchiffon: '9zkct',
        lightblue: '6s73a',
        lightcoral: '9dtog',
        lightcyan: '8s1rz',
        lightgoldenrodyellow: '9sjiq',
        lightgray: '89jo3',
        lightgreen: '5nkwg',
        lightgrey: '89jo3',
        lightpink: '9z6wx',
        lightsalmon: '9z2ii',
        lightseagreen: '19xgq',
        lightskyblue: '5arju',
        lightslategray: '4nwk9',
        lightslategrey: '4nwk9',
        lightsteelblue: '6wau6',
        lightyellow: '9zlcw',
        lime: '1edc',
        limegreen: '1zcxe',
        linen: '9shk6',
        magenta: '9y70f',
        maroon: '4zsow',
        mediumaquamarine: '40eju',
        mediumblue: '5p',
        mediumorchid: '79qkz',
        mediumpurple: '5r3rv',
        mediumseagreen: '2d9ip',
        mediumslateblue: '4tcku',
        mediumspringgreen: '1di2',
        mediumturquoise: '2uabw',
        mediumvioletred: '7rn9h',
        midnightblue: 'z980',
        mintcream: '9ljp6',
        mistyrose: '9zg0x',
        moccasin: '9zfzp',
        navajowhite: '9zest',
        navy: '3k',
        oldlace: '9wq92',
        olive: '50hz4',
        olivedrab: '472ub',
        orange: '9z3eo',
        orangered: '9ykg0',
        orchid: '8iu3a',
        palegoldenrod: '9bl4a',
        palegreen: '5yw0o',
        paleturquoise: '6v4ku',
        palevioletred: '8k8lv',
        papayawhip: '9zi6t',
        peachpuff: '9ze0p',
        peru: '80oqn',
        pink: '9z8wb',
        plum: '8nba5',
        powderblue: '6wgdi',
        purple: '4zssg',
        rebeccapurple: '3zk49',
        red: '9y6tc',
        rosybrown: '7cv4f',
        royalblue: '2jvtt',
        saddlebrown: '5fmkz',
        salmon: '9rvci',
        sandybrown: '9jn1c',
        seagreen: '1tdnb',
        seashell: '9zje6',
        sienna: '6973h',
        silver: '7ir40',
        skyblue: '5arjf',
        slateblue: '45e4t',
        slategray: '4e100',
        slategrey: '4e100',
        snow: '9zke2',
        springgreen: '1egv',
        steelblue: '2r1kk',
        tan: '87yx8',
        teal: 'pds',
        thistle: '8ggk8',
        tomato: '9yqfb',
        turquoise: '2j4r4',
        violet: '9b10u',
        wheat: '9ld4j',
        white: '9zldr',
        whitesmoke: '9lhpx',
        yellow: '9zl6o',
        yellowgreen: '61fzm',
    }

    // node_modules/@ant-design/fast-color/es/FastColor.js
    var round = Math.round
    function splitColorStr(str, parseNum) {
        const match =
            str
                .replace(/^[^(]*\((.*)/, '$1')
                .replace(/\).*/, '')
                .match(/\d*\.?\d+%?/g) || []
        const numList = match.map((item) => parseFloat(item))
        for (let i = 0; i < 3; i += 1) {
            numList[i] = parseNum(numList[i] || 0, match[i] || '', i)
        }
        if (match[3]) {
            numList[3] = match[3].includes('%') ? numList[3] / 100 : numList[3]
        } else {
            numList[3] = 1
        }
        return numList
    }
    var parseHSVorHSL = (num, _, index) => (index === 0 ? num : num / 100)
    function limitRange(value, max) {
        const mergedMax = max || 255
        if (value > mergedMax) {
            return mergedMax
        }
        if (value < 0) {
            return 0
        }
        return value
    }
    var FastColor = class _FastColor {
        /**
         * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
         */
        isValid = true
        /**
         * Red, R in RGB
         */
        r = 0
        /**
         * Green, G in RGB
         */
        g = 0
        /**
         * Blue, B in RGB
         */
        b = 0
        /**
         * Alpha/Opacity, A in RGBA/HSLA
         */
        a = 1
        // HSV privates
        _h
        _s
        _l
        _v
        // intermediate variables to calculate HSL/HSV
        _max
        _min
        _brightness
        constructor(input) {
            function matchFormat(str) {
                return str[0] in input && str[1] in input && str[2] in input
            }
            if (!input) {
            } else if (typeof input === 'string') {
                let matchPrefix2 = function (prefix) {
                    return trimStr.startsWith(prefix)
                }
                var matchPrefix = matchPrefix2
                const trimStr = input.trim()
                if (/^#?[A-F\d]{3,8}$/i.test(trimStr)) {
                    this.fromHexString(trimStr)
                } else if (matchPrefix2('rgb')) {
                    this.fromRgbString(trimStr)
                } else if (matchPrefix2('hsl')) {
                    this.fromHslString(trimStr)
                } else if (matchPrefix2('hsv') || matchPrefix2('hsb')) {
                    this.fromHsvString(trimStr)
                } else {
                    const presetColor = presetColors_default[trimStr.toLowerCase()]
                    if (presetColor) {
                        this.fromHexString(
                            // Convert 36 hex to 16 hex
                            parseInt(presetColor, 36)
                                .toString(16)
                                .padStart(6, '0'),
                        )
                    }
                }
            } else if (input instanceof _FastColor) {
                this.r = input.r
                this.g = input.g
                this.b = input.b
                this.a = input.a
                this._h = input._h
                this._s = input._s
                this._l = input._l
                this._v = input._v
            } else if (matchFormat('rgb')) {
                this.r = limitRange(input.r)
                this.g = limitRange(input.g)
                this.b = limitRange(input.b)
                this.a = typeof input.a === 'number' ? limitRange(input.a, 1) : 1
            } else if (matchFormat('hsl')) {
                this.fromHsl(input)
            } else if (matchFormat('hsv')) {
                this.fromHsv(input)
            } else {
                throw new Error('@ant-design/fast-color: unsupported input ' + JSON.stringify(input))
            }
        }
        // ======================= Setter =======================
        setR(value) {
            return this._sc('r', value)
        }
        setG(value) {
            return this._sc('g', value)
        }
        setB(value) {
            return this._sc('b', value)
        }
        setA(value) {
            return this._sc('a', value, 1)
        }
        setHue(value) {
            const hsv = this.toHsv()
            hsv.h = value
            return this._c(hsv)
        }
        // ======================= Getter =======================
        /**
         * Returns the perceived luminance of a color, from 0-1.
         * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
         */
        getLuminance() {
            function adjustGamma(raw) {
                const val = raw / 255
                return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
            }
            const R = adjustGamma(this.r)
            const G = adjustGamma(this.g)
            const B = adjustGamma(this.b)
            return 0.2126 * R + 0.7152 * G + 0.0722 * B
        }
        getHue() {
            if (typeof this._h === 'undefined') {
                const delta = this.getMax() - this.getMin()
                if (delta === 0) {
                    this._h = 0
                } else {
                    this._h = round(
                        60 *
                            (this.r === this.getMax()
                                ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0)
                                : this.g === this.getMax()
                                  ? (this.b - this.r) / delta + 2
                                  : (this.r - this.g) / delta + 4),
                    )
                }
            }
            return this._h
        }
        getSaturation() {
            if (typeof this._s === 'undefined') {
                const delta = this.getMax() - this.getMin()
                if (delta === 0) {
                    this._s = 0
                } else {
                    this._s = delta / this.getMax()
                }
            }
            return this._s
        }
        getLightness() {
            if (typeof this._l === 'undefined') {
                this._l = (this.getMax() + this.getMin()) / 510
            }
            return this._l
        }
        getValue() {
            if (typeof this._v === 'undefined') {
                this._v = this.getMax() / 255
            }
            return this._v
        }
        /**
         * Returns the perceived brightness of the color, from 0-255.
         * Note: this is not the b of HSB
         * @see http://www.w3.org/TR/AERT#color-contrast
         */
        getBrightness() {
            if (typeof this._brightness === 'undefined') {
                this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3
            }
            return this._brightness
        }
        // ======================== Func ========================
        darken(amount = 10) {
            const h = this.getHue()
            const s = this.getSaturation()
            let l = this.getLightness() - amount / 100
            if (l < 0) {
                l = 0
            }
            return this._c({
                h,
                s,
                l,
                a: this.a,
            })
        }
        lighten(amount = 10) {
            const h = this.getHue()
            const s = this.getSaturation()
            let l = this.getLightness() + amount / 100
            if (l > 1) {
                l = 1
            }
            return this._c({
                h,
                s,
                l,
                a: this.a,
            })
        }
        /**
         * Mix the current color a given amount with another color, from 0 to 100.
         * 0 means no mixing (return current color).
         */
        mix(input, amount = 50) {
            const color = this._c(input)
            const p = amount / 100
            const calc = (key) => (color[key] - this[key]) * p + this[key]
            const rgba = {
                r: round(calc('r')),
                g: round(calc('g')),
                b: round(calc('b')),
                a: round(calc('a') * 100) / 100,
            }
            return this._c(rgba)
        }
        /**
         * Mix the color with pure white, from 0 to 100.
         * Providing 0 will do nothing, providing 100 will always return white.
         */
        tint(amount = 10) {
            return this.mix(
                {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 1,
                },
                amount,
            )
        }
        /**
         * Mix the color with pure black, from 0 to 100.
         * Providing 0 will do nothing, providing 100 will always return black.
         */
        shade(amount = 10) {
            return this.mix(
                {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1,
                },
                amount,
            )
        }
        onBackground(background) {
            const bg = this._c(background)
            const alpha = this.a + bg.a * (1 - this.a)
            const calc = (key) => {
                return round((this[key] * this.a + bg[key] * bg.a * (1 - this.a)) / alpha)
            }
            return this._c({
                r: calc('r'),
                g: calc('g'),
                b: calc('b'),
                a: alpha,
            })
        }
        // ======================= Status =======================
        isDark() {
            return this.getBrightness() < 128
        }
        isLight() {
            return this.getBrightness() >= 128
        }
        // ======================== MISC ========================
        equals(other) {
            return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a
        }
        clone() {
            return this._c(this)
        }
        // ======================= Format =======================
        toHexString() {
            let hex = '#'
            const rHex = (this.r || 0).toString(16)
            hex += rHex.length === 2 ? rHex : '0' + rHex
            const gHex = (this.g || 0).toString(16)
            hex += gHex.length === 2 ? gHex : '0' + gHex
            const bHex = (this.b || 0).toString(16)
            hex += bHex.length === 2 ? bHex : '0' + bHex
            if (typeof this.a === 'number' && this.a >= 0 && this.a < 1) {
                const aHex = round(this.a * 255).toString(16)
                hex += aHex.length === 2 ? aHex : '0' + aHex
            }
            return hex
        }
        /** CSS support color pattern */
        toHsl() {
            return {
                h: this.getHue(),
                s: this.getSaturation(),
                l: this.getLightness(),
                a: this.a,
            }
        }
        /** CSS support color pattern */
        toHslString() {
            const h = this.getHue()
            const s = round(this.getSaturation() * 100)
            const l = round(this.getLightness() * 100)
            return this.a !== 1 ? `hsla(${h},${s}%,${l}%,${this.a})` : `hsl(${h},${s}%,${l}%)`
        }
        /** Same as toHsb */
        toHsv() {
            return {
                h: this.getHue(),
                s: this.getSaturation(),
                v: this.getValue(),
                a: this.a,
            }
        }
        toRgb() {
            return {
                r: this.r,
                g: this.g,
                b: this.b,
                a: this.a,
            }
        }
        toRgbString() {
            return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`
        }
        toString() {
            return this.toRgbString()
        }
        // ====================== Privates ======================
        /** Return a new FastColor object with one channel changed */
        _sc(rgb, value, max) {
            const clone = this.clone()
            clone[rgb] = limitRange(value, max)
            return clone
        }
        _c(input) {
            return new this.constructor(input)
        }
        getMax() {
            if (typeof this._max === 'undefined') {
                this._max = Math.max(this.r, this.g, this.b)
            }
            return this._max
        }
        getMin() {
            if (typeof this._min === 'undefined') {
                this._min = Math.min(this.r, this.g, this.b)
            }
            return this._min
        }
        fromHexString(trimStr) {
            const withoutPrefix = trimStr.replace('#', '')
            function connectNum(index1, index2) {
                return parseInt(withoutPrefix[index1] + withoutPrefix[index2 || index1], 16)
            }
            if (withoutPrefix.length < 6) {
                this.r = connectNum(0)
                this.g = connectNum(1)
                this.b = connectNum(2)
                this.a = withoutPrefix[3] ? connectNum(3) / 255 : 1
            } else {
                this.r = connectNum(0, 1)
                this.g = connectNum(2, 3)
                this.b = connectNum(4, 5)
                this.a = withoutPrefix[6] ? connectNum(6, 7) / 255 : 1
            }
        }
        fromHsl({ h, s, l, a }) {
            this._h = h % 360
            this._s = s
            this._l = l
            this.a = typeof a === 'number' ? a : 1
            if (s <= 0) {
                const rgb = round(l * 255)
                this.r = rgb
                this.g = rgb
                this.b = rgb
            }
            let r = 0,
                g = 0,
                b = 0
            const huePrime = h / 60
            const chroma = (1 - Math.abs(2 * l - 1)) * s
            const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1))
            if (huePrime >= 0 && huePrime < 1) {
                r = chroma
                g = secondComponent
            } else if (huePrime >= 1 && huePrime < 2) {
                r = secondComponent
                g = chroma
            } else if (huePrime >= 2 && huePrime < 3) {
                g = chroma
                b = secondComponent
            } else if (huePrime >= 3 && huePrime < 4) {
                g = secondComponent
                b = chroma
            } else if (huePrime >= 4 && huePrime < 5) {
                r = secondComponent
                b = chroma
            } else if (huePrime >= 5 && huePrime < 6) {
                r = chroma
                b = secondComponent
            }
            const lightnessModification = l - chroma / 2
            this.r = round((r + lightnessModification) * 255)
            this.g = round((g + lightnessModification) * 255)
            this.b = round((b + lightnessModification) * 255)
        }
        fromHsv({ h, s, v, a }) {
            this._h = h % 360
            this._s = s
            this._v = v
            this.a = typeof a === 'number' ? a : 1
            const vv = round(v * 255)
            this.r = vv
            this.g = vv
            this.b = vv
            if (s <= 0) {
                return
            }
            const hh = h / 60
            const i = Math.floor(hh)
            const ff = hh - i
            const p = round(v * (1 - s) * 255)
            const q = round(v * (1 - s * ff) * 255)
            const t = round(v * (1 - s * (1 - ff)) * 255)
            switch (i) {
                case 0:
                    this.g = t
                    this.b = p
                    break
                case 1:
                    this.r = q
                    this.b = p
                    break
                case 2:
                    this.r = p
                    this.b = t
                    break
                case 3:
                    this.r = p
                    this.g = q
                    break
                case 4:
                    this.r = t
                    this.g = p
                    break
                case 5:
                default:
                    this.g = p
                    this.b = q
                    break
            }
        }
        fromHsvString(trimStr) {
            const cells = splitColorStr(trimStr, parseHSVorHSL)
            this.fromHsv({
                h: cells[0],
                s: cells[1],
                v: cells[2],
                a: cells[3],
            })
        }
        fromHslString(trimStr) {
            const cells = splitColorStr(trimStr, parseHSVorHSL)
            this.fromHsl({
                h: cells[0],
                s: cells[1],
                l: cells[2],
                a: cells[3],
            })
        }
        fromRgbString(trimStr) {
            const cells = splitColorStr(trimStr, (num, txt) =>
                // Convert percentage to number. e.g. 50% -> 128
                txt.includes('%') ? round((num / 100) * 255) : num,
            )
            this.r = cells[0]
            this.g = cells[1]
            this.b = cells[2]
            this.a = cells[3]
        }
    }

    // src/utils/generateGradientColors.ts
    var hueStep = 2
    var saturationStep = 0.16
    var saturationStep2 = 0.05
    var brightnessStep1 = 0.05
    var brightnessStep2 = 0.15
    var lightColorCount = 5
    var darkColorCount = 4
    var darkColorMap = [
        { index: 7, amount: 15 },
        { index: 6, amount: 25 },
        { index: 5, amount: 30 },
        { index: 5, amount: 45 },
        { index: 5, amount: 65 },
        { index: 5, amount: 85 },
        { index: 4, amount: 90 },
        { index: 3, amount: 95 },
        { index: 2, amount: 97 },
        { index: 1, amount: 98 },
    ]
    function getHue(hsv, i, light) {
        let hue
        if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
            hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i
        } else {
            hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i
        }
        if (hue < 0) {
            hue += 360
        } else if (hue >= 360) {
            hue -= 360
        }
        return hue
    }
    function getSaturation(hsv, i, light) {
        if (hsv.h === 0 && hsv.s === 0) {
            return hsv.s
        }
        let saturation
        if (light) {
            saturation = hsv.s - saturationStep * i
        } else if (i === darkColorCount) {
            saturation = hsv.s + saturationStep
        } else {
            saturation = hsv.s + saturationStep2 * i
        }
        if (saturation > 1) {
            saturation = 1
        }
        if (light && i === lightColorCount && saturation > 0.1) {
            saturation = 0.1
        }
        if (saturation < 0.06) {
            saturation = 0.06
        }
        return Math.round(saturation * 100) / 100
    }
    function getValue(hsv, i, light) {
        let value
        if (light) {
            value = hsv.v + brightnessStep1 * i
        } else {
            value = hsv.v - brightnessStep2 * i
        }
        value = Math.max(0, Math.min(1, value))
        return Math.round(value * 100) / 100
    }
    function generateGradientColors(color, opts = {}) {
        const patterns = []
        const pColor = new FastColor(color)
        const hsv = pColor.toHsv()
        for (let i = lightColorCount; i > 0; i -= 1) {
            const c = new FastColor({
                h: getHue(hsv, i, true),
                s: getSaturation(hsv, i, true),
                v: getValue(hsv, i, true),
            })
            patterns.push(c)
        }
        patterns.push(pColor)
        for (let i = 1; i <= darkColorCount; i += 1) {
            const c = new FastColor({
                h: getHue(hsv, i),
                s: getSaturation(hsv, i),
                v: getValue(hsv, i),
            })
            patterns.push(c)
        }
        if (opts.theme === 'dark') {
            return darkColorMap.map(({ index, amount }) =>
                new FastColor(opts.backgroundColor || '#141414').mix(patterns[index], amount).toHexString(),
            )
        }
        return patterns.map((c) => c.toHexString())
    }

    // src/utils/toRGB.ts
    var colorNames = {
        black: '#000000',
        white: '#FFFFFF',
        red: '#FF0000',
        green: '#008000',
        blue: '#0000FF',
        yellow: '#FFFF00',
        purple: '#800080',
        orange: '#FFA500',
        gray: '#808080',
        grey: '#808080',
        pink: '#FFC0CB',
        brown: '#A52A2A',
        cyan: '#00FFFF',
        magenta: '#FF00FF',
        silver: '#C0C0C0',
        maroon: '#800000',
        olive: '#808000',
        lime: '#00FF00',
        teal: '#008080',
        navy: '#000080',
    }
    function toRGB(color) {
        if (!color) return null
        color = color.trim().toLowerCase()
        if (color.startsWith('#')) {
            return hexToRGB(color)
        }
        if (color.startsWith('rgb')) {
            return rgbStringToRGB(color)
        }
        if (color in colorNames) {
            return hexToRGB(colorNames[color])
        }
        return null
    }
    function hexToRGB(hex) {
        hex = hex.replace('#', '')
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
        }
        if (hex.length !== 6) return null
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
        return [r, g, b]
    }
    function rgbStringToRGB(rgbString) {
        const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i)
        if (!match) return null
        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)
        if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
        return [r, g, b]
    }

    // src/utils/isDark.ts
    function isDark(color) {
        const rgb = toRGB(color)
        if (!rgb) return false
        const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]
        return luminance < 128
    }

    // src/utils/generateGradientVars.ts
    function generateGradientVars(color, options) {
        const { prefix } = Object.assign({}, options)
        const colors = generateGradientColors(color)
        if (isDark(color)) colors.reverse()
        const vars = {}
        colors.reduce((all, cur, i) => {
            vars[`${prefix}${i}`] = cur
            return all
        }, {})
        return vars
    }

    // src/utils/toVarStyles.ts
    function toVarStyles(vars) {
        return `${Object.entries(vars)
            .map(([key, value]) => `${key}:${value}`)
            .join(';\n')};`
    }

    // src/utils/getVarsStyles.ts
    function getVarsStyles(vars, selector, attrName) {
        return Object.entries(vars)
            .map(([key, value]) => {
                return `${selector}[${attrName}=${key}],[${attrName}=${key}]{
${toVarStyles(value)}
}`
            })
            .join('\n')
    }

    // src/utils/getId.ts
    function getId(len = 10) {
        return Math.random()
            .toString(36)
            .substring(2, len + 2)
    }

    // src/utils/injectStylesheet.ts
    function injectStylesheet(css, options) {
        if (globalThis.document === void 0) return
        const { id, mode, location = 'head' } = Object.assign({ mode: 'replace' }, options)
        let style = document.head.querySelector(`#${id}`)
        const scopeId = id || getId()
        if (!style) {
            style = document.createElement('style')
            style.id = scopeId
            if (location === 'body') {
                document.body.appendChild(style)
            } else if (location instanceof HTMLElement) {
                location.appendChild(style)
            } else {
                document.head.appendChild(style)
            }
        }
        if (mode === 'append') {
            style.innerHTML += css
        } else {
            style.innerHTML = css
        }
        return scopeId
    }

    // src/utils/toRGBString.ts
    function toRGBString(color) {
        const rgb = toRGB(color)
        if (!rgb) return color
        return `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`
    }

    // src/vars/base.ts
    var baseVars = {
        '--t-border-radius-x-small': '0.2rem',
        '--t-border-radius-small': '0.3rem',
        '--t-border-radius-medium': '0.5rem',
        '--t-border-radius-large': '1rem',
        '--t-border-radius-x-large': '1.2rem',
        '--t-border-radius-circle': '50%',
        '--t-border-radius-pill': '9999px',
        '--t-shadow-x-small': '0 1px 2px hsl(240 3.8% 46.1% / 6%)',
        '--t-shadow-small': '0 1px 2px hsl(240 3.8% 46.1% / 12%)',
        '--t-shadow-medium': '0 2px 4px hsl(240 3.8% 46.1% / 12%)',
        '--t-shadow-large': '0 2px 8px hsl(240 3.8% 46.1% / 12%)',
        '--t-shadow-x-large': '0 4px 16px hsl(240 3.8% 46.1% / 12%)',
        '--t-font-size-x-small': '0.75rem',
        '--t-font-size-small': '0.875rem',
        '--t-font-size-medium': '1rem',
        '--t-font-size-large': '1.25rem',
        '--t-font-size-x-large': '1.5rem',
        '--t-font-weight-x-small': '100',
        '--t-font-weight-small': '200',
        '--t-font-weight-medium': '300',
        '--t-font-weight-large': '400',
        '--t-font-weight-x-large': '500',
        /* 间距 */
        '--t-spacing-x-small': '0.5rem',
        '--t-spacing-small': '0.75rem',
        '--t-spacing-medium': '1rem',
        '--t-spacing-large': '1.25rem',
        '--t-spacing-x-large': '1.75rem',
        '--t-letter-spacing-x-small': 'calc(var(--t-spacing-medium) * 0.01)',
        '--t-letter-spacing-small': 'calc(var(--t-spacing-medium) * 0.02)',
        '--t-letter-spacing-medium': 'calc(var(--t-spacing-medium) * 0.05)',
        '--t-letter-spacing-large': 'calc(var(--t-spacing-medium) * 0.1)',
        '--t-letter-spacing-x-large': 'calc(var(--t-spacing-medium) * 0.1)',
        '--t-line-height-x-small': 'var(--t-spacing-medium)',
        '--t-line-height-small': 'calc(var(--t-spacing-medium) * 1.2)',
        '--t-line-height-medium': 'calc(var(--t-spacing-medium) * 1.5)',
        '--t-line-height-large': 'calc(var(--t-spacing-medium) * 1.8)',
        '--t-line-height-x-large': 'calc(var(--t-spacing-medium) * 2)',
    }

    // src/vars/derived.ts
    var derivedVars = {
        /* 主题色 */
        '--t-theme-color': 'var(--t-color-theme-8)',
        '--t-theme-bgcolor': 'var(--t-color-theme-0)',
        '--t-theme-bgcolor-1': 'var(--t-color-theme-1)',
        '--t-theme-bgcolor-2': 'var(--t-color-theme-2)',
        '--t-theme-bgcolor-3': 'var(--t-color-theme-3)',
        '--t-theme-bgcolor-4': 'var(--t-color-theme-4)',
        '--t-theme-bgcolor-5': 'var(--t-color-theme-5)',
        /* 主色调 */
        '--auto-primary-color': 'var(--t-color-primary-5)',
        '--auto-success-color': 'var(--t-color-success-5)',
        '--auto-danger-color': 'var(--t-color-danger-5)',
        '--auto-warning-color': 'var(--t-color-warning-5)',
        '--auto-info-color': 'var(--t-color-info-5)',
        '--auto-theme-color': 'var(--t-color-theme-5)',
        /* 字体颜色 */
        '--auto-color': 'var(--t-theme-color)',
        '--auto-secondary-color': 'var(--t-color-theme-4)',
        '--auto-disable-color': 'var(--t-color-theme-3)',
        '--auto-hover-color': 'var(--t-color-theme-4)',
        '--auto-dark-color': 'color-mix(in srgb, var(--auto-color), black 10%)',
        '--auto-light-color': 'color-mix(in srgb, var(--auto-color), white 10%)',
        /* 背景颜色: 用于面板/对话框/组件的背景 */
        '--auto-bgcolor': 'var(--t-theme-bgcolor)',
        '--auto-workspace-bgcolor': 'var(--t-color-theme-1)',
        /* 亮色: 相对于背景的亮色*/
        '--auto-light-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), white 20%)',
        /* 暗色: 相对于背景的暗色背景*/
        '--auto-dark-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), black 10%)',
        /** 随随色背景颜色：用于自动选中颜色，或根据背景颜色自动匹配背景颜色*/
        '--auto-selected-bgcolor': 'var(--t-color-theme-5)',
        '--auto-hover-bgcolor': 'color-mix(in srgb, var(--t-color-theme-5), transparent 85%)',
        /* 边框 */
        '--auto-border': '1px solid var(--auto-border-color)',
        '--auto-border-color': 'var(--t-color-theme-2)',
        '--auto-selected-border': '1px solid var(--t-color-theme-6)',
        '--auto-active-border': '1px solid var(--t-color-theme-6)',
        '--auto-disable-border': '1px solid var(--auto-disable-color)',
        '--auto-border-active-color': 'var(--t-color-primary-3)',
        /* 排版/字体 */
        '--auto-font': 'var(--auto-font-weight) var(--auto-font-size)/1.5 var(--auto-font-family)',
        '--auto-font-family':
            'Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans-serif',
        '--auto-font-size': 'var(--t-font-size-medium)',
        '--auto-font-weight': 'var(--t-font-weight-medium)',
        '--auto-letter-spacing': 'var(--t-letter-spacing-medium)',
        '--auto-line-height': 'var(--t-line-height-medium)',
        '--auto-title-font':
            'calc(var(--auto-font-weight) + 200) calc(var(--auto-font-size) * 1.1)/1.5 var(--auto-font-family)',
        /* 面板: 用于导航/标题栏/标签页标题 */
        '--auto-panel-header-color': 'var(--t-theme-color-6)',
        /** 标题背景颜色：用于标题/标题栏的背景颜色*/
        '--auto-panel-header-bgcolor': 'color-mix(in hsl, var(--auto-bgcolor), black 5%)',
        /* 面板背景颜色：用于面板/区块/Drawer等背景颜色*/
        '--auto-panel-bgcolor': 'var(--auto-light-bgcolor)',
        /* 边框/间距 */
        '--auto-border-radius': 'var(--t-border-radius-medium)',
        '--auto-spacing': 'var(--t-spacing-medium)',
        '--auto-padding': 'var(--t-spacing-medium)',
        '--auto-margin': 'var(--t-spacing-medium)',
        '--auto-shadow': 'var(--t-shadow-medium)',
        /* 输入框 */
        /** 输入框背景颜色：用于输入框背景颜色*/
        '--auto-input-bgcolor': 'var(--t-theme-bgcolor)',
        '--auto-input-padding': 'calc(0.5 * var(--auto-padding))',
        '--auto-input-height': 'var(--t-line-height-medium)',
        /** 其他 */
        '--auto-icon-size': 'calc(1.2 * var(--t-font-size-medium))',
    }

    // src/vars/size.ts
    function getSizeVars(size) {
        return {
            /** 段落与字体 */
            '--auto-font-size': `var(--t-font-size-${size})`,
            '--auto-font-weight': `var(--t-font-weight-${size})`,
            '--auto-letter-spacing': `var(--t-letter-spacing-${size})`,
            '--auto-line-height': `var(--t-line-height-${size})`,
            /* 用于内边距和外边距 */
            '--auto-spacing': `var(--t-spacing-${size})`,
            '--auto-padding': `var(--t-spacing-${size})`,
            '--auto-margin': `var(--t-spacing-${size})`,
            '--auto-shadow': `var(--t-shadow-${size})`,
            '--auto-icon-size': `calc(1.5 * var(--t-font-size-${size}))`,
            /* 输入框 */
            '--auto-input-height': `var(--t-input-height-${size})`,
        }
    }
    var sizeVars = {
        'x-small': getSizeVars('x-small'),
        small: getSizeVars('small'),
        medium: getSizeVars('medium'),
        large: getSizeVars('large'),
        'x-large': getSizeVars('x-large'),
    }

    // src/vars/radius.ts
    function getRadiusVars(radius) {
        return {
            '--auto-border-radius': `var(--t-border-radius-${radius})!important`,
        }
    }
    var radiusVars = {
        'x-small': getRadiusVars('x-small'),
        small: getRadiusVars('small'),
        medium: getRadiusVars('medium'),
        large: getRadiusVars('large'),
        'x-large': getRadiusVars('x-large'),
    }

    // src/vars/spacing.ts
    function getSpacingVars(spacing) {
        return {
            '--auto-spacing': `var(--t-spacing-${spacing}) !important`,
            '--auto-padding': `var(--t-spacing-${spacing}) !important`,
            '--auto-margin': `var(--t-spacing-${spacing}) !important`,
        }
    }
    var spacingVars = {
        'x-small': getSpacingVars('x-small'),
        small: getSpacingVars('small'),
        medium: getSpacingVars('medium'),
        large: getSpacingVars('large'),
        'x-large': getSpacingVars('x-large'),
    }

    // src/vars/shadow.ts
    function getShadowVars(size) {
        return {
            '--auto-shadow': `var(--t-shadow-${size})!important`,
        }
    }
    var shadowVars = {
        'x-small': getShadowVars('x-small'),
        small: getShadowVars('small'),
        medium: getShadowVars('medium'),
        large: getShadowVars('large'),
        'x-large': getShadowVars('x-large'),
    }

    // src/kylinbits.ts
    var Themepro = class {
        constructor(scope, options) {
            this.dark = false
            this.vars = {}
            this.selector = ':host,:root'
            this.options = Object.assign(
                {
                    selector: ':host,:root',
                    theme: 'light',
                    size: 'medium',
                    radius: 'medium',
                    spacing: 'medium',
                    shadow: 'medium',
                    border: '1px',
                    primary: '#2f54eb',
                    success: '#22c55e',
                    warning: '#f59e0b',
                    danger: '#ef4444',
                    info: '#71717a',
                },
                options,
            )
            if (typeof scope === 'string') {
                window.addEventListener('DOMContentLoaded', () => {
                    this.scope = document.querySelector(scope) || document.documentElement
                    this._init()
                })
            } else {
                this.scope = scope || document.documentElement
                this._init()
            }
        }
        _init() {
            this.attrObserver = new AttrObserver(
                this.scope,
                ['data-theme', 'data-primary', 'data-success', 'data-warning', 'data-danger', 'data-info'],
                this._onThemeAttrsChange.bind(this),
            )
            this._injectBaseStyles()
            this._createKeyColorStyles()
            this.update()
        }
        get size() {
            return this.scope.dataset.size || this.options.size || 'medium'
        }
        set size(value) {
            if (value === 'medium') {
                this.scope.removeAttribute('data-size')
            } else {
                this.scope.dataset.size = value
            }
        }
        get spacing() {
            return this.scope.dataset.spacing || this.options.spacing || 'medium'
        }
        set spacing(value) {
            if (value === 'medium') {
                this.scope.removeAttribute('data-spacing')
            } else {
                this.scope.dataset.spacing = value
            }
        }
        get shadow() {
            return this.scope.dataset.shadow || this.options.shadow || 'medium'
        }
        set shadow(value) {
            if (value === 'medium') {
                this.scope.removeAttribute('data-shadow')
            } else {
                this.scope.dataset.shadow = value
            }
        }
        get radius() {
            return this.scope.dataset.radius || this.options.radius || 'medium'
        }
        set radius(value) {
            if (value === 'medium') {
                this.scope.removeAttribute('data-radius')
            } else {
                this.scope.dataset.radius = value
            }
        }
        get theme() {
            return this.scope.dataset.theme || this.options.theme || 'light'
        }
        set theme(value) {
            if (value === 'medium') {
                this.scope.removeAttribute('data-theme')
            } else {
                this.scope.dataset.theme = value in presetThemes ? presetThemes[value].baseColor : toRGBString(value)
            }
        }
        /**
         * 当属性变化时，更新主题
         *
         * @param attrName
         * @param attrValue
         */
        _onThemeAttrsChange(attrName, attrValue) {
            if (attrName === 'data-theme') {
                this.update({ theme: attrValue || 'light' })
            }
        }
        /**
         *
         */
        update(options) {
            Object.assign(this.options, options)
            const { theme = 'light', size, radius, spacing, shadow } = this.options
            this.dark = false
            if (theme in presetThemes) {
                this.options.theme = presetThemes[theme].baseColor
            }
            this.size = size
            this.radius = radius
            this.spacing = spacing
            this.shadow = shadow
            const themeColorVars = this._createThemeColorVars()
            this.dark = isDark(this.theme)
            const themeName = theme
            const style = `${this.selector}[data-theme='${themeName}'],[data-theme='${themeName}']{
            ${`color-scheme: ${this.dark ? 'dark' : 'light'}`};
            ${Object.entries(themeColorVars)
                .map(([key, value]) => `${key}:${value}`)
                .join(';\n')};
            }`
            injectStylesheet(style, {
                id: `kylinbits-theme`,
            })
        }
        /**
         * 获取默认主题的样式字符串
         * @returns {string} 包含CSS变量和颜色模式的主题样式字符串
         * @private
         */
        _getDefaultThemeStyles() {
            const dark = isDark(presetThemes.light.baseColor)
            return `${this.selector}{
${`color-scheme: ${dark ? 'dark' : 'light'}`};
${toVarStyles(this._createThemeColorVars(presetThemes.light.baseColor))}
}
`
        }
        _createThemeColorVars(theme = this.theme) {
            const themeColor = theme in presetThemes ? presetThemes[theme].baseColor : theme
            const vars = generateGradientVars(themeColor, {
                prefix: '--t-color-theme-',
            })
            return vars
        }
        _createKeyColorStyles() {
            const variants = ['primary', 'success', 'warning', 'danger', 'info']
            const vars = {}
            variants.forEach((name) => {
                if (this.options[name]) {
                    Object.assign(vars, generateGradientVars(this.options[name], { prefix: `--t-color-${name}-` }))
                }
            })
            injectStylesheet(
                `${this.selector}{
${toVarStyles(vars)}}
}
`,
                {
                    id: 'kylinbits-keycolors',
                },
            )
        }
        _injectBaseStyles() {
            const baseStyles = `${this.selector}{
${toVarStyles(baseVars)}
${toVarStyles(derivedVars)}
}
`
            const sizeStyles = getVarsStyles(sizeVars, this.selector, 'data-size')
            const radiusStyles = getVarsStyles(radiusVars, this.selector, 'data-radius')
            const spacingStyles = getVarsStyles(spacingVars, this.selector, 'data-spacing')
            const shadowStyles = getVarsStyles(shadowVars, this.selector, 'data-shadow')
            const lightStyles = this._getDefaultThemeStyles()
            injectStylesheet(
                `${baseStyles}
${sizeStyles}
${radiusStyles}
${spacingStyles}
${shadowStyles}
${lightStyles}`,
                {
                    id: 'kylinbits-vars',
                },
            )
        }
    }
    var themePro = new Themepro()
    globalThis.ThemePro = themePro

    // src/utils/isLight.ts
    function isLight(color) {
        return isDark(color)
    }
})()
//# sourceMappingURL=index.global.js.map
