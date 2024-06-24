export const fnAbis = {
    empty: {
        inputs: [],
        name: "fnEmpty",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    uint256: {
        inputs: [
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        name: "fnUInt256",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    address: {
        inputs: [
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
        ],
        name: "fnAddress",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    addressUnnamed: {
        inputs: [
            {
                name: "",
                type: "address",
                internalType: "address",
            },
        ],
        name: "fnAddressUnnamed",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    addressArray: {
        inputs: [
            {
                name: "to",
                type: "address[]",
                internalType: "address[]",
            },
        ],
        name: "fnAddressArray",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    tuple: {
        inputs: [
            {
                name: "target",
                type: "tuple",
                internalType: "struct Target",
                components: [
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                ],
            },
        ],
        name: "fnTuple",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    tupleArray: {
        inputs: [
            {
                name: "target",
                type: "tuple[]",
                internalType: "struct Target[]",
                components: [
                    {
                        name: "to",
                        type: "address",
                        internalType: "address",
                    },
                ],
            },
        ],
        name: "fnTupleArray",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
} as const;
