//
// InterfacesIERC165SupportsInterface200ResponseResult.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC165SupportsInterface200ResponseResult: Codable, JSONEncodable, Hashable {

    /** An solidity boolean */
    public var _0: Bool?
    /** An solidity boolean */
    public var : Bool?

    public init(_0: Bool? = nil, : Bool? = nil) {
        self._0 = _0
        self. = 
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case 
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(, forKey: .)
    }
}

