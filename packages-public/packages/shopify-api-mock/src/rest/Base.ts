export interface BaseInterface {
    save({ update }: { update: boolean }): Promise<void>;
    saveAndUpdate(): Promise<void>;
    delete(): Promise<void>;
    serialize(saving: boolean): Record<string, any>;
    toJSON(): Record<string, any>;
}
