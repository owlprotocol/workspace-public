# Wallet Backend

[Bundler Client](https://viem.sh/account-abstraction/clients/bundler) and [Paymaster Client](https://viem.sh/account-abstraction/clients/paymaster) designed to work with [viem](https://viem.sh/) or as simple [EIP1193](https://eips.ethereum.org/EIPS/eip-1193) providers.

## Backend

While the backend implements "Client" interfaces, this only refers to the fact it connects to a blokchain RPC. The bundler & paymaster should only be run within the context of a NodeJS **backend service** that will act as a bundler or paymaster signer.
