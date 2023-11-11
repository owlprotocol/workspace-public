# Web3 Database
Database of web3 data for common metadata & decoding abis.
The goal is to have a small subset of this data for local testing, and be able to generate the full db in production.

Includes data from:
* [@owlprotocol/contracts](../contracts): Event & Function abi information
* [ethereum-lists/4bytes](https://github.com/ethereum-lists/4bytes): List of 3byte indentifiers for EVM smart contract functinos (production only)
* [otterscan/topic0](https://github.com/otterscan/topic0): Ethereum event log signatures database (production only)
* [viaprotocol/tokenlists](https://github.com/viaprotocol/tokenlists): Token Lists database (production only)
