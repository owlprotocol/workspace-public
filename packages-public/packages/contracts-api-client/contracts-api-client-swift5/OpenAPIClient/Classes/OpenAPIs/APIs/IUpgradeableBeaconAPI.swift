//
// IUpgradeableBeaconAPI.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

open class IUpgradeableBeaconAPI {

    /**
     IUpgradeableBeacon.upgradeTo
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIUpgradeableBeaconUpgradeToRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIUpgradeableBeaconUpgradeTo(networkId: String, address: String, interfacesIUpgradeableBeaconUpgradeToRequest: InterfacesIUpgradeableBeaconUpgradeToRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIUpgradeableBeaconUpgradeTo200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIUpgradeableBeaconUpgradeToWithRequestBuilder(networkId: networkId, address: address, interfacesIUpgradeableBeaconUpgradeToRequest: interfacesIUpgradeableBeaconUpgradeToRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IUpgradeableBeacon.upgradeTo
     - POST /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo
     - Write `upgradeTo(newImplementation)` on an instance of `IUpgradeableBeacon`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIUpgradeableBeaconUpgradeToRequest: (body)  
     - returns: RequestBuilder<InterfacesIUpgradeableBeaconUpgradeTo200Response> 
     */
    open class func interfacesIUpgradeableBeaconUpgradeToWithRequestBuilder(networkId: String, address: String, interfacesIUpgradeableBeaconUpgradeToRequest: InterfacesIUpgradeableBeaconUpgradeToRequest) -> RequestBuilder<InterfacesIUpgradeableBeaconUpgradeTo200Response> {
        var localVariablePath = "/{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIUpgradeableBeaconUpgradeToRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIUpgradeableBeaconUpgradeTo200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }
}
