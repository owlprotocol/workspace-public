import { CLERK_PUBLISHABLE_KEY } from "@owlprotocol/envvars/browser";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import { withTRPCProvider } from "./components/reactProviders.js";

const InnerApp = () => {
    return <h1>Hello</h1>;
};

const InnerAppWithTRPC = withTRPCProvider(
    InnerApp,
    CLERK_PUBLISHABLE_KEY,
    API_TRPC_BASE_URL
);

export const App = () => {
    return <InnerAppWithTRPC />;
};
