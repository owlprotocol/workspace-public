/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UsersTableImport } from './routes/users-table'
import { Route as RainbowKitImport } from './routes/rainbowKit'

// Create/Update Routes

const UsersTableRoute = UsersTableImport.update({
  path: '/users-table',
  getParentRoute: () => rootRoute,
} as any)

const RainbowKitRoute = RainbowKitImport.update({
  path: '/rainbowKit',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/rainbowKit': {
      preLoaderRoute: typeof RainbowKitImport
      parentRoute: typeof rootRoute
    }
    '/users-table': {
      preLoaderRoute: typeof UsersTableImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  RainbowKitRoute,
  UsersTableRoute,
])

/* prettier-ignore-end */
