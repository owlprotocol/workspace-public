# Owl Protocol React Component Library

Owl Protocol React Component library

## Architecture
This project uses Vite for bundling, however we have 2 configs:
- component library bundle: This gets run by `build` command and produces final output bundles in package.
- app config: This serves as a makeshift "storybook" to test out the rendering of components in a regular Vite React app. We use @tanstack/router to create 1 route per component. This gets run by `dev/start` commands and `build:app` command (generates prod build of the "storybook").

## What's included
This package exports the following
- Higher Level Components (HOC): Wrappers to inject global context such as for Firebase, Clerk and other services
- Chakra themes: Themes for chakra
- Web3 Components: Components for viewing blockchain data such as Tokens, Collectibles, or Embedded wallets

## Tips

### Externalize Dependencies
We look to externalize all dependencies in our [vite.config.mts](./vite.config.mts). This avoids running into issues where 2 identical instances of the same library are loaded (eg. React, @tanstack/router) and fixes issues related to such duplicate imports (eg. violates React setup, generates duplicate conflicting contexts).

We use [davidmyersdev/vite-plugin-externalize-deps](https://github.com/davidmyersdev/vite-plugin-externalize-deps)

**Outdated (use plugin)**
Our configuration already includes all dependencies defined in the [package.json](./package.json) but does **NOT** included nested dependencies (eg. react-runtime which we explicitely exclude with our regex).
At build time, you should **ONLY** be generating 2 files `index.mjs` and `index.cjs`. Any `vendor-XXX.[m|c]js` file being generated means a dependency was accidentally bundled with the library.
