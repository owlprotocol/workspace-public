export interface GasOverheads {
    /**
     * fixed overhead for entire handleOp bundle.
     */
    fixed: number;

    /**
     * per userOp overhead, added on top of the above fixed per-bundle.
     */
    perUserOp: number;

    /**
     * overhead for userOp word (32 bytes) block
     */
    perUserOpWord: number;

    // perCallDataWord: number

    /**
     * zero byte cost, for calldata gas cost calculations
     */
    zeroByte: number;

    /**
     * non-zero byte cost, for calldata gas cost calculations
     */
    nonZeroByte: number;

    /**
     * expected bundle size, to split per-bundle overhead between all ops.
     */
    bundleSize: number;

    /**
     * expected length of the userOp signature.
     */
    sigSize: number;
}

export const DefaultGasOverheads: GasOverheads = {
    fixed: 21000,
    perUserOp: 18300,
    perUserOpWord: 4,
    zeroByte: 4,
    nonZeroByte: 16,
    bundleSize: 1,
    sigSize: 65,
};
