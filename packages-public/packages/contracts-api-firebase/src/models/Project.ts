export interface ProjectData {
    readonly owner: string;
    readonly name: string;
    readonly description?: string;
    readonly store?: string;
    readonly type?: "coupon";
}

export interface Project extends ProjectData {
    readonly id: string;
}
