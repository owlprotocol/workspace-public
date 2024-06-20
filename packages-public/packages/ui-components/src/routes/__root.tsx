import { createRootRoute } from "@tanstack/react-router";
import { Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Card } from "../components/ui/card.js";
import { Button } from "../components/ui/button.js";

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => (
        <>
            <Card>Component Not Found</Card>
        </>
    ),
});

function RootComponent() {
    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container max-w-screen-2xl flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <div className="p-2 flex gap-2">
                            <Link
                                to="/users-table"
                                className="[&.active]:font-bold"
                            >
                                <Button>Users Table</Button>
                            </Link>
                            <Link
                                to="/rainbowKit"
                                className="[&.active]:font-bold"
                            >
                                <Button>RainbowKit</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container max-w-screen-2xl w-full mx-auto flex-1 space-y-4 px-4 md:px-6 xl:px-8 mt-4">
                <div className="relative flex min-h-screen flex-col">
                    <Outlet />
                </div>
            </main>
            <TanStackRouterDevtools />
        </>
    );
}
