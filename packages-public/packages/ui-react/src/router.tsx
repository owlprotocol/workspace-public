import { ReactRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/__root.js";
import { componentsParentRoute, componentsRoutes } from "./routes/components/index.js";

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([componentsParentRoute.addChildren([...componentsRoutes])]);

// Create the router using your route tree
export const router = new ReactRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
