//
// InterfacesIERC721SafeTransferFromRequest.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC721SafeTransferFromRequest: Codable, JSONEncodable, Hashable {

    public var contractParams: InterfacesIERC721SafeTransferFromRequestContractParams

    public init(contractParams: InterfacesIERC721SafeTransferFromRequestContractParams) {
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

