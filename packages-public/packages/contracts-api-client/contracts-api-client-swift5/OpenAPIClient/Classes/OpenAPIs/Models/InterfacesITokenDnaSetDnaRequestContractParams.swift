//
// InterfacesITokenDnaSetDnaRequestContractParams.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesITokenDnaSetDnaRequestContractParams: Codable, JSONEncodable, Hashable {

    /** A solidity uint256 */
    public var _0: String?
    /** An arbitrary length byte array */
    public var _1: String?
    /** A solidity uint256 */
    public var tokenId: String?
    /** An arbitrary length byte array */
    public var dna: String?

    public init(_0: String? = nil, _1: String? = nil, tokenId: String? = nil, dna: String? = nil) {
        self._0 = _0
        self._1 = _1
        self.tokenId = tokenId
        self.dna = dna
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case _1 = "1"
        case tokenId
        case dna
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(_1, forKey: ._1)
        try container.encodeIfPresent(tokenId, forKey: .tokenId)
        try container.encodeIfPresent(dna, forKey: .dna)
    }
}
