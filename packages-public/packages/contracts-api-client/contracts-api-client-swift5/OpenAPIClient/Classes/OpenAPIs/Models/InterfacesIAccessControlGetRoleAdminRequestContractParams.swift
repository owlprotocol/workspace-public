//
// InterfacesIAccessControlGetRoleAdminRequestContractParams.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

public struct InterfacesIAccessControlGetRoleAdminRequestContractParams: Codable, JSONEncodable, Hashable {

    /** A solidity bytes32 */
    public var _0: String?
    /** A solidity bytes32 */
    public var role: String?

    public init(_0: String? = nil, role: String? = nil) {
        self._0 = _0
        self.role = role
    }

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case _0 = "0"
        case role
    }

    // Encodable protocol methods

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(_0, forKey: ._0)
        try container.encodeIfPresent(role, forKey: .role)
    }
}
