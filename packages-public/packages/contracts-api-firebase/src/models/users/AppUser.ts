export interface AppUserId {
    readonly id: string;
}

export interface AppUserData {
    readonly email: string;
    readonly owner: string;
    readonly isCreatedByProject: boolean;
    readonly createdAt: number;
    readonly safeAddress: string;
}

export type AppUser = AppUserId & AppUserData;
