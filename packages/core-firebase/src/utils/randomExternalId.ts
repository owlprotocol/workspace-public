export function getRandomExternalId(): string {
    return (parseInt((Math.random() * 8999999).toString()) + 1000000).toString();
}
