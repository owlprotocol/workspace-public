# OWL Protocol Contracts

This repository contains all Owl Protocol Smart production smart contracts.
## What is it?
We're developing plug-and-play smart contracts and libraries to make it easier for developers and creators to focus on what they do best: **making great games and content**.

With [our platform](https://owlprotocol.xyz), you can easily deploy contracts which implement complex functionality like item crafting and breeding.

## TLDR
Comprehensive documentation [can be found here](https://owlprotocol.github.io/contracts/docs).

See [contracts](./contracts) for more info on using the smart contracts.

## Deploy Contracts
1. Make sure your RPC is on [chainlist.org/](https://chainlist.org/) and was added to `@owlprotocol/chains`
2. Check `0x6efA2F40d59e3DA02e56Ff5a1daB6201b86f8aCF` has enough ETH on the network
3. Check RPC connection supports high enough req/s
3. Set `PRIVATE_KEY_CONTRACT_DEPLOYER` in `.env`
4. Switch to cjs `npm run to:commonjs`
5. Deploy Create2Factory    `hh deploy --tags Create2Factory --network <networkId>`
6. Deploy Implementations   `hh deploy --tags Implementations --network <networkId>`

## Verify Contracts
1. Edit `CONTRACTS_VERIFY` in `src/scripts/verify.ts`
2. Set `NETWORK_EXPLORER_API_KEY` in `.env`
3. Update `genEnvvars` defaults, `chainIds`
2. Run script to verify all contracts `hh run src/scripts/verify.ts --network <networkId>`

## Deploy TRPC API
1. Fund `PRIVATE_KEY_RELAYER`
2. Update default user creation (networkId: native etc...)


## Architecture

We use an advanced system of proxies in order to optimize for low-gas deployments and easily-upgradeable contracts. This comes at the cost of a small uptick in gas used per transaction.

See [OWLArchitecture](OWLArchitecture.svg) for more info on what's going on under the hood.

## Development
See [contract-structure.md](../docs/docs-contracts/advanced/contract-structure.md) for more info.

## Roles
```
DEFAULT_ADMIN_ROLE              #Admin
CONTRACT_URI_ROLE               #Set contract uri
APPROVED_FOR_ALL_ROLE           #Approve all transfers (god-mode)
MINTER_ROLE                     #Mint token
REQUEST_ROLE                    #Request Chainlink
WITHDRAW_ROLE                   #Withdraw tokens
FULFILL_ROLE                    #Fulfill Chainlink request
DEPOSIT_ROLE                    #Deposit to asset router
ROYALTY_ROLE                    #Set royalty
TOKEN_ROYALTY_PROVIDER_ROLE     #Set royalty provider address
TOKEN_DNA_ROLE                  #Set dna
TOKEN_DNA_PROVIDER_ROLE         #Set dna provider address
TOKEN_URI_ROLE                  #Set uri (for TokenURI contract)
TOKEN_URI_BASE_URI_ROLE         #Set base uri (for TokenURIBaseURI and TokenURIDna)
TOKEN_URI_PROVIDER_ROLE         #Set uri provider address
TOKEN_ROLE                      #Set token address
```
