import {contractRouter} from './routes/contracts.js';
import {collectionRouter} from './routes/deployments.js';
import {t} from './trpc.js';


export const appRouter = t.router({
    contract: contractRouter,
    collection: collectionRouter
});

export type AppRouter = typeof appRouter;
