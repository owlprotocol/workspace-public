import { PublicClient, Address } from "viem";
import {
    WNativeToken as getWethAbi,
    factory as getFactoryAbi,
    poolDeployer as getPoolDeployerAbi,
} from "./artifacts/SwapRouter.js";
import { POOL_INIT_CODE_HASH as getPoolInitCodeHashAbi } from "./artifacts/IAlgebraFactory.js";

/** Get constants from SwapRouter contract */
export interface GetAlgebraSwapRouterConstantParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral swap router address */
    swapRouter: Address;
}

/**
 * Get Algebra constants for `swapRouter`
 * @param params publicClient, swapRouter
 * @returns `weth`, `poolDeployer`, `factory`
 */
export async function getAlgebraSwapRouterConstants(params: GetAlgebraSwapRouterConstantParams) {
    const [weth, poolDeployer, factory] = await Promise.all([
        getAlgebraWeth(params),
        getAlgebraPoolDeployer(params),
        getAlgebraFactory(params),
    ]);

    return { weth, poolDeployer, factory };
}

/**
 * Get Algebra `weth` constant for `swapRouter`
 * @param params publicClient, swapRouter
 * @returns address
 */
export function getAlgebraWeth(params: GetAlgebraSwapRouterConstantParams): Promise<Address> {
    const { publicClient, swapRouter } = params;

    return publicClient.readContract({
        address: swapRouter,
        abi: [getWethAbi],
        functionName: "WNativeToken",
    });
}

/**
 * Get Algebra `poolDeployer` constant for `swapRouter`
 * @param params publicClient, swapRouter
 * @returns address
 */
export function getAlgebraPoolDeployer(params: GetAlgebraSwapRouterConstantParams): Promise<Address> {
    const { publicClient, swapRouter } = params;

    return publicClient.readContract({
        address: swapRouter,
        abi: [getPoolDeployerAbi],
        functionName: "poolDeployer",
    });
}

/**
 * Get Algebra `factory` constant for `swapRouter`
 * @param params publicClient, swapRouter
 * @returns address
 */
export function getAlgebraFactory(params: GetAlgebraSwapRouterConstantParams): Promise<Address> {
    const { publicClient, swapRouter } = params;

    return publicClient.readContract({
        address: swapRouter,
        abi: [getFactoryAbi],
        functionName: "factory",
    });
}

/** Get constants from Factory contract */
export interface GetAlgebraFactoryConstantParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral factory address */
    factory: Address;
}
/**
 * Get Algebra `factory` constant for `swapRouter`
 * @param params publicClient, swapRouter
 * @returns address
 */
export function getAlgebraPoolInitCodeHash(params: GetAlgebraFactoryConstantParams): Promise<Address> {
    const { publicClient, factory } = params;

    return publicClient.readContract({
        address: factory,
        abi: [getPoolInitCodeHashAbi],
        functionName: "POOL_INIT_CODE_HASH",
    });
}
