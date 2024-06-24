# Zod Sol
[zod](https://zod.dev/) schema validation for Solidity types.

Zod Sol enables the creation of Zod validators for Solidity smart contracts.
We support 2 types of zod validators:
* Typescript compiled: Uses a Typescript staticically typed ABI definition to generate a typed zod validator for function inputs & outputs. Flexible but has its limitations due to challenge of writing type inference.
* Code generation: Uses any ABI (json or object) to generate code that creates zod validator for function inputs & outputs. More flexiable and easier on the TS compiler but uses code generation and is therefore less composable with custom TS.
