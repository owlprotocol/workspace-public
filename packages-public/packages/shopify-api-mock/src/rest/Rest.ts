import { PriceRuleResourceInterface, PriceRuleResourceMock } from "./PriceRule.js";
import { DiscountCodeResourceInterface, DiscountCodeResourceMock } from "./DiscountCode.js";
import { SessionInterface, SessionMock } from "../session/Session.js";

export interface RestInterface {
    PriceRule: ({ session }: { session: SessionInterface }) => PriceRuleResourceInterface;
    DiscountCode: ({ session }: { session: SessionInterface }) => DiscountCodeResourceInterface;
}

export class RestMock {
    PriceRule({ session }: { session: SessionMock }): PriceRuleResourceMock {
        return new PriceRuleResourceMock(session);
    }
    DiscountCode({ session }: { session: SessionMock }): DiscountCodeResourceMock {
        return new DiscountCodeResourceMock(session);
    }
}
