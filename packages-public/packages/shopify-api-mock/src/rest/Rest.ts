import { PriceRuleResourceMock } from "./PriceRule.js";
import { DiscountCodeResourceMock } from "./DiscountCode.js";
export interface RestInterface {
    PriceRule: typeof PriceRuleResourceMock;
    DiscountCode: typeof DiscountCodeResourceMock;
}

export const RestMock = {
    PriceRule: PriceRuleResourceMock,
    DiscountCode: DiscountCodeResourceMock,
};
