//
// IERC1155MintableAPI.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

open class IERC1155MintableAPI {

    /**
     IERC1155Mintable.mint
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC1155MintableMintRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC1155MintableMint(networkId: String, address: String, interfacesIERC1155MintableMintRequest: InterfacesIERC1155MintableMintRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC1155MintableMint200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC1155MintableMintWithRequestBuilder(networkId: networkId, address: address, interfacesIERC1155MintableMintRequest: interfacesIERC1155MintableMintRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC1155Mintable.mint
     - POST /{networkId}/interface/IERC1155Mintable/write/{address}/mint
     - Write `mint(to,id,amount,data)` on an instance of `IERC1155Mintable`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC1155MintableMintRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC1155MintableMint200Response> 
     */
    open class func interfacesIERC1155MintableMintWithRequestBuilder(networkId: String, address: String, interfacesIERC1155MintableMintRequest: InterfacesIERC1155MintableMintRequest) -> RequestBuilder<InterfacesIERC1155MintableMint200Response> {
        var localVariablePath = "/{networkId}/interface/IERC1155Mintable/write/{address}/mint"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC1155MintableMintRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC1155MintableMint200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC1155Mintable.mintBatch
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC1155MintableMintBatchRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC1155MintableMintBatch(networkId: String, address: String, interfacesIERC1155MintableMintBatchRequest: InterfacesIERC1155MintableMintBatchRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC1155MintableMintBatch200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC1155MintableMintBatchWithRequestBuilder(networkId: networkId, address: address, interfacesIERC1155MintableMintBatchRequest: interfacesIERC1155MintableMintBatchRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC1155Mintable.mintBatch
     - POST /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch
     - Write `mintBatch(to,ids,amounts,data)` on an instance of `IERC1155Mintable`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC1155MintableMintBatchRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC1155MintableMintBatch200Response> 
     */
    open class func interfacesIERC1155MintableMintBatchWithRequestBuilder(networkId: String, address: String, interfacesIERC1155MintableMintBatchRequest: InterfacesIERC1155MintableMintBatchRequest) -> RequestBuilder<InterfacesIERC1155MintableMintBatch200Response> {
        var localVariablePath = "/{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC1155MintableMintBatchRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC1155MintableMintBatch200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }
}