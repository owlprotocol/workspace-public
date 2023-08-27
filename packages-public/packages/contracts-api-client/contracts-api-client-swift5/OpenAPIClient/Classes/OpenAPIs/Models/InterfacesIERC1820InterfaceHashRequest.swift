//
// InterfacesIERC1820InterfaceHashRequest.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC1820InterfaceHashRequest: Codable, JSONEncodable, Hashable {

    public var contractParams: InterfacesIERC1820InterfaceHashRequestContractParams

    public init(contractParams: InterfacesIERC1820InterfaceHashRequestContractParams) {
        self.contractParams = contractParams
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case contractParams
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(contractParams, forKey: .contractParams)
    }
}
