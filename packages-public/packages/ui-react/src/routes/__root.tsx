import { Outlet, RootRoute } from "@tanstack/react-router";
import { ReactNode } from "react";
import { z } from "zod";

export function Root(): ReactNode {
    return (
        <>
            <Outlet />
        </>
    );
}

const chainSchema = z.object({
    chainId: z.number().optional(),
});

type RootSchema = z.infer<typeof chainSchema>;

const saveChainId = (chainId: number) => {
    localStorage.setItem("chainId", chainId.toString());
};

// Create a root route
export const rootRoute = new RootRoute({
    component: Root,
    validateSearch: (search: Record<string, unknown>): RootSchema => {
        let chainId = chainSchema.parse(search).chainId;
        if (!chainId) {
            chainId = 1337;
        }

        saveChainId(chainId);

        return {
            chainId,
        };
    },
});
