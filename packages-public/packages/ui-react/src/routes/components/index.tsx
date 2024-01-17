/* eslint-disable react-refresh/only-export-components */
import { Outlet, Route } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { rootRoute } from "../__root.js";
import {
    AddressOrTransactionLink,
    Breadcrumbs,
    Hello,
    TabsComponent,
    TanstackTable,
    Timeline,
    //Wallet,
} from "../../components/index.js";
// import { WalletProvider } from "../../components/wallet/walletContext.js";
import { NetworkDropdown } from "../../index.js";

const routes = [
    "/",
    "/components",
    "/components/hello",
    "/components/breadcrumbs",
    "/components/tabs-component",
    "/components/tanstack-table",
    "/components/timeline",
    "/components/network-dropdown",
    "/components/address-or-transaction-link",
    //"/components/wallet",
] as const;

export function ComponentsLinks() {
    return (
        <>
            <div>
                {routes.map((r, idx) => {
                    return (
                        <div key={idx}>
                            <Link to={r}>{r}</Link>
                            <br />
                        </div>
                    );
                })}
            </div>
            <hr />
        </>
    );
}

export const ComponentsIndex = () => {
    return <ComponentsLinks />;
};

export const componentsParentRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "components",
    component: () => <Outlet />,
});

const componentsIndexRoute = new Route({
    getParentRoute: () => componentsParentRoute,
    path: "/",
    component: ComponentsIndex,
});

const demoDataColumnHelper = createColumnHelper<{ name: string; age: number }>();
const demoDataColumns = [
    demoDataColumnHelper.accessor((row: { name: string }) => row.name, {
        id: "name",
        header: "Name",
        cell: (info) => info.getValue(),
    }),
    demoDataColumnHelper.accessor((row: { age: number }) => row.age, {
        id: "age",
        header: "Age",
        cell: (info) => info.getValue(),
    }),
] as Array<ColumnDef<{ name: string; age: number }, any>>;

export const componentsRoutes = [
    componentsIndexRoute,
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/hello",
        component: () => <Hello />,
    }),
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/breadcrumbs",
        component: () => (
            <>
                <Breadcrumbs
                    items={[
                        { label: "Components", to: "/components" },
                        { label: "Hello", to: "/components/hello" },
                    ]}
                />
            </>
        ),
    }),
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/tabs-component",
        component: () => (
            <TabsComponent
                tabs={[
                    { label: "A", component: <>A</> },
                    { label: "B", component: <>B</> },
                ]}
            />
        ),
    }),
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/tanstack-table",
        component: () => <TanstackTable data={[{ name: "John", age: 42 }]} columns={demoDataColumns} />,
    }),
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/timeline",
        component: () => <Timeline blogs={[{ title: "example.com", url: "https://example.com", timestamp: 0 }]} />,
    }),
    /*
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/wallet",
        component: () => (
            <>
                <WalletProvider>
                    <Wallet />
                </WalletProvider>
            </>
        ),
    }),
     */
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/network-dropdown",
        component: () => <NetworkDropdown />,
    }),
    new Route({
        getParentRoute: () => componentsParentRoute,
        path: "/address-or-transaction-link",
        component: () => <AddressOrTransactionLink networkExplorerUrl="" type="address" addressOrHash="" />,
    }),
] as const;
