//
// ITokenURIAPI.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

open class ITokenURIAPI {

    /**
     ITokenURI.tokenURI
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721GetApprovedRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesITokenURITokenURI(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC721MetadataTokenURI200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesITokenURITokenURIWithRequestBuilder(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     ITokenURI.tokenURI
     - POST /{networkId}/interface/ITokenURI/read/{address}/tokenURI
     - Read `tokenURI(tokenId)` on an instance of `ITokenURI`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721GetApprovedRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC721MetadataTokenURI200Response> 
     */
    open class func interfacesITokenURITokenURIWithRequestBuilder(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest) -> RequestBuilder<InterfacesIERC721MetadataTokenURI200Response> {
        var localVariablePath = "/{networkId}/interface/ITokenURI/read/{address}/tokenURI"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC721GetApprovedRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC721MetadataTokenURI200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }
}