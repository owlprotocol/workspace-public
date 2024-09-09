/**
 * Get path Address[] => bytes
 *
 * Get trade logic
 * inputAmount / outputAmount
 * input address
 * output address
 * intermediate addresses[]
 * => compute paths for all, call estimate for all
 * **no gas estimation in consideration for now???**
 * gasPrice
 * if output === WETH auto convert
 * else get price using DEX as oracle
 *
 * Get portfolio values (use get trade logic)
 * tokens Address[]
 * unitToken Address
 * Get balances
 * Get unit values
 * Get portfolio rebalance
 */
/** Defaults to 0x4200000000000000000000000000000000000006 */
// wethAddress?: Address;
//0x7c5aaa464f736740156fd69171505d344855d1e5 (QuoterV2 Mode)

export {};
