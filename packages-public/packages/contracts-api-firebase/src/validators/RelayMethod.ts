import { z } from "zod";
import { RelayMethod } from "../models/RelayMethod.js";

export const relayMethodZod = z.nativeEnum(RelayMethod).describe("relay method");
