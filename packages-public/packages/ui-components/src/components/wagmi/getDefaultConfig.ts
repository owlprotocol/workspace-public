import { createConfig } from "@wagmi/core";
import { Chain, http } from "viem";
import { fromPairs } from "lodash-es";
import { OwlConnectorParameters, getConnector } from "./getConnector.js";

export type DefaultConfigParameters = {
    chains: Chain[];
} & OwlConnectorParameters;

export async function getDefaultConfig({
    chains,
    owlClerk,
    projectId,
}: DefaultConfigParameters) {
    const owlConnector = getConnector({ owlClerk, projectId });
    const transports = fromPairs(
        chains.map((c) => [c.id, http(c.rpcUrls.default.http[0])])
    );

    // @ts-expect-error chains expects readonly Chains[]
    return createConfig({ chains, connectors: [owlConnector], transports });
}
