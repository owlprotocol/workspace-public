export function getComponentDisplayName(WrappedComponent: any) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
