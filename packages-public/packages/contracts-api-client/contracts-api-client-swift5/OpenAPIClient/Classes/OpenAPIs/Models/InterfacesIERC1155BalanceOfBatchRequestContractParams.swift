//
// InterfacesIERC1155BalanceOfBatchRequestContractParams.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC1155BalanceOfBatchRequestContractParams: Codable, JSONEncodable, Hashable {

    public var _0: [String]?
    public var _1: [String]?
    public var accounts: [String]?
    public var ids: [String]?

    public init(_0: [String]? = nil, _1: [String]? = nil, accounts: [String]? = nil, ids: [String]? = nil) {
        self._0 = _0
        self._1 = _1
        self.accounts = accounts
        self.ids = ids
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case _1 = "1"
        case accounts
        case ids
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(_1, forKey: ._1)
        try container.encodeIfPresent(accounts, forKey: .accounts)
        try container.encodeIfPresent(ids, forKey: .ids)
    }
}

