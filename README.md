# ThemePro

[Website](https://zhangfisher.github.io/themepro/)

A powerful theme management tool for modern web applications.

## About

ThemePro is a powerful theme management tool designed for modern web applications, providing simple and intuitive APIs to manage themes, colors, sizes, and spacing style properties in your application.

If you want to build a scalable web application with real-time theme switching capabilities and an immersive user experience, ThemePro is your best choice.

## Installation

ThemePro can be installed via `npm`, `yarn`, or `pnpm`:

```bash
# Using npm
npm install themepro

# Using yarn
yarn add themepro

# Using pnpm
pnpm add themepro
```

### Basic Setup

After installation, import ThemePro in your project's entry file:

**In JavaScript/TypeScript:**

```js
import 'themepro/index.css';
import 'themepro';
```

**In HTML:**

```html
<link rel="stylesheet" href="path/to/themepro/index.css">
<script src="https://cdn.jsdelivr.net/npm/themepro"></script>
```

**Quick Configuration:**

```html
<html data-theme> 
  <head>
    <link rel="stylesheet" href="themepro.min.css">
    <script src="themepro.min.js" type="text/javascript"></script>
  </head>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

## Features

ThemePro offers a comprehensive set of features to enhance your web application's theming capabilities:

### Theme Management

Easily switch between light and dark themes, and create custom themes without page reloading. ThemePro comes with preset themes like `light`, `dark`, `blue`, and `red`, and allows you to create your own custom themes.

```js
// Switch to dark theme
ThemePro.theme = 'dark';

// Create a custom theme
ThemePro.create({
  name: 'custom',
  theme: '#3366ff',
  variants: {
    primary: '#3366ff',
    success: '#00cc66',
    warning: '#ffcc00',
    danger: '#ff3366',
    info: '#33ccff'
  }
});
```

### Variant Colors

ThemePro includes five semantic variant colors (primary, success, warning, danger, info) to meet different scenario requirements. You can customize each variant color to match your brand identity.

```js
// Customize primary color
ThemePro.createVariant('primary', {
  color: '#3366ff',
  range: [10, 98],
  levels: [5, 1, 2, 3, 4, 5]
});

// Simple variant customization
ThemePro.createVariant('warning', '#ffcc00');
```

### Size System

A unified size system for component sizes, spacing, and border radius provides a consistent visual experience across your application.

```js
// Adjust component size
ThemePro.size = 'large';

// Adjust border radius
ThemePro.radius = 'medium';

// Adjust spacing
ThemePro.spacing = 'large';
```

### Gradient Color Generation

Automatically generate gradient color systems based on base colors to enrich visual presentation.

### Real-time Dynamic Theming

Support for dynamically modifying theme colors and generating theme styles in real-time without recompilation.

### User-Friendly

Allow website users to modify theme parameters themselves and dynamically change the website style in real-time.

```css
/* Use theme variables in your CSS */
.my-element {
  color: var(--t-theme-color);
  background-color: var(--t-theme-bgcolor);
  border: 1px solid var(--t-color-theme-2);
}

/* Use variant colors */
.my-button {
  background-color: var(--t-primary-bgcolor);
  color: var(--t-primary-color);
}
```