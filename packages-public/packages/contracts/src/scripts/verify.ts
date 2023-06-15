import hre from "hardhat";

async function verify() {
    const deployments = await hre.deployments.all();

    for (const [k, v] of Object.entries(deployments)) {
        if (
            k.endsWith("Implementation") &&
            k != "ERC721TopDownDnaImplementation" &&
            k != "ERC721TopDownDnaMintableImplementation" &&
            k != "ERC721TopDownMintableAutoIdImplementation" &&
            k != "ERC721TopDownMintableImplementation"
        ) {
            const name = k.replace("Implementation", "");
            const artifact = await hre.artifacts.readArtifact(name);
            const fqn = `${artifact.sourceName}:${name}`;

            console.debug(`Verifying ${name} at ${v.address}`);
            await hre.run("verify:verify", {
                address: v.address,
                constructorArguments: [],
                contract: fqn,
                /*
                libraries: {
                    ERC721TopDownDnaLib: deployments["ERC721TopDownDnaLibImplementation"].address,
                    ERC721TopDownLib: deployments["ERC721TopDownLibImplementation"].address,
                }
                */
            });
        }
    }
}

async function main() {
    await verify();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
