export interface OrganizationReadOnly {
    readonly id: string;
    readonly name: string;
    readonly owner: string;
    readonly tier: "personal" | "growth" | "enterprise";
    readonly seats: number;
}
