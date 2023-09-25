import { BaseInterface } from "./Base.js";
import { SessionInterface } from "../session/Session.js";

export interface PriceRule {
    allocation_limit?: number | null;
    allocation_method?: string | null;
    created_at?: string | null;
    customer_segment_prerequisite_ids?: number[] | null;
    customer_selection?: string | null;
    ends_at?: string | null;
    entitled_collection_ids?: number[] | null;
    entitled_country_ids?: number[] | null;
    entitled_product_ids?: number[] | null;
    entitled_variant_ids?: number[] | null;
    id?: number | null;
    once_per_customer?: boolean | null;
    prerequisite_collection_ids?: number[] | null;
    prerequisite_customer_ids?: number[] | null;
    prerequisite_product_ids?: number[] | null;
    prerequisite_quantity_range?: { [key: string]: unknown } | null;
    prerequisite_shipping_price_range?: { [key: string]: unknown } | null;
    prerequisite_subtotal_range?: { [key: string]: unknown } | null;
    prerequisite_to_entitlement_purchase?: { [key: string]: unknown } | null;
    prerequisite_to_entitlement_quantity_ratio?: { [key: string]: unknown } | null;
    prerequisite_variant_ids?: number[] | null;
    starts_at?: string | null;
    target_selection?: string | null;
    target_type?: string | null;
    title?: string | null;
    updated_at?: string | null;
    usage_limit?: number | null;
    value?: string | null;
    value_type?: string | null;
}

export interface PriceRuleResourceInterface extends BaseInterface, PriceRule {}

export class PriceRuleResourceMock implements PriceRuleResourceInterface {
    session: SessionInterface;

    constructor({ session }: { session: SessionInterface }) {
        this.session = session;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async find({ session, id }: { session: SessionInterface; id: number }): Promise<PriceRuleResourceMock> {
        throw new Error("Unimplemented");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async all({ session }: { session: SessionInterface }): Promise<PriceRuleResourceMock[]> {
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

    allocation_limit?: number | null;
    allocation_method?: string | null;
    created_at?: string | null;
    customer_segment_prerequisite_ids?: number[] | null;
    customer_selection?: string | null;
    ends_at?: string | null;
    entitled_collection_ids?: number[] | null;
    entitled_country_ids?: number[] | null;
    entitled_product_ids?: number[] | null;
    entitled_variant_ids?: number[] | null;
    id?: number | null;
    once_per_customer?: boolean | null;
    prerequisite_collection_ids?: number[] | null;
    prerequisite_customer_ids?: number[] | null;
    prerequisite_product_ids?: number[] | null;
    prerequisite_quantity_range?: { [key: string]: unknown } | null;
    prerequisite_shipping_price_range?: { [key: string]: unknown } | null;
    prerequisite_subtotal_range?: { [key: string]: unknown } | null;
    prerequisite_to_entitlement_purchase?: { [key: string]: unknown } | null;
    prerequisite_to_entitlement_quantity_ratio?: { [key: string]: unknown } | null;
    prerequisite_variant_ids?: number[] | null;
    starts_at?: string | null;
    target_selection?: string | null;
    target_type?: string | null;
    title?: string | null;
    updated_at?: string | null;
    usage_limit?: number | null;
    value?: string | null;
    value_type?: string | null;
}
