//
// InterfacesIERC721EnumerableTokenByIndexRequestContractParams.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC721EnumerableTokenByIndexRequestContractParams: Codable, JSONEncodable, Hashable {

    /** A solidity uint256 */
    public var _0: String?
    /** A solidity uint256 */
    public var index: String?

    public init(_0: String? = nil, index: String? = nil) {
        self._0 = _0
        self.index = index
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case index
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(index, forKey: .index)
    }
}
