import express from "express";
import swaggerUi from "swagger-ui-express";
import { appRouter } from "../router.js";
import cors from "cors";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { openApiDocument } from "../openapi.js";

const app = express();

// Setup CORS
app.use(cors());

// Handle incoming tRPC requests
app.use("/api/trpc", createExpressMiddleware({ router: appRouter }));
// Handle incoming OpenAPI requests
app.use("/api", createOpenApiExpressMiddleware({ router: appRouter }));

// Serve Swagger UI with our OpenAPI schema
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(openApiDocument));

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
