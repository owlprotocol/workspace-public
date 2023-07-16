import { abisWithZod as abisWithZodContracts } from "@owlprotocol/contracts";
import { abisWithZod as abisWithZodProxiesContracts } from "@owlprotocol/contracts-proxy";
import { constants } from "ethers";
import { z } from "zod";
import * as ZodSol from "@owlprotocol/zod-sol";
import { mapValues } from "lodash-es"
import { t } from "../trpc.js";
import { getProvider } from "../providers.js";


/**
 * abisWithZod
 *
 * Generator for trpc
 * [contractName]
 *      [functionName (any function, `initialize` function is for deployment)]
 *          [name] //same as function name
 *          [inputs] // inputs abi
 *          [inputsZod] //zod validator for named inputs
 *          [outputs] //outputs abi
 *          [outputsZod] //outpus zod
 *          [stateMutability] enum 4 values read (view/pure) or write (payable/nonpayable)
 *
 * 1. Top level loop per contract
 *      2. Second loop per function
 *          2.a name == initialize => POST request, deploy function
 *          2.b read => GET request
 *          2.c write => POST request
 * 2. Additional ideas
 *      * Have an additional object with similar schema and merge it for descriptions
 *      * Future: Use event abis to generate subscription/query endpoints
 */


//1. Generate GET
//2. Generate POST
//3. Test with meta
//4. Generate mapped version
//5. Generate initialize
//6. Test with meta
//7. Generate mapped version

//TODO
//1. Generate args to tuple function for each function
//2. GET => Factory connect, select function, call with args
//3. POST => Factory connect, select function, send with args

export function generateGETForAbiFunction<T extends ZodSol.AbiFunctionWithZod>(contractName: string, item: T) {
    return t.procedure
        .meta({
            openapi: {
                method: "GET" as const,
                path: `/{networkId}/abi/${contractName}/{address}/${item.name}` as const,
                description: `${contractName}({address}).${item.name}()`, //TODO: Add parameters to description
                summary: `${contractName}({address}).${item.name}()`,
                tags: [contractName],
            },
        })
        .input(item.inputsZod.extend(ZodSol.contractAddressZod.shape))
        .output(z.object({ result: item.outputsZod }))
        .query(({ input }) => {
            //TODO: Compute and return result build this in SDK
            return { result: { "": constants.AddressZero, 0: constants.AddressZero } };
        });
}

//TODO
export function generatePOSTForAbiFunction<T extends ZodSol.AbiFunctionWithZod>(contractName: string, item: T) {
    return t.procedure
        .meta({
            openapi: {
                method: "POST" as const,
                path: `/{networkId}/abi/${contractName}/{address}/${item.name}` as const,
                description: `${contractName}({address}).${item.name}()`, //TODO: Add parameters to description
                summary: `${contractName}({address}).${item.name}()`,
                tags: [contractName],
            },
        })
        .input(item.inputsZod.extend(ZodSol.contractAddressZod.shape))
        .output(z.object({ result: item.outputsZod }))
        .mutation(({ input }) => {
            //1. Get provider
            //getProvider(input.networkId)
            //2. Instantiate new contract using provider, abi, address

            //3.a If read (view/pure) send call
            //4.a Return data

            //3.b If write (payable/nonpayable) get gas estimate, get gas price (params or default), send tx
            //4.b Return tx hash, and receipt

            //TODO: Compute and return result build this in SDK
            return { result: { "": constants.AddressZero, 0: constants.AddressZero } };
        });
}

/*
    1. Conditional on name === initialize (ignore)
    2. Generate deploy procedure
*/
//TODO: Consider using GET request for read functions
type ProcedureForAbiFunction<T extends ZodSol.AbiFunctionWithZod> = T["stateMutability"] extends "view" | "pure" ?
    ReturnType<typeof generatePOSTForAbiFunction<T>> :
    ReturnType<typeof generatePOSTForAbiFunction<T>>
