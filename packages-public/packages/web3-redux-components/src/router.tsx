import { Router } from "@tanstack/react-router";
import { indexRoute } from "./routes/index.js";
import { rootRoute } from "./routes/__root.js";
import { componentsAll } from "./routes/components/index.js";

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
    indexRoute,
    componentsAll
])

// Create the router using your route tree
const router = new Router({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/router' {
    interface RegisterRouter {
        router: typeof router;
    }
}
export { router };
