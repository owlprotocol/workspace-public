# Chains
Owl Protocol chain configs.
Extends `viem` chain definitions with additional data and adds new chains.

## Firebase Chains Upload
To avoid the need to re-deploy services (eg. API, Dashboard), chain configurations are stored on Firebase as a way to dynamically update the data. Chains configs are stored under `network` for public configurations and `networkPrivate` for private server-side only configs that contain moderately sensitive information such as RPC API keys.

To upload chain data run the `uploadNetworks` script with the correct environment config.
```bash
npm run scripts:uploadNetworks # Local Firebase, usually not needed
NODE_ENV=staging npm run scripts:uploadNetworks # Staging
NODE_ENV=production npm run scripts:uploadNetworks # 🚨 Production 🚨
```
