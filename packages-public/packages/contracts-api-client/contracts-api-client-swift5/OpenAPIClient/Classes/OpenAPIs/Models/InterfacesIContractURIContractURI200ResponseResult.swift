//
// InterfacesIContractURIContractURI200ResponseResult.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIContractURIContractURI200ResponseResult: Codable, JSONEncodable, Hashable {

    /** A string */
    public var _0: String?
    /** A string */
    public var : String?

    public init(_0: String? = nil, : String? = nil) {
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

