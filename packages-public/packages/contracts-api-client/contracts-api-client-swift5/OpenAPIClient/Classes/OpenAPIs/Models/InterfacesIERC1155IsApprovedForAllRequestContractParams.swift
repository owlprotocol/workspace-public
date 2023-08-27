//
// InterfacesIERC1155IsApprovedForAllRequestContractParams.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC1155IsApprovedForAllRequestContractParams: Codable, JSONEncodable, Hashable {

    static let _0Rule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let _1Rule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let accountRule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let _operatorRule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    /** An ethereum address */
    public var _0: String?
    /** An ethereum address */
    public var _1: String?
    /** An ethereum address */
    public var account: String?
    /** An ethereum address */
    public var _operator: String?

    public init(_0: String? = nil, _1: String? = nil, account: String? = nil, _operator: String? = nil) {
        self._0 = _0
        self._1 = _1
        self.account = account
        self._operator = _operator
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case _1 = "1"
        case account
        case _operator = "operator"
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(_1, forKey: ._1)
        try container.encodeIfPresent(account, forKey: .account)
        try container.encodeIfPresent(_operator, forKey: ._operator)
    }
}
