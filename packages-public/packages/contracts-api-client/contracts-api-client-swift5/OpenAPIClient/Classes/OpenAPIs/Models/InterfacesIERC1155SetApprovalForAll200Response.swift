//
// InterfacesIERC1155SetApprovalForAll200Response.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIERC1155SetApprovalForAll200Response: Codable, JSONEncodable, Hashable {

    public var contractParams: InterfacesIERC1155SetApprovalForAllRequestContractParams
    public var txHash: String

    public init(contractParams: InterfacesIERC1155SetApprovalForAllRequestContractParams, txHash: String) {
        self.contractParams = contractParams
        self.txHash = txHash
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case contractParams
        case txHash
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(contractParams, forKey: .contractParams)
        try container.encode(txHash, forKey: .txHash)
    }
}

