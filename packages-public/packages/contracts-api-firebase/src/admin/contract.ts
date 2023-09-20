export function getContractId(address: string, networkId: string): string {
    return `${address}-${networkId}`;
}
