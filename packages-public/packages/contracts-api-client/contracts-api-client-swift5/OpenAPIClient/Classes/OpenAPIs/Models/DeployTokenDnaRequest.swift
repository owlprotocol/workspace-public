//
// DeployTokenDnaRequest.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct DeployTokenDnaRequest: Codable, JSONEncodable, Hashable {

    public var deployParams: DeployBeaconProxyRequestDeployParams
    public var contractParams: DeployTokenDnaRequestContractParams

    public init(deployParams: DeployBeaconProxyRequestDeployParams, contractParams: DeployTokenDnaRequestContractParams) {
        self.deployParams = deployParams
        self.contractParams = contractParams
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case deployParams
        case contractParams
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(deployParams, forKey: .deployParams)
        try container.encode(contractParams, forKey: .contractParams)
    }
}

