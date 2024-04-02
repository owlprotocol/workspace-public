export interface InvitesData {
    readonly senderEmail: string;
    readonly recipientEmail?: string;
    readonly timestamp: number;
    readonly type?: string;
    // readonly status: "pending" | "accepted" | "declined" | "expired";
}

export interface Invites extends InvitesData {
    readonly id: string;
}
