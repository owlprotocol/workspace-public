# Legend / Notation

-   `/` => Collection/subcollection
-   `*` => Document field
-   `owner` => Field used for ownership

_Avoid using maps in favor of subcollections if they can grow too large_

## User Data

##### usersPublic

_Public user data for users that wish to have public community profile_

-   name

##### usersPersonal

_Personal user data keeping track of user activity_

-   name

##### usersReadOnly

_Read-only user data keeping track of server-side settings_

-   email _email, requires server side logic via Clerk_
-   `/apikeysReadOnly` _User API keys_
    -   See /apikeysReadOnly
-   `/contractsPublic` _Contracts deployed by user_
    -   See /contractsPublic
-   defaultDfnsId
-   defaultDfnsAddress
-   defaultSafeAddress

##### apiKeysReadOnly

_User API Keys_

-   owner
-   apiKey
-   expiry

##### inviteCodesReadOnly

_Invite code_

-   owner
-   code
-   usageMax
-   usageRemaining
-   usageTotal

## Organizations Data

### Organizations

##### organizationsPersonal

-   owner
-   name
    /projectsPersonal _See /projectsPersonal_
    /contractsPersonal _See /contractsPersonal_

##### organizationsReadOnly

-   tier: `personal | growth | enterprise` _Payment tier, requires server logic_
-   seats: `number` _Developer seats in organization, requires server logic_
    /users _Users in organization, requires invite flow server logic_ \* See /users

### Project Management

##### projectsPersonal

-   owner
-   name

## Web3 Data

### Networks

_Store network configuration for server to enable simple reconfiguration of rpcs. Load once and cache result?_

##### networksPrivate

-   networkId
-   rpc
-   ... See @owlprotocol/chains package

### Contracts

##### contractsPublic

_Public smart contract data, data created on deployment_

-   networkId
-   address
-   contractName #type of contract
-   contractParams #intialization params
-   contractTx #deploy transaction

##### metadataContractsPersonal

_General Contract metadata_

-   owner
-   name
-   type
-   metadataJson

### Transactions

##### transactionsPublic

_Public transaction data, data created by api calls sending transactions_

-   networkId
-   from
-   to
-   data
-   hash
-   events
-   gas
-   effectiveGasPrice
-   blockNumber
-   blockHash
-   confirmations (updated up to X)
-   ethCost (computed as gas \* effectiveGasPrice) #note ethCost means native token cost
-   usdCost #covert cost to USD using some crypto price API
-   ... (see ethers model)

### Logs

#### logsPublic

_Public log data, data created by api calls sending transactions_

-   networkId
-   blockNumber
-   logIndex
-   blockHash
-   transactionIndex
-   transactionHash
-   address
-   data
-   topics
-   topic0 _topic0 Index_
-   topic1 _topic1 Index_
-   topic2 _topic2 Index_
-   topic3 _topic3 Index_
-   eventName _event abi name_
-   eventFormat _event abi format_
-   dataDecoded _decoded data_

#### logAbisPublic

_Public log abi database. Used to decode event logs similar to [4byte.directory](https://www.4byte.directory)_

-   eventSighash _event sighash (topic0)_
-   eventName _event abi name_
-   eventFormat _event abi format_

### Addresses

##### addressesPublic

_Public Address Book (ENS)_

-   networkId
-   address
-   ens

##### addressesPersonal

_Personal Address Book for keeping track of addresses such as EOAs or Contracts_

-   owner
-   networkId
-   address
-   name #user-friendly name

### Wallets

##### dfnsWalletsReadOnly

-   owner
-   address

##### safeWalletsReadOnly

-   networkId
-   address

### Gas Expenses

##### gasExpensesDailyPublic

_Total protocol gas expense_

-   startDate
-   endDate
-   usdCost

##### gasExpensesMonthlyPublic

-   startDate
-   endDate
-   usdCost

##### gasExpensesMonthlyPersonal

_Organization gas expense_

-   owner
-   startDate
-   endDate
-   usdCost

##### gasExpensesDailyPersonal

-   owner
-   startDate
-   endDate
-   usdCost

### Tokens

##### lazyMintsPrivate

-   Lazy mint data, store Token (ERC721/ERC1155) mint information without minting on-chain\*
-   networkId
-   tokenAddress
-   tokenId
-   to
-   status: `created | mintPending | mintConfirmed`

##### metadataTokensPersonal

_Token (ERC721/ERC1155) Metadata. Store each token metadata individually to avoid too large metadata documents_

-   networkId
-   address
-   tokenId
-   metadataJson
    -   name
    -   description
    -   image

## Shopify Integration

### Shopify Stores

##### storesPublic

-   domain
-   name

##### storesPersonal

-   owner
-   domain
-   name

##### storePrivates

-   owner
-   domain
-   token
-   tokenId
-   tokenScope
-   tokenState

### Shopify Coupons

##### couponCampaignsPersonal

-   owner
-   name
-   project
-   status

##### couponDefinitionsPersonal

-   owner
-   status
-   couponCampaign
-   description
-   discountName
-   networkId
-   tokenAddress
-   tokenId
-   shopifyPriceRuleId
-   couponDefinition
-   couponStore
-   orderStore
-   minted #coupon status, requires server logic
-   redeemed #coupon status, requires server logic
-   status: created | mintPending | mintConfirmed | burnPending | burnConfirmed #alternative to boolean checks?
-   shopifyPromotionCode #shopify code, requires server logic
-   shopifyOrderId #shopify order id, requires server logic

## Emails (all private)

##### emails

-   delivery
    -   ...
-   template
    -   ...
-   to

##### emailTemplates

-   html
