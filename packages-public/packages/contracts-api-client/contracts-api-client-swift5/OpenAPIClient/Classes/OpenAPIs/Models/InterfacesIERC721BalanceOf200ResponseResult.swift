//
// InterfacesIERC721BalanceOf200ResponseResult.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC721BalanceOf200ResponseResult: Codable, JSONEncodable, Hashable {

    /** A solidity uint256 */
    public var _0: String?
    /** A solidity uint256 */
    public var balance: String?

    public init(_0: String? = nil, balance: String? = nil) {
        self._0 = _0
        self.balance = balance
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case balance
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(balance, forKey: .balance)
    }
}
