# Indexer Backend

[Public Client](https://viem.sh/docs/clients/public.html) designed to work with [viem](https://viem.sh/) or as a simple [EIP1193](https://eips.ethereum.org/EIPS/eip-1193) provider and index data on Firebase.

Created by adding middleware to common RPC operations like `eth_getBlock` or `eth_getTransactionReceipt` and interacting with Firebase.

## Backend

While the backend implements "Client" interfaces, this only refers to the fact it connects to a blokchain RPC.
This should only be run within the context of a NodeJS **backend service** connected to Firebase using the admin sdk.
