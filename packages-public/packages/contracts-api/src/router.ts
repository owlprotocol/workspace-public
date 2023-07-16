import { contractRouter } from "./routes/contracts.js";
import { collectionRouter } from "./routes/deployments.js";
import { abiRouter } from "./routes/abis.js";
import { t } from "./trpc.js";

export const appRouter: AppRouter = t.router({
    abi: abiRouter,
    contract: contractRouter,
    collection: collectionRouter,
});

export type AppRouter = ReturnType<typeof t.router<{
    abi: typeof abiRouter,
    contract: typeof contractRouter,
    collection: typeof collectionRouter
}>>;
