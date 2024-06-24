import { Hex, decodeAbiParameters } from "viem";

const panicCodes: { [key: number]: string } = {
    // from https://docs.soliditylang.org/en/v0.8.0/control-structures.html
    1: "assert(false)",
    17: "arithmetic overflow/underflow",
    18: "divide by zero",
    33: "invalid enum value",
    34: "storage byte array that is incorrectly encoded",
    49: ".pop() on an empty array.",
    50: "array sout-of-bounds or negative index",
    65: "memory overflow",
    81: "zero-initialized variable of internal function type",
};

export function parseFailedOpWithRevert(data: Hex) {
    const methodSig = data.slice(0, 10);
    const dataParams = `0x${data.slice(10)}` as Hex;

    if (methodSig === "0x08c379a0") {
        const [err] = decodeAbiParameters(
            [
                {
                    name: "err",
                    type: "string",
                },
            ],
            dataParams,
        );

        return err;
    }

    if (methodSig === "0x4e487b71") {
        const [code] = decodeAbiParameters(
            [
                {
                    name: "err",
                    type: "uint256",
                },
            ],
            dataParams,
        );

        return panicCodes[Number(code)] ?? `${code}`;
    }

    return data;
}
