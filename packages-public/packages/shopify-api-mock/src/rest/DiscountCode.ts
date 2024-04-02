import { BaseInterface } from "./Base.js";
import { SessionInterface } from "../session/Session.js";

export interface DiscountCode {
    code?: string | null;
    created_at?: string | null;
    errors?: { [key: string]: unknown } | null;
    id?: number | null;
    price_rule_id?: number | null;
    updated_at?: string | null;
    usage_count?: number | null;
}

export interface DiscountCodeResourceInterface extends BaseInterface, DiscountCode {}

export class DiscountCodeResourceMock implements DiscountCodeResourceInterface {
    session: SessionInterface;

    constructor({ session }: { session: SessionInterface }) {
        this.session = session;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async find({ session, id }: { session: SessionInterface; id: number }): Promise<DiscountCodeResourceMock> {
        throw new Error("Unimplemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async all({ session }: { session: SessionInterface }): Promise<DiscountCodeResourceMock[]> {
        throw new Error("Unimplemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async count({ session }: { session: SessionInterface }): Promise<number> {
        throw new Error("Unimplemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async save({ update }: { update: boolean }): Promise<void> {
        //TODO: Other logic to keep track of saved codes internally?
    }

    async saveAndUpdate(): Promise<void> {
        //TODO: Other logic to keep track of saved codes internally?
    }

    async delete(): Promise<void> {
        //TODO: Other logic to keep track of saved codes internally?
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    serialize(saving: boolean): Record<string, any> {
        throw new Error("Unimplemented");
    }

    toJSON(): Record<string, any> {
        throw new Error("Unimplemented");
    }

    code?: string | null;
    created_at?: string | null;
    errors?: { [key: string]: unknown } | null;
    id?: number | null;
    price_rule_id?: number | null;
    updated_at?: string | null;
    usage_count?: number | null;
}
