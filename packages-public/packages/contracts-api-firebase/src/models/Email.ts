export type CouponEmailData = {
    storeName: string;
    couponDescription: string;
    img?: string;
};

export interface Email {
    readonly id: string;
    // Recipient
    readonly to: string[];
    readonly message?: {
        // Email subject
        subject: string;
        // Email body
        html: string;
    };
    readonly template?: {
        name: string;
        data: { coupons: CouponEmailData[] };
    };
}
