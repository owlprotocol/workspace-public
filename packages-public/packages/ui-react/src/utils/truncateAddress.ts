export function truncateAddress(value: string | undefined): string {
    return value ? `${value.slice(0, 5)}...${value.slice(-4)}` : "";
}
