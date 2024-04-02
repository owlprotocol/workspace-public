export function logDeployment(
    networkName: string,
    contractName: string,
    address: string,
    deploymentType: "nicks" | "deterministic" | "implementation" | "proxy" | "beacon" | "beacon-proxy" | "example",
    status: "exists" | "deployed" | "failed" | "deploying",
) {
    const msg = `${networkName.padEnd(20)}\t${contractName.padEnd(30)}\t${deploymentType.padEnd(20)}\t${status.padEnd(
        10,
    )}\t${address}`;
    console.debug(msg);
}
