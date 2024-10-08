/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthConfigurationImport } from './routes/_auth/configuration'
import { Route as AuthBlacklistImport } from './routes/_auth/blacklist'
import { Route as AuthAgentsImport } from './routes/_auth/agents'
import { Route as AuthServersViewImport } from './routes/_auth/servers.view'
import { Route as AuthListenersViewImport } from './routes/_auth/listeners.view'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthConfigurationRoute = AuthConfigurationImport.update({
  path: '/configuration',
  getParentRoute: () => AuthRoute,
} as any)

const AuthBlacklistRoute = AuthBlacklistImport.update({
  path: '/blacklist',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAgentsRoute = AuthAgentsImport.update({
  path: '/agents',
  getParentRoute: () => AuthRoute,
} as any)

const AuthServersViewRoute = AuthServersViewImport.update({
  path: '/servers/view',
  getParentRoute: () => AuthRoute,
} as any)

const AuthListenersViewRoute = AuthListenersViewImport.update({
  path: '/listeners/view',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/agents': {
      id: '/_auth/agents'
      path: '/agents'
      fullPath: '/agents'
      preLoaderRoute: typeof AuthAgentsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/blacklist': {
      id: '/_auth/blacklist'
      path: '/blacklist'
      fullPath: '/blacklist'
      preLoaderRoute: typeof AuthBlacklistImport
      parentRoute: typeof AuthImport
    }
    '/_auth/configuration': {
      id: '/_auth/configuration'
      path: '/configuration'
      fullPath: '/configuration'
      preLoaderRoute: typeof AuthConfigurationImport
      parentRoute: typeof AuthImport
    }
    '/_auth/listeners/view': {
      id: '/_auth/listeners/view'
      path: '/listeners/view'
      fullPath: '/listeners/view'
      preLoaderRoute: typeof AuthListenersViewImport
      parentRoute: typeof AuthImport
    }
    '/_auth/servers/view': {
      id: '/_auth/servers/view'
      path: '/servers/view'
      fullPath: '/servers/view'
      preLoaderRoute: typeof AuthServersViewImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthAgentsRoute,
    AuthBlacklistRoute,
    AuthConfigurationRoute,
    AuthListenersViewRoute,
    AuthServersViewRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/agents",
        "/_auth/blacklist",
        "/_auth/configuration",
        "/_auth/listeners/view",
        "/_auth/servers/view"
      ]
    },
    "/_auth/agents": {
      "filePath": "_auth/agents.tsx",
      "parent": "/_auth"
    },
    "/_auth/blacklist": {
      "filePath": "_auth/blacklist.tsx",
      "parent": "/_auth"
    },
    "/_auth/configuration": {
      "filePath": "_auth/configuration.tsx",
      "parent": "/_auth"
    },
    "/_auth/listeners/view": {
      "filePath": "_auth/listeners.view.tsx",
      "parent": "/_auth"
    },
    "/_auth/servers/view": {
      "filePath": "_auth/servers.view.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