export function generateProcedureForAbiFunction<T extends ZodSol.AbiFunctionWithZod>(contractName: string, item: T): ProcedureForAbiFunction<T> {
    switch (item.stateMutability) {
        case "view":
        case "pure":
            return generatePOSTForAbiFunction(contractName, item) as any;
        case "nonpayable":
        case "payable":
            return generatePOSTForAbiFunction(contractName, item) as any;
    }
}

/**
 * Generate router for all of a smart contract's functions
 */
export type RouterForContractAbi<T extends ZodSol.AbiWithZod> = ReturnType<typeof t.router<{
    [K in keyof T]: ReturnType<typeof generateProcedureForAbiFunction<T[K]>>
}>>
export function generateRouterForContractAbi<T extends ZodSol.AbiWithZod>(contractName: string, abi: T): RouterForContractAbi<T> {
    return t.router(mapValues(abi, (item) => generateProcedureForAbiFunction(contractName, item)))
}

/**
 * Generate root router for /abi route
 */
export type RouterAbi<T extends Record<string, ZodSol.AbiWithZod>> = ReturnType<typeof t.router<{
    [K in keyof T]: ReturnType<typeof generateRouterForContractAbi<T[K]>>
}>>
export function generateAbiRouter<T extends Record<string, ZodSol.AbiWithZod>>(abisObj: T): RouterAbi<T> {
    return t.router(mapValues(abisObj, (item, k) => generateRouterForContractAbi(k, item))) as any
}

type AbisWithZod = typeof abisWithZodProxiesContracts & typeof abisWithZodContracts
export const abiRouter: RouterAbi<AbisWithZod> = generateAbiRouter<AbisWithZod>({ ...abisWithZodProxiesContracts, ...abisWithZodContracts })


/*
const getUpgradeableBeaconOwner2 = generateGETForAbiFunction(
    "UpgradeableBeacon" as const,
    abisWithZod.UpgradeableBeacon.owner,
);
*/

/*
const getUpgradeableBeaconOwner = t.procedure
    .meta({
        openapi: {
            method: "GET" as const,
            path: `/{networkId}/abi/{address}/${abisWithZod.UpgradeableBeacon.owner.name}` as const,
            description: `UpgradeableBeacon({address}).${abisWithZod.UpgradeableBeacon.owner.name}()`,
            summary: `UpgradeableBeacon({address}).${abisWithZod.UpgradeableBeacon.owner.name}()`,
            tags: ["UpgradeableBeacon"],
        },
    })
    .input(abisWithZod.UpgradeableBeacon.owner.inputsZod.extend(ZodValidators.contractAddressZod.shape))
    .output(z.object({ result: abisWithZod.UpgradeableBeacon.owner.outputsZod }))
    .query(({ input }) => {
        return { result: { "": constants.AddressZero, 0: constants.AddressZero } };
    });

const postUpgradeableBeaconTransferOwnership = t.procedure
    .meta({
        openapi: {
            method: "POST" as const,
            path: `/{networkId}/abi/{address}/${abisWithZod.UpgradeableBeacon.transferOwnership.name}` as const,
            description: `UpgradeableBeacon({address}).${abisWithZod.UpgradeableBeacon.transferOwnership.name}()`,
            summary: `UpgradeableBeacon({address}).${abisWithZod.UpgradeableBeacon.transferOwnership.name}()`,
            tags: ["UpgradeableBeacon"],
        },
    })
    .input(abisWithZod.UpgradeableBeacon.transferOwnership.inputsZod.extend(ZodValidators.contractAddressZod.shape))
    .output(z.object({ result: abisWithZod.UpgradeableBeacon.transferOwnership.outputsZod }))
    .mutation(({ input }) => {
        return { result: {} };
    });
*/

/*
const postContractProcedure = t.procedure
.meta(postContractMeta)
.input(contractParameters.extend(networkIdParameter))
.output(contractOutput)
.mutation(({ input }) => {
    // TODO: deploy contract

    return {
        contractType: input.contractType,
        address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    };
});

*/
