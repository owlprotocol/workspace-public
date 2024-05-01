# Owl Protocol Docs
Owl Protocol Docs built with [nextra.site](https://nextra.site/)
For an example advanced config, see [github.com/shuding/nextra/tree/main/docs/pages](https://github.com/shuding/nextra/tree/main/docs/pages)

## General Structure
The [docs.owl.build] website hosts Owl Protocol's documentation.
The website is currently dived in 3 sections
* Home: Landing Page
* Guides: Main Docs
* About: Additional Folder

### Home
Home page for Owl Protocol docs. Highlight's products and guides by use case.

### Guides
*The first thing a user wants to see, how to get their use case working step by step. Not reading in-depth references.*
Guides should be tagged by 3-4 features with little "pills".
* Use Case: Gaming, Ticketing, DeFi
* Language: No-Code, Solidity, Typescript, React, API (use mini logos)
* Complexity: Easy, Medium, Advanced
* Integrations: Zapier
* Smart Contract Standards: ERC20, ERC721, ERC1155, ERC4337, ERC2535

Get started on your use case now. From first-time user, to advanced developer.
[] Quickstart: Mint your Free Developer Pass (No-code, First time user)
[] Launch an Eventbrite NFT Ticket (Ticketing, No-code, Easy, Zapier)
[] Mint in-game assets via REST APIs (Gaming, Typescript, API, Medium)
[] Use **owl.build** with custom EVM rollups (No-code, Advanced)

*TODO: When wallet components ready*
[] Onboard users with Google Login and gasless transactions (Wallet, React, Medium)

*TODO: Future Guides*
[] Track Github contributions on-chain (Low-code, Easy, Zapier)
[] Bridge Tokens & NFTs (Typescript, API, Advanced, OPStack)
[] Deploy a Uniswap Liquidity Pool (Typescript, API, Advanced, OPStack)
[] Deploy Frames (Typescript, API, Advanced, Farcaster)

### Dashboard
The **owl.build** is your collaborative web3 workspace, helping you launch smart contracts, manage wallets and view analytics on your project.

### Wallet
Wallet Docs for devs looking to use various wallet solutions.
* UI Components
* In-App Wallet
* Developer Wallet: Server-side wallets for automations, no private keys or crypto required.
* Smart Wallet (Account Abstraction): Leverage ERC4337 to onboard users seamlessly without needing crypto
* ERC4337 Bundler: Advanced low-level APIs for using gasless transactions with third-party wallet solutions (eg. Thirdweb)

### SDKs
Owl Protocol offers 3 ways to deploy & manage smart contracts.
* Typescript SDK: recommended for **server-side** automations that leverage our **Developer Wallets** (TODO: link to docs) to deploy & manage smart contracts
* React SDK: recommended for building **frontend** apps using React. Includes pre-built customizable UI components for rendering wallets, tokens, NFTs and more.
* REST API: recommended for developers that wish to use our **Developer Wallets** (TODO: link to docs)with **any programming language** to deploy & manage smart contracts

#### Typescript
*TODO: Refactor TRPC Client as an SDK in future*
* TRPC
* Viem Client

#### React
*TODO: Refactor TRPC React Client as an SDK in future*

* Viem
#### REST APIs

### Integrations
Web2 integrations powered by **owl.build** Zapier App.
* Mint ERC721

### Contracts
For advanced users that wish to learn more about EIP2535 (Diamond Standard) and extending **owl.build** upgradeable contracts.
* ERC2535
* ERC20
* ERC721
* ERC1155
* ERC4337

### About

### Networks
TODO: Render all supported networks.
