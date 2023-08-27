//
// InterfacesIAccessControlHasRole200Response.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIAccessControlHasRole200Response: Codable, JSONEncodable, Hashable {

    public var contractParams: InterfacesIAccessControlGrantRoleRequestContractParams
    public var result: InterfacesIERC165SupportsInterface200ResponseResult

    public init(contractParams: InterfacesIAccessControlGrantRoleRequestContractParams, result: InterfacesIERC165SupportsInterface200ResponseResult) {
        self.contractParams = contractParams
        self.result = result
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case contractParams
        case result
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(contractParams, forKey: .contractParams)
        try container.encode(result, forKey: .result)
    }
}
