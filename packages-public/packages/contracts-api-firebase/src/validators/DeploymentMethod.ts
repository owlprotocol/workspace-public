import { z } from "zod";
import { DeploymentMethod } from "../models/DeploymentMethod.js";

export const deploymentMethodZod = z.nativeEnum(DeploymentMethod).describe("deployment method");
