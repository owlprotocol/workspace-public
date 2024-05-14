# Contracts Account Abstraction
ERC4337 Account Abstraction support for deploying relevant smart contracts and interacting with UserOps.

## Contracts
### Public Infrastructure Contracts
Public infrastructure contracts from [eth-infinitism/account-abstraction](https://github.com/eth-infinitism/account-abstraction) that have no config or owner. Once deployed, these can be used by **anyone**.
* EntryPoint: Core ERC4337 v0.7 Entrypoint for executing UserOps
* SimpleAccountFactory: Simple factory for deploying user-owned smart accounts
* EntryPointSimulations: Smart contract to simulate ERC4337 UserOps for gas estimation. Modified version from [pimlicolabs/alto](https://github.com/pimlicolabs/alto)
* PimlicoEntryPointSimulations: Additional util for ERC4337 UserOp gas estimation. Originally from [pimlicolabs/alto](https://github.com/pimlicolabs/alto) but updated to support simpler deployment (the address of the EntryPointSimulations contract it uses is passed in the constructor instead of being deployed)

These contracts are deployed by the [setupERC4337Contracts](./src/setupERC4337Contracts.ts) function.

### Smart Account Contracts
These contracts contain the core logic for a user's "smart wallet". They are controlled by the user(s) or some more advanced logic.
* SimpleAccount: A simple smart account implementation by [eth-infinitism/account-abstraction](https://github.com/eth-infinitism/account-abstraction) which has an owner. Can call `exec` or `execBatch` to execute one or multiple transactions from the smart account. Uses simple `personal_sign` signatures over the UserOp.


### Paymaster Contracts
These contracts sponsor the gas for UserOps. Instead of paying the bundler for the UserOp using the ether balance on the smart account, funds are pulled from the paymaster contract. Paymaster's often have an owner or some configuration to determine whether a UserOp is approved for sponsorship.
* VerifyingPaymaster: A simple paymaster implementation by [eth-infinitism/account-abstraction](https://github.com/eth-infinitism/account-abstraction) which has a verifyingSigner. All UserOps must be signed by the verifyingSigner with the signature being passed to the `paymasterAndData` field of the UserOp.

## ERC4337 Utils
Many parts of the code are inspired from [pimlico/alto](https://github.com/pimlicolabs/alto) but with certain changes such as removing OOP patterns, removing unecessary abstractions, and sticking to only providing utils and not a full bundler.

## UserOperation
[UserOperation](./src/models/UserOperation.ts) defines the fields of a UserOp in the form of a simple developer-friendly abstraction. This is imported from [pimlicolabs/permissionless.js](https://github.com/pimlicolabs/permissionless.js) but we also export a Hex encoded version for use cases in encoding/decoding.

## PackedUserOperation
[PackedUserOperation](./src/models/PackedUserOperation.ts) defines the fields of a UserOp that is encoded for use with smart contracts. In this situation, certain fields such as `maxFeePerGas` and `maxPriorityFeePerGas` get encoded in a packed `gasFees` field.

## ExecutionResult
[ExecutionResult](./src/models/ExecutionResult.ts) defines the fields of the decoded output from estimating the execution of a UserOp.

## TargetCallResult
[TargetCallResult](./src/models/TargetCallResult.ts) defines the fields of the decoded output from estimating the execution of specific call such as the `exec` function of the smart account. This estimation is used to get a more specific gas estimation of the portion of the UserOp that executes on the smart account.
