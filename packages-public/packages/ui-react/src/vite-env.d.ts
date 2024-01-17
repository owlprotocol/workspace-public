/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
}

export interface ImportMeta {
    readonly env: ImportMetaEnv;
}
