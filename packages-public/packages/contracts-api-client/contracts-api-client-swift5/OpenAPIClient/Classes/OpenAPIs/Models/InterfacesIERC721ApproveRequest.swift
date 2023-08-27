//
// InterfacesIERC721ApproveRequest.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC721ApproveRequest: Codable, JSONEncodable, Hashable {

    public var contractParams: InterfacesIERC721ApproveRequestContractParams

    public init(contractParams: InterfacesIERC721ApproveRequestContractParams) {
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
