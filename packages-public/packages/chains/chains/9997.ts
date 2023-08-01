import type { Chain } from "../src/types.js";
export default {
  "name": "AltLayer Testnet",
  "chain": "ETH",
  "rpc": [
    "https://altlayer-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://testnet-rollup-api.altlayer.io"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "features": [
    {
      "name": "EIP155"
    },
    {
      "name": "EIP1559"
    }
  ],
  "infoURL": "https://altlayer.io",
  "shortName": "alt-testnet",
  "chainId": 9997,
  "networkId": 9997,
  "icon": {
    "url": "ipfs://QmcEfZJU7NMn9ycTAcEooQgGNfa2nYBToSUZHdFCFadcjb",
    "width": 1080,
    "height": 1025,
    "format": "png"
  },
  "explorers": [
    {
      "name": "blockscout",
      "url": "https://testnet-rollup-explorer.altlayer.io",
      "icon": {
        "url": "ipfs://QmYtUimyqHkkFxYdbXXRbUqNg2VLPUg6Uu2C2nmFWowiZM",
        "width": 551,
        "height": 540,
        "format": "png"
      },
      "standard": "EIP3091"
    }
  ],
  "testnet": true,
  "slug": "altlayer-testnet"
} as const satisfies Chain;