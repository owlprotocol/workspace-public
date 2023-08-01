import type { Chain } from "../src/types.js";
export default {
  "name": "Filecoin - Local testnet",
  "chain": "FIL",
  "status": "incubating",
  "rpc": [],
  "faucets": [],
  "nativeCurrency": {
    "name": "testnet filecoin",
    "symbol": "tFIL",
    "decimals": 18
  },
  "infoURL": "https://filecoin.io",
  "shortName": "filecoin-local",
  "icon": {
    "url": "ipfs://QmS9r9XQkMHVomWcSBNDkKkz9n87h9bH9ssabeiKZtANoU",
    "width": 1000,
    "height": 1000,
    "format": "png"
  },
  "chainId": 31415926,
  "networkId": 31415926,
  "slip44": 1,
  "explorers": [],
  "testnet": true,
  "slug": "filecoin-local-testnet"
} as const satisfies Chain;