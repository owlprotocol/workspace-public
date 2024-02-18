import type { Chain } from "../src/types.js";
export default {
  "name": "Blast Sepolia Testnet",
  "chain": "ETH",
  "rpc": ["https://sepolia.blast.io"],
  "faucets": ["https://faucet.quicknode.com/blast/sepolia"],
  "nativeCurrency": {
    "name": "Sepolia Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "infoURL": "https://blast.io/",
  "shortName": "blastsepolia",
  "chainId": 168587773,
  "networkId": 168587773,
  "explorers": [
    {
      "name": "Blast Sepolia Explorer",
      "url": "https://testnet.blastscan.io",
      "standard": "EIP3091"
    }
  ],
  "parent": {
    "type": "L2",
    "chain": "eip155-11155111"
  },
  "testnet": true,
  "slug": "blastsepolia"
} as const satisfies Chain;
