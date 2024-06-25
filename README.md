[//]: # "Links"
[MIT License]: https://mit-license.org/
[Apache-2]: https://www.apache.org/licenses/LICENSE-2.0.html

[//]: # "EIPS"
[eip-20]: https://eips.ethereum.org/EIPS/eip-20
[eip-721]: https://eips.ethereum.org/EIPS/eip-721
[eip-1155]: https://eips.ethereum.org/EIPS/eip-1155
[eip-155]: https://eips.ethereum.org/EIPS/eip-155
[eip-165]: https://eips.ethereum.org/EIPS/eip-165
[eip-1820]: https://eips.ethereum.org/EIPS/eip-1820
[eip-1014]: https://eips.ethereum.org/EIPS/eip-1014
[eip-2470]: https://eips.ethereum.org/EIPS/eip-2470
[eip-1167]: https://eips.ethereum.org/EIPS/eip-1167
[eip-2535]: https://eips.ethereum.org/EIPS/eip-2535
[eip-4337]: https://eips.ethereum.org/EIPS/eip-4337

[//]: # "Libraries"
[dotenv]: https://github.com/motdotla/dotenv
[dotenv-vault]: https://github.com/dotenv-org/dotenv-vault
[dfns]: https://www.dfns.co/
[turbo]: https://turbo.build/
[changesets]: https://github.com/changesets/changesets
[pnpm]: https://pnpm.io/
[nvm]: https://github.com/nvm-sh/nvm
[zod]: https://zod.dev
[viem]: https://viem.sh
[firebase]: https://firebase.google.com/

[//]: # "Github"
[leo vigna]: https://github.com/leovigna
[clarence liu]: https://github.com/ClarenceL
[oscar baracos]: https://github.com/OscBacon
[anna kazannik]: https://github.com/annkaz
[kevin elsayed]: https://github.com/tota79

[//]: # "Configs"
[envvars]: ./configs/envvars
[envvars-npm]: https://img.shields.io/npm/v/@owlprotocol/envvars.svg
[esbuild-config]: ./configs/esbuild-config
[esbuild-config-npm]: https://img.shields.io/npm/v/@owlprotocol/esbuild-config.svg
[eslint-config]: ./configs/eslint-config
[eslint-config-npm]: https://img.shields.io/npm/v/@owlprotocol/eslint-config.svg
[tsconfig]: ./configs/tsconfig
[tsconfig-npm]: https://img.shields.io/npm/v/@owlprotocol/tsconfig.svg
[vite-config]: ./configs/vite-config
[vite-config-npm]: https://img.shields.io/npm/v/@owlprotocol/vite-config.svg

[//]: # "Docs"
[docs]: ./docs

[//]: # "Utils"
[chains]: ./packages/chains
[chains-npm]: https://img.shields.io/npm/v/@owlprotocol/chains.svg
[utils]: ./packages/utils
[utils-npm]: https://img.shields.io/npm/v/@owlprotocol/utils.svg
[viem-utils]: ./packages/viem-utils
[viem-utils-npm]: https://img.shields.io/npm/v/@owlprotocol/viem-utils.svg
[zod-sol]: ./packages/zod-sol
[zod-sol-npm]: https://img.shields.io/npm/v/@owlprotocol/zod-sol.svg
[dfns-sdk-mock]: ./packages/dnfs-sdk-mock
[dfns-sdk-mock-npm]: https://img.shields.io/npm/v/@owlprotocol/dfns-sdk-mock.svg

[//]: # "Contracts"
[contracts-account-abstraction]: ./packages/contracts-account-abstraction
[contracts-account-abstraction-npm]: https://img.shields.io/npm/v/@owlprotocol/contracts-account-abstraction.svg
[contracts-create2factory]: ./packages/contracts-create2factory
[contracts-create2factory-npm]: https://img.shields.io/npm/v/@owlprotocol/contracts-create2factory.svg
[contracts-diamond]: ./packages/contracts-diamond
[contracts-diamond-npm]: https://img.shields.io/npm/v/@owlprotocol/contracts-diamond.svg

[//]: # "Firebase"
[core-firebase]: ./packages/core-firebase
[core-firebase-npm]: https://img.shields.io/npm/v/@owlprotocol/core-firebase.svg
[crud-firebase]: ./packages/crud-firebase
[crud-firebase-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-firebase.svg
[eth-firebase]: ./packages/eth-firebase
[eth-firebase-npm]: https://img.shields.io/npm/v/@owlprotocol/eth-firebase.svg

# Owl Protocol

Modular APIs for Web3, Smart Wallets, and Dynamic Smart Contracts

## TL;DR

```bash
git clone git@github.com:owlprotocol/workspace-public.git && cd workspace-public
pnpm install
pnpm run build
pnpm run test
```

## Docs
Visit our docs at [docs.owl.build](https://docs.owl.build) for in-depth tutorials on using Smart Wallets & Modular Smart Contracts. Contribute to our docs by adding content to [docs](./docs/)

## Packages
### Typescript
General Web3 Typescript packages built by Owl Protocol.

| Package                                               | Version                               | Description                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------|
| [chains]                                              | ![chains-npm]                         | Chain configurations                                                                                                                              |
| [zod-sol]                                             | ![zod-sol-npm]                        | [zod] validators for Solidity types (eg. `address, uint256`) and Ethereum structs (eg. `Block, Transaction`)                                      |

### Smart Contracts
Smart Contract Libraries built and used by Owl Protocol.

| Package                                               | Version                               | Description                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------|
| [contracts-diamond]                                   | ![contracts-diamond-npm]              | Modular upgradeable smart contract library. Uses [EIP-2535] Diamond Standard to implement popular standards such as [EIP-20]/[EIP-721]/[EIP-1155] |
| [contracts-create2factory]                            | ![contracts-create2factory-npm]       | Deterministic deployment factory similar to [Arachnid](https://github.com/Arachnid/deterministic-deployment-proxy) but designed to work with initializable contracts and batch deployments.   |
| [contracts-account-abstraction]                       | ![contracts-account-abstraction-npm]  | [EIP-4337] Contracts from [eth-infinitism/account-abstraction](https://github.com/eth-infinitism/account-abstraction) and [pimlicolabs/alto](https://github.com/pimlicolabs/alto) but with re-exported artifacts for easier use in Typescript.    |

### Firebase
[Firebase] is used extensively by Owl Protocol as a simple NoSQL storage layer for web3 indexing & non-web3 platform data.

| Package                                               | Version                               | Description                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------|
| [eth-firebase]                                        | ![eth-firebase-npm]                   | Owl Protocol Firebase data models for web3 data such as indexing or chain configurations                                                          |
| [core-firebase]                                       | ![core-firebase-npm]                  | Owl Protocol Firebase data models for non-web3 data such as web2 integrations                                                                     |
| [crud-firebase]                                       | ![crud-firebase-npm]                  | Generic Firebase SDK helpers for usage with firebase web & admin SDKs.                                                                            |

### Other
Other packages used by Owl Protocol.

| Package                                               | Version                               | Description                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------|
| **Other**                                             |                                       |                                                                                                                                 |
| [viem-utils]                                          | ![viem-utils-npm]                     | [viem] helper utils                                                        |
| [utils]                                               | ![utils-npm]                     |                                                         |
| [dfns-sdk-mock]                                       | ![dfns-sdk-mock-npm]                     | Mock DFNS SDK for testing                                                         |

## LICENSE
MIT License
