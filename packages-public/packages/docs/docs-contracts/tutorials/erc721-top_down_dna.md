---
sidebar_position: 3
sidebar_label: 'NFT Image Layers with DNA'
slug: '/tutorial-topdowndna'
---

import { SimpleGrid } from '@chakra-ui/react'

# DNA Encoding - ERC721TopDownDna

## Tutorial

The [ERC721TopDownDna.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownDna.sol) smart contract combines two of our primary features:

1. **TopDown** ([ERC721TopDownBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownBase.sol))
    * Allows an NFT to own other NFTs on-chain
    * Exposes all owned NFT data to their owner
2. **DNA** ([ERC721DnaBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721DnaBase.sol))
    * Allows a standard encoding of NFTs on-chain using an off-chain schema

## Use Case: PFPs with Detachable Accessories or Equipment

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={10}>
<Box>
    <div>
    <img src="/img/tutorial/attached.png"/>
    <p>NFT with Hat</p>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/detached.png"/>
    <p>NFT with Hat <strong>Removed</strong></p>
    </div>
</Box>
</SimpleGrid>

In this tutorial, we will create a Dynamic PFP ([Profile Picture NFT](https://learn.bybit.com/nft/nft-pfps-profile-pictures/)).

- **The hat is its own NFT**: it can be detached and re-attached to the main NFT.
- When you attach the hat, the PFP will show the hat.
- When you remove the hat, it can be tradeable with other hats or sold.
- The on-chain data, and JSON Schema is all that is required to render the NFT graphics.

<!-- TODO @ClarenceL: a quick getting started step -->
:::caution
Ensure you're able to build the entire project before starting: see [Getting Started](/contracts/getting-started/).
:::

---

<!-- TODO: look over this -->
## Step 1: Prepare the layers

:::info
The sample will have a small number of layers for each `trait`:

> These **MUST** be transparent PNGs, which will be combined, therefore the positioning must be taken into account.

> You **MUST** upload these images to ideally IPFS, but an accessible image host works as well.
:::

### Background

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
<Box>
    <div>
    <img src="/img/tutorial/bg-dunes.png"/>
    <br/>
    <strong>Dunes</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/bg-downtown.png"/>
    <br/>
    <strong>Downtown</strong>
    </div>
</Box>
</SimpleGrid>

**And no background at all.**

### Body

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
<Box>
    <div>
    <img src="/img/tutorial/body-base.png"/>
    <br/>
    <strong>Common</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/body-albino.png"/>
    <br/>
    <strong>Albino</strong>
    </div>
</Box>
</SimpleGrid>

### Hats (Detachable Accessory)

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
<Box>
    <div>
    <img src="/img/tutorial/hats-cap.png"/>
    <br/>
    <strong>Regular Cap</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/hats-beanie.png"/>
    <br/>
    <strong>Beanie</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/hats-beret.png"/>
    <br/>
    <strong>Beret</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/hats-cowboy.png"/>
    <br/>
    <strong>Cowboy Hat</strong>
    </div>
</Box>
</SimpleGrid>

We'll also encode into the DNA/on-chain data of the NFT an `enum` **Vibe**, which has 3 values:
- Chill
- Boring
- Eccentric

---
<!-- TODO: look over this -->

## Step 2: Setup the project and declare the traits in JavaScript

We will be using the [CLI Tool](/contracts/getting-started/cli) for this, so firstly
under `packages/cli/src/projects` we will need to create a folder for the project called `example-omo`.
```
.
└── packages/
    ├── cli/
    │   └── src/
    │       ├── classes
    │       ├── commands
    │       ├── deploy
    │       ├── projects/
    │       │   └── example-omo
    │       ├── types
    │       └── utils
    ├── contracts
    └── [...]
```

For the `traits` in this example we'll use the `nft-sdk` to instantiate the [NFTGenerativeCollectionClass](https://github.com/owlprotocol/owlprotocol/blob/main/packages/nft-sdk/src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.ts) and use the CLI
tool to generate the **JSON Schema**, which is uploaded to IPFS.

> The `nft-sdk` needs this JSON Schema to translate the binary on-chain data (DNA).

`packages/cli/src/projects/example-omo/traits.ts`

Traits are first instantiated as [NFTGenerativeTraits](https://github.com/owlprotocol/owlprotocol/tree/main/packages/nft-sdk/src/classes/NFTGenerativeTrait), then added
to the `NFTGenerativeCollection`.

```typescript
import { NFTGenerativeTraitEnum, NFTGenerativeTraitImage } from '@owlprotocol/nft-sdk';

export const traitEnumVibe: NFTGenerativeTraitEnum = {
    name: 'Vibe',
    type: 'enum',
    options: ['Chill', 'Boring', 'Eccentric'],
    probabilities: [70, 20, 10],
};

export const traitImageBg: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'None',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Dunes',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-dunes.png',
        },
        {
            value: 'Downtown',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-downtown.png',
        },
    ],
    probabilities: [1, 5, 5],
};

[...]
```
See: [/packages/cli/src/projects/example-omo/traits.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/src/projects/example-omo/traits.ts)

:::info
`probabilities` are normalized, correspond in order with the values, and there must be as many probabilities as values.
:::

:::caution About IPFS Hashes for Images

You need to manually upload images to IPFS, and add the `image_url` as `ipfs://[hash]/[path]`.

The `ipfs://` will be replaced by the environemnt variable `IPFS_GATEWAY` that used by our provided API, so you don't need to be concerned about that.

We'll have more tools and a UI for uploading to IPFS soon.

:::

---
<!-- TODO: look over this -->

## Step 3: Create the `collection.ts` that connects the traits and collection:

```typescript
import {
    traitEnumVibe,
    traitImageBg,
    traitImageBody,
    traitImageHats
} from './traits.js';

import {
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '@owlprotocol/nft-sdk';

const collHatsChildDef: NFTGenerativeCollection = {
    name: 'Tutorial Example - NFT Hats Sub-Collection',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
    seller_fee_basis_points: 5000,
    fee_recipient: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    generatedImageType: 'png',
    traits: {
        Hats: traitImageHats,
    },
};

const collNestedDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Collection',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
    seller_fee_basis_points: 10000,
    fee_recipient: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    generatedImageType: 'png',
    traits: {
        Vibe: traitEnumVibe,
        Background: traitImageBg,
        Body: traitImageBody,
    },
    //@ts-ignore
    children: {
        Hats: collHatsChildDef,
    },
};

export const collHatsChild = NFTGenerativeCollectionClass.fromData(collHatsChildDef) as NFTGenerativeCollectionClass<{
    Hat: NFTGenerativeTraitImageClass;
}>;

export const collExample = NFTGenerativeCollectionClass.fromData(collNestedDef) as NFTGenerativeCollectionClass<
    {
        Vibe: NFTGenerativeTraitEnumClass;
        Background: NFTGenerativeTraitImageClass;
        Body: NFTGenerativeTraitImageClass;
    },
    {
        Hat: NFTGenerativeCollectionClass<{
            Hats: NFTGenerativeTraitImageClass;
        }>;
    }
>;

export default collExample;
```

:::caution
For now the trait key must be the same as the trait name.

e.g. `traitImageBg` has the field name as `Background` capitalized, and therefore `collExample` also declares its trait as `Background`.
:::

See: [/packages/cli/projects/example-omo/collection.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/projects/example-omo/collection.ts)

---

## Step 4: Generate the JSON Schema

The **JSON Schema** is used to interpret and translate the on-chain DNAto data that can be rendered or executed.

> We believe storing the on-chain data in a single binary encoded format is ideal because it minimizes the number of esoteric methods on the smart contract. Rather we leave it up to the client to interpret and parse the schema.

:::info
This is not to confused with the **Metadata JSON**, which is what NFT Marketplaces use to describe the NFT.
:::

### Using the CLI to Generate the JSON Schema

1. First make sure you have a `.env.development` file, for this step it's fine to just copy the included `.env.example` file.

```
cp .env.example .env.development
```

2. Then build the CLI package, to generate the JS files we execute.

```
pnpm run build
```

3. Now call the `generateJsonSchema` command on the CLI Tool. We're building the index JS file to `lib/esm/index.js` for now (this will be changed to dist soon).

```
node dist/index.cjs generateJsonSchema collections.js --projectFolder=projects/example-omo
```

Which should output:

```
getProjectSubfolder ~/owl_protocol/owlprotocol/packages/cli/projects/example-omo/output
Creating JSON(s) for collections.js to folder: ~/owl_protocol/owlprotocol/packages/cli/projects/example-omo/output
projects/example-omo collections.js
Done
```

> Ignore any warnings for `duplicate definition`.

Now you should see a new folder in `projects/example-omo` called `output`, and with two JSON files:
- collection-parent.json
- collection-child-Hats.json

---

## Step 5: Upload the JSON Schemas to IPFS

We use [Pinata](https://www.pinata.cloud/) for this tutorial, but you can upload the schema to any IPFS provider including your own.

:::info
We have 2 collections here: the main NFT collection and the hat collection.
When we mint the NFT from the parent collection, the hat NFT also automatically gets minted, and it gets attached to the newly-minted parent NFT.
:::

For this tutorial you can see the uploaded schemas there:
- [collection-parent.json](https://leovigna.mypinata.cloud/ipfs/QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq)
- [collection-child-Hats.json](https://leovigna.mypinata.cloud/ipfs/QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf)

:::info
Keep the IPFS hashes handy. In this example, they are:
- Parent hash: `QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq`
- Hats hash: `QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf`
:::

---

## Step 6: Generate a few NFTs

To generate NFTs, use the CLI command: `generateRandomNFT`:

```
node dist/index.cjs generateRandomNFT collections.js 3 --project=projects/example-omo
```

This will generate 3 items in the subfolder `output/items` of the project folder with their respective DNAs.

We then pass these outputs to the `deployTopDown` command to deploy these NFTs.

:::info
See `createFromFullDna` in [NFTGenerativeCollectionClass](https://github.com/owlprotocol/owlprotocol/blob/main/packages/nft-sdk/src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.ts) for more infromation on how an NFT is instantiated form its DNA.
:::

---

## Step 7: Declare collection information in the metadata file

Create a file called `owlproject.json` in the project folder. This will contain metadata about the collection.

### `owlproject.json`
```json
{
  "rootContract": {
    "tokenSymbol": "ExampleOmoNFT",
    "tokenIdStart": 1,
    "cfg": {
      "jsonSchemaEndpoint": "https://leovigna.mypinata.cloud/ipfs",
      "sdkApiEndpoint": "https://metadata.owlprotocol.xyz",
      "apiPath": "metadata/getMetadata",
      "jsonSchemaIpfs": "QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq"
    }
  },
  "children": {
    "Hats": {
      "tokenIdStart": 1,
      "cfg": {
        "jsonSchemaIpfs": "QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf"
      }
    }
  }
}
```

:::caution
You should not rely on our API and IPFS endpoints as they are centralized.

Ideally, `sdkApiEndpoint` should point to your own web app. For this tutorial, leave it as is.
:::

### Important
- You need a working IPFS endpoint. We recommend using [Pinata](https://pinata.cloud/)
- Do not change `sdkApiEndpoint`, this is the fallback API for browsers/clients that do not support the `nft-sdk`
- Replace the `schemaJsonIpfs` for the parent and children according to the **JSON Schema** from earlier, this is misnamed at the moment.

---

## Step 8: Deploy and mint NFTs

:::tip
For initial testing, prefer a local blockchain over a testnet. A local blockchain like Ganache is simpler and faster.
:::

1. Make sure you have a `.env.development` file. It should contain two values: `NETWORK`, and `HD_WALLET_MNEMONIC`.

### `.env.development`
```bash
NETWORK=ganache
HD_WALLET_MNEMONIC=test test test test test test test test test test test junk
```

2. Start a local Ganache blockchain (see [Ganache quickstart](https://trufflesuite.com/docs/ganache/quickstart/). Use the `--wallet.mnemonic` flag to force the same mnemonic as in your `.env.development` file:
```bash
ganache --wallet.mnemonic "test test test test test test test test test test test junk"
```

:::caution
Do not use this mnemonic for production!
:::

3. Double check to ensure that the `accounts` in the CLI config (`cli/config/default.json`) match the first two accounts shown by `ganache`, and that `NETWORK` is set to `ganache`.

:::tip Using a Private Key
We also support using a single **private key**.

To use a private key, **do not set** `HD_WALLET_MNEMONIC` and instead declare the environment variable `PRIVATE_KEY_0` in `.env.development`.
:::

### Deploy Common

If you are deploying to a new chain, or a fresh ganache blockchain, the common [beacon proxies](https://docs.owlprotocol.xyz/contracts/advanced/contract-deployment#beacon-proxy) and implementations need to be deployed first.

We enable this by passing `--deployCommon=true` into the deployment command. Don't worry if you forget to remove this flag later. Our deployer always deploys the beacons to the same addresses. Therefore, the deployer will skip deploying beacons if they already exist.

<!-- TODO: make this make sense
:::info
Owl Protocol uses advanced smart contract beacons including:
- **Deterministic Deployment** - giving us the same addresses for registries and implementations across multiple blockchains.
- **Beacon Proxies** - minimal additional overhead on initial deployment, but all subsequent NFT contracts are just proxies and lower gas.
- **Upgradeable Proxies** - revokable upgradability allows new projects to upgrade to new Dynamic NFT features as we roll them out, or revoke it to suit their needs.

Docs are coming soon that explain this in depth, for now you can follow the deployment strategies here: [deployCommon.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/src/commands/deployCommon.ts)
:::
-->

### Deploy contracts and mint NFTs

If everything is set up properly, you can now run:

```
node dist/index.cjs deployTopDown --projectFolder=projects/example-omo --deployCommon=true --debug=true
```

:::note
This will deploy and mint all NFT JSONs in the project's `/output/items` folder.
:::

At this point make sure you have the following:
- A JSON Schema uploaded to IPFS, and the corresponding IPFS hash in the `owlproject.json` file.
- The network configured properly in `.env.development` file and `cli/config/default.json`.
- JSON files of the NFTs you will mint in `output/items`.

If the command succeeds you should see an output similar to:
```
Minted /Users/clarencel/owl_protocol/owlprotocol/packages/cli/src/projects/example-omo/output/items/collection-item-1.json
Mint: Hats at 0x91a4Df19DE444cDA86ef24f61A6190838Cec2b22 - tokenId: 1 & dna: 0x00
Mint: root at 0xe3f62b8f72E49e75081B991685AeA19dd783b44a - tokenId: 1 & dna: 0x000101
```

Also the NFT item JSON files will be updated to track the deployment:

```json
{
  "fullDna": "0x00000000000000...",
  "children": {
    "Hats": {
      "fullDna": "0x000000000000..."
    }
  },
  "deployments": {
    "ganache": {
      "root": {
        "contractAddress": "0xe3f62b8f72E49e75081B991685AeA19dd783b44a",
        "tokenId": 1
      },
      "children": {
        "Hats": {
          "key": "Hats",
          "contractAddress": "0x91a4Df19DE444cDA86ef24f61A6190838Cec2b22",
          "tokenId": 1,
          "dna": "0x00"
        }
      }
    }
  }
}
```

---

## Step 9: View and check the NFTs

You can use the `viewTopDown` command on the CLI to quickly view the NFT:

```bash
node dist/index.cjs viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a --tokenId=1
```

The output should be similar to this:
```
View ERC721TopDownDna 0xe3f62b8f72E49e75081B991685AeA19dd783b44a on ganache
Fetching Metadata JSON Schema from: https:/leovigna.mypinata.cloud/ipfs/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9
```

And the following object:
```javascript
{
  Body: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/body-albino.png'
  },
  Background: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-downtown.png'
  },
  Vibe: 'Chill'
}
Hats {
  Hats: {
    value: 'Beanie',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/hats-beanie.png'
  }
}
```

### View the rendered NFT PFP

<!-- Confusing -->
Typically your app should use the `nft-sdk`, instantiate the collection class from the JSON Schema, and read the NFT's DNA to render the NFT.

To do this, we call the `viewTopDown` command again, but with the `--debug` option.

This will call the NFT contract's `tokenURI` method, which is that a NFT Marketplace that does not support the `nft-sdk`
would typically call.

```bash
node dist/index.cjs viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a --tokenId=1 --debug
```

The output at the end shows:

```
tokenUri http://metadata.owlprotocol.xyz:32001/metadata/getMetadata/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
fullDna 0x0000000000000...
```

:::info
This `tokenUri` is never seen by users, so its complexity is not an issue.
:::

`curl` the `tokenURI` URL:

```bash
curl -s https://metadata.owlprotocol.xyz/metadata/getMetadata/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

You should get the following JSON:
```json
{
  "description": "Example from https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna",
  "external_url": "https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna",
  "image": "http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "name": "Thread Haus - Innovot NFT Collection",
  "attributes": [
    {
      "trait_type": "Body",
      "value": "Downtown"
    },
    {
      "trait_type": "Background",
      "value": "Downtown"
    },
    {
      "trait_type": "Hats (detachable)",
      "value": "Beanie"
    }
  ]
}
```

> This is the metadata that an NFT marketplace is looking for.

And you can also see the `image` field is a link to the actual image:

`http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAA...`

Which is this image:

![NFT](/img/tutorial/attached.png)

---

## Step 10: Detaching the hat

We use the `detachTopDown` command to remove/detach the NFT:

```bash
node dist/index.cjs detachTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a -c 0x91a4Df19DE444cDA86ef24f61A6190838Cec2b22 --tokenId=1
```

Outputs:

```
Detaching from ERC721TopDownDna on ganache
Fetching Metadata JSON Schema from: https:/leovigna.mypinata.cloud/ipfs/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9
```
```javascript
{
  Body: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/body-albino.png'
  },
  Background: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-downtown.png'
  },
  Vibe: 'Chill'
}
```

Now let's view the NFT again:

```
node dist/index.cjs viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a  --tokenId=1 --debug
```

This gives us different the `tokenUri`. Notice that the image is simply accessible via the `/getImage` path instead of `/getMetadata`.

So calling: [https://metadata.owlprotocol.xyz/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=](http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=)

Gives us:

![NFT Detached](/img/tutorial/detached.png)

## More Info

Have questions? Join us in Discord: [https://discord.com/invite/7sANzfGUfe](https://discord.com/invite/7sANzfGUfe)
