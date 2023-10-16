export interface BlogData {
    readonly title: string;
    readonly url: string;
    readonly timestamp: number;
}

export interface Blog extends BlogData {
    readonly id: string;
}
