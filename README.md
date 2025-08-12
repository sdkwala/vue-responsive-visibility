# vue-responsive-visibility

[![CI](https://github.com/sdkwala/vue-responsive-visibility/actions/workflows/simple-test.yml/badge.svg)](https://github.com/sdkwala/vue-responsive-visibility/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/@sdkwala/vue-responsive-visibility.svg)](https://www.npmjs.com/package/@sdkwala/vue-responsive-visibility)

Tiny Vue 3 plugin to conditionally render content by responsive breakpoints. Provides a `VisibleOn` component and a `v-visible-on` directive powered by CSS media queries with Tailwind-style defaults.

- Component: `VisibleOn`
- Directive: `v-visible-on`
- Customizable breakpoints
- SSR-friendly (no-op on server)

> Maintained by [@sdkwala](https://github.com/sdkwala).

## 🚀 Live Demo

**[Try it out → https://vue-responsive-visibility.netlify.app](https://vue-responsive-visibility.netlify.app)**

See the plugin in action with interactive examples and responsive breakpoints.

## Installation

```bash
npm install @sdkwala/vue-responsive-visibility
# peer dependency
npm install vue@^3
```

## Quick start

Register the plugin once, then use the component or directive anywhere.

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import ResponsiveVisibility from '@sdkwala/vue-responsive-visibility';

const app = createApp(App);
app.use(ResponsiveVisibility);
app.mount('#app');
```

## Usage

### Component

```vue
<template>
  <VisibleOn size="md-up">
    <div>Visible on md and up (≥ 768px)</div>
  </VisibleOn>

  <VisibleOn size="sm-only">
    <div>Visible only between 640px and 767px</div>
  </VisibleOn>

  <VisibleOn size="lg-down">
    <div>Visible on lg and down (≤ 1024px)</div>
  </VisibleOn>
</template>

<script setup lang="ts">
import { VisibleOn } from '@sdkwala/vue-responsive-visibility';
</script>
```

Per-instance custom breakpoints:

```vue
<VisibleOn
  :size="'md-only'"
  :breakpoints="{ xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, ['2xl']: 1920 }"
>
  <div>Custom range</div>
</VisibleOn>
```

### Directive

```vue
<template>
  <div v-visible-on="'md-up'">Visible on md and up</div>
  <div v-visible-on="'sm-only'">Visible only on sm</div>
  <div v-visible-on="'lg-down'">Visible on lg and down</div>
</template>
```

With custom breakpoints via an object binding:

```vue
<div
  v-visible-on="{ size: 'md-only', breakpoints: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536, ['2xl']: 1920 } }"
>
  Custom range
</div>
```

## Configuration

You can provide project-wide breakpoints when installing the plugin. These merge with the defaults.

```ts
import ResponsiveVisibility from '@sdkwala/vue-responsive-visibility';

app.use(ResponsiveVisibility, {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    '2xl': 1920,
  },
});
```

## API

### Plugin
- Default export: `ResponsiveVisibilityPlugin`
- Install options: `{ breakpoints?: Breakpoints }`

### Component: `VisibleOn`
- Props:
  - `size: QueryType` (required)
  - `breakpoints?: Breakpoints`

### Directive: `v-visible-on`
- Binding value:
  - `string` → `QueryType`
  - or `{ size: QueryType; breakpoints?: Breakpoints }`

### Types
- `BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`
- `Breakpoints = { [key: string]: number }`
- `QueryType = `${BreakpointKey}-up` | `${BreakpointKey}-down` | `${BreakpointKey}-only``

### Default breakpoints (Tailwind-style)

```ts
const defaultBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
```

### Query semantics
- `-up`: `(min-width: breakpoints[key]px)`
- `-down`: `(max-width: breakpoints[key]px)`
- `-only`: from current key min width up to one pixel before the next key (inclusive lower bound)

## SSR
The component and directive guard against `window` access. On the server, content defaults to visible; on the client, visibility updates once media queries are evaluated.

## Demo
A ready-to-run Vite demo is included.

```bash
cd demo
npm install
npm run dev
```

The demo consumes the package via a local `file:..` dependency.

## Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui

# Type checking
npm run type-check
```

## CI/CD

This package includes GitHub Actions workflows for automated testing:

- **`.github/workflows/test.yml`** - Comprehensive testing across multiple Node.js versions and platforms
- **`.github/workflows/simple-test.yml`** - Simple testing workflow for basic CI needs

The workflows automatically run on:
- Push to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

### Workflow Features:
- ✅ Multi-platform testing (Ubuntu, Windows, macOS)
- ✅ Multiple Node.js versions (18, 20, 22)
- ✅ Automated dependency installation
- ✅ Test coverage reporting
- ✅ Type checking
- ✅ Security auditing

## License
MIT
