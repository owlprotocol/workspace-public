import { z } from "zod";
import { addressZod } from "./solidity/address.js";
import { numberLikeZod } from "./eth/math.js";

export const contractAddressZod = z.object({
    chainId: numberLikeZod,
    address: addressZod,
});
