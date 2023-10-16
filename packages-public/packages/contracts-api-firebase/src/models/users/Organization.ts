export interface OrganizationReadOnlyData {
    readonly name: string;
    readonly owner: string;
    readonly tier: "personal" | "growth" | "enterprise";
    readonly seats: number;
}

export interface OrganizationReadOnly extends OrganizationReadOnlyData {
    readonly id: string;
}
