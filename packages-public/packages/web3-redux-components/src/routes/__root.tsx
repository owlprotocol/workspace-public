import {
    Outlet,
    Link,
    RootRoute,
} from '@tanstack/react-router'

// Create a root route
export const rootRoute = new RootRoute({
    component: Root,
})

function Root() {
    return (
        <>
            <div>
                <Link to="/">Home</Link> <Link to="/components">Components</Link> <Link to="/components/initialize">Initialize</Link>
            </div>
            <hr />
            <Outlet />
        </>
    )
}
