import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC.meta<OpenApiMeta>().create({
    errorFormatter: ({ error, shape }) => {
        if (
            error.code === "INTERNAL_SERVER_ERROR" &&
            process.env.NODE_ENV === "production"
        ) {
            return { ...shape, message: "Internal server error" };
        }
        return shape;
    },
});
