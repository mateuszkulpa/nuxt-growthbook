# Nuxt GrowthBook

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt GrowthBook integration module.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/mateuszkulpa/nuxt-growthbook?file=playground%2Fapp.vue)

<!--
## Features

- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz
-->

## Quick Setup

1. Add `nuxt-growthbook` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-growthbook

# Using yarn
yarn add --dev nuxt-growthbook

# Using npm
npm install --save-dev nuxt-growthbook
```

2. Add `nuxt-growthbook` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['nuxt-growthbook']
})
```

3. Set client key in `nuxt.config.ts` or `.env` file

```ts
export default defineNuxtConfig({
  modules: ['nuxt-growthbook'],
  growthbook: {
    clientKey: 'YOUR_CLIENT_KEY'
  }
})
```

```dotenv
GROWTHBOOK_CLIENT_KEY=YOUR_CLIENT_KEY
```

4. You can now use GrowthBook in your Nuxt app ✨
```vue
<script setup>
const gb = useGrowthbook();
const bannerEnabled = gb.isOn("banner_enabled");
</script>
```

5. Optional: If you want to enable caching for GrowthBook API calls, use the `routeRules` option in your `nuxt.config.ts` file.
```ts
export default defineNuxtConfig({
   routeRules: {
     "/_growthbook/features": { swr: 60 },
   },
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-growthbook/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-growthbook

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-growthbook.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-growthbook

[license-src]: https://img.shields.io/npm/l/nuxt-growthbook.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-growthbook

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
