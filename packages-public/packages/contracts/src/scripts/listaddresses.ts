import * as hre from "hardhat";

//List addresses with explorer
const CONTRACTS_VERIFY = [
    "Create2Factory",
    "ERC20Mintable",
    "ERC721Mintable",
    "ERC721MintableAutoId",
    "ERC1155Mintable",
    "ERC1820Registry",
    "ERC2981Setter",
    "TokenDna",
    "TokenURIBaseURI",
    "TokenURIDna",
    "SafeL2",
    "SafeProxyFactory",
    "SignMessageLib",
    "CreateCall",
    "MultiSend",
    "MultiSendCallOnly",
];
async function verify() {
    const deployments = await hre.deployments.all();
    for (const [k, v] of Object.entries(deployments)) {
        let name: string | undefined = k;
        if (k.endsWith("Implementation")) {
            name = k.replace("Implementation", "");
        } else {
            name = k;
        }

        if (!CONTRACTS_VERIFY.includes(name)) {
            name = undefined;
        }

        if (name) {
            console.debug(`${name} https://testnet.blastscan.io/address/${v.address}/contract/168587773/code`);
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
