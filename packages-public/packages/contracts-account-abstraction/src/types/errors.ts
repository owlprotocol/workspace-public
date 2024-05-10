export enum ValidationErrors {
    InvalidRequest = -32601,
    InvalidFields = -32602,
    SimulateValidation = -32500,
    SimulatePaymasterValidation = -32501,
    OpcodeValidation = -32502,
    ExpiresShortly = -32503,
    Reputation = -32504,
    InsufficientStake = -32505,
    UnsupportedSignatureAggregator = -32506,
    InvalidSignature = -32507,
}

export enum ExecutionErrors {
    UserOperationReverted = -32521,
}

//TODO: User viem error classes
export class ExecutionError extends Error {
    code: number;

    // error codes from: https://eips.ethereum.org/EIPS/eip-1474
    constructor(msg: string, code: ExecutionErrors) {
        super(msg);
        this.code = code;
    }
}
