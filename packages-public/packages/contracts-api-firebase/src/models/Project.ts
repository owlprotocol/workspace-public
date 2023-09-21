export interface Project {
    readonly id: string;
    readonly owner: string;
    readonly name: string;
    readonly description?: string;
    readonly store?: string;
    readonly type?: "coupon";
}
