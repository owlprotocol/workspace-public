# Chains
Owl Protocol chain configs.
Extends `viem` chain definitions with additional data and adds new chains.

## Getting Chain Info
There are multiple sources to find interesting chain integrations:
* [github.com/wevm/viem/tree/main/src/chains/definitions](https://github.com/wevm/viem/tree/main/src/chains/definitions): viem chain configs contain most core info
* [chainlist.org](https://chainlist.org/): Large database of chains. A frontend for [github.com/ethereum-lists/chains](https://github.com/ethereum-lists/chains)
* [drpc.org/chainlist](https://drpc.org/chainlist): Chains supported by dRPC
* [ankr.com/docs/rpc-service/chains/chains-list/](https://www.ankr.com/docs/rpc-service/chains/chains-list/): Chains supported by Ankr
* [thirdweb.com/chainlist](https://thirdweb.com/chainlist): Chains supported by ThirdWeb
* [docs.pimlico.io/bundler/reference/supported-chains](https://docs.pimlico.io/bundler/reference/supported-chains): Chains supported by Pimlico
* [rollup.wtf](https://rollup.wtf): A good source for ranking rollups based on activity
* [app.conduit.xyz/browse-networks](https://app.conduit.xyz/browse-networks): Conduit.xyz public chains
* [bundlebear.com/overview/all](https://www.bundlebear.com/overview/all): Is the chain ERC4337 ecosystem active?
* [superchain.eco/chains](https://www.superchain.eco/chains): Optimism Superchain Ecosystem chains. These are all Optimism Rollups, most of them on OPStack Bedrock version.
* [portal.arbitrum.io/orbit/ecosystem](https://portal.arbitrum.io/orbit/ecosystem): Arbitrum Orbit Ecosystem chains. These are all Arbitrum Orbit chains.

## Bridging Funds to Chains
Beyond just getting RPC info, getting funds onto the chain is also a requirement for launch. Once bridged, the only requirement is funding the **utility account** (varies between staging/production environments) which then manages distributing funds to necessary accounts (bundler, paymaster). You can use the following resources to get funds onto a chain:

### Native Bridging
These bridges are chain-specific. Often Third-party bridges can be faster and cheaper but **for testnets these are often the only option.**
* Testnet Faucets: If the chain is a testnet, funds can be acquired from a faucet or core team members (if need more)
* OPStack bridging: For OPStack chains, if the parent chain (eg. Ethereum, Base, Mode) utility account is well-funded, funding may not be needed as the Owl API can automatically bridge. Many rollups are anchored on Sepolia/Holesky for testnet. You can buy Sepolia/Holesky ETH in bulk at [sepoliaeth.com](https://www.sepoliaeth.com) or [holeskyeth.org](https://www.holeskyeth.org)
* [superbridge.app](https://superbridge.app/): Optimism Superchain Native Bridge
* [portal.polygon.technology/bridge](https://portal.polygon.technology/bridge): Polygon Native Bridge
* [opbnb-bridge.bnbchain.org](https://opbnb-bridge.bnbchain.org): OPBNB Native Bridge
* [pacific-bridge.manta.network/](https://pacific-bridge.manta.network): Manta Native Brige
* [bridge.metis.io](https://bridge.metis.io): Metis Native Bridge
* [bridge.mantle.xyz](https://bridge.mantle.xyz): Mantle Native Bridge
* [bridge.arbitrum.io](https://bridge.arbitrum.io): Arbitrum Native Bridge
* [bridge.linea.build](https://bridge.linea.build): Linea Native Bridge

### Third-Party Bridging
* [orbiter.finance](https://orbiter.finance/): Orbiter Finance is a fast and cheap bridge that supports many chains.
* [stargate.finance/bridge](https://stargate.finance/bridge): Stargate Bridge
* [app.debridge.finance/deswap](https://app.debridge.finance/deswap): DeBrige
* [portfolio.metamask.io/bridge](https://portfolio.metamask.io/bridge): Metamask Bridge
* Buy on centralized exchange: This should be the last resort when it is impossible to find any on-chain mechanism (eg. bridge) to get funds onto the chain.

## Firebase Chains Upload
To avoid the need to re-deploy services (eg. API, Dashboard), chain configurations are stored on Firebase as a way to dynamically update the data. Chains configs are stored under `network` for public configurations and `networkPrivate` for private server-side only configs that contain moderately sensitive information such as RPC API keys.

To upload chain data run the `uploadNetworks` script with the correct environment config.
```bash
npm run scripts:uploadNetworks # Local Firebase, usually not needed
NODE_ENV=staging npm run scripts:uploadNetworks # Staging
NODE_ENV=production npm run scripts:uploadNetworks # 🚨 Production 🚨
```

## Chain Integration Checklist
### Initial Research
* Is it EVM equivalent?
* Is it a particular rollup stack (OPStack, Arbitrum Orbit, ZKStack)?
* Is Arachnid Deployer (0x4e59b44847b379578588920ca78fbf26c0b4956c) deployed? If not, is EIP-155 (replay protection) enforced (must **NOT** be to allow deployment)?
* Is ERC4337 v0.7 deployed (0x0000000071727De22E5E9d8BAf0edAc6f37da032) ? This is more for informational purposes.
* Is there a viem config?
* Is there a private RPC provider (dRPC, Ankr, others)?

### Configuration
* Add chain config info
* If OPStack chain, add parent chain config
* Fund utility account or utility account on parent chain (if OPStack)

### Upload & QA
* Upload network config as "enabled" on staging Firebase
* Test out NFT deploy by running dashboard locally but with staging env (see README on dashboard)
* Upload  network config as "enabled" on production Firebase
* Test out NFT deploy on live production dashboard
