//
// DeployChainlinkAnyApiClientRequestContractParams.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct DeployChainlinkAnyApiClientRequestContractParams: Codable, JSONEncodable, Hashable {

    static let _0Rule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let _2Rule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let _3Rule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let adminRule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let tokenRule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    static let oracleRule = StringRule(minLength: nil, maxLength: nil, pattern: "/0x([a-fA-F0-9]){40}/")
    /** An ethereum address */
    public var _0: String?
    /** A string */
    public var _1: String?
    /** An ethereum address */
    public var _2: String?
    /** An ethereum address */
    public var _3: String?
    /** An ethereum address */
    public var admin: String?
    /** A string */
    public var initContractURI: String?
    /** An ethereum address */
    public var token: String?
    /** An ethereum address */
    public var oracle: String?

    public init(_0: String? = nil, _1: String? = nil, _2: String? = nil, _3: String? = nil, admin: String? = nil, initContractURI: String? = nil, token: String? = nil, oracle: String? = nil) {
        self._0 = _0
        self._1 = _1
        self._2 = _2
        self._3 = _3
        self.admin = admin
        self.initContractURI = initContractURI
        self.token = token
        self.oracle = oracle
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case _1 = "1"
        case _2 = "2"
        case _3 = "3"
        case admin = "_admin"
        case initContractURI = "_initContractURI"
        case token
        case oracle
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(_1, forKey: ._1)
        try container.encodeIfPresent(_2, forKey: ._2)
        try container.encodeIfPresent(_3, forKey: ._3)
        try container.encodeIfPresent(admin, forKey: .admin)
        try container.encodeIfPresent(initContractURI, forKey: .initContractURI)
        try container.encodeIfPresent(token, forKey: .token)
        try container.encodeIfPresent(oracle, forKey: .oracle)
    }
}
