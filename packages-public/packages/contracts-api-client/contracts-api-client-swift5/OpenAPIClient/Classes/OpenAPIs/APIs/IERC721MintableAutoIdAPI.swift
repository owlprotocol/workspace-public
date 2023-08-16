//
// IERC721MintableAutoIdAPI.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

open class IERC721MintableAutoIdAPI {

    /**
     IERC721MintableAutoId.mint
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC721MintableAutoIdMint(networkId: String, address: String, interfacesIERC721MintableAutoIdMintRequest: InterfacesIERC721MintableAutoIdMintRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC721MintableAutoIdMint200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC721MintableAutoIdMintWithRequestBuilder(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintRequest: interfacesIERC721MintableAutoIdMintRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC721MintableAutoId.mint
     - POST /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint
     - Write `mint(to)` on an instance of `IERC721MintableAutoId`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC721MintableAutoIdMint200Response> 
     */
    open class func interfacesIERC721MintableAutoIdMintWithRequestBuilder(networkId: String, address: String, interfacesIERC721MintableAutoIdMintRequest: InterfacesIERC721MintableAutoIdMintRequest) -> RequestBuilder<InterfacesIERC721MintableAutoIdMint200Response> {
        var localVariablePath = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mint"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC721MintableAutoIdMintRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC721MintableAutoIdMint200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC721MintableAutoId.mintBatch
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintBatchRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC721MintableAutoIdMintBatch(networkId: String, address: String, interfacesIERC721MintableAutoIdMintBatchRequest: InterfacesIERC721MintableAutoIdMintBatchRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC721MintableAutoIdMintBatch200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC721MintableAutoIdMintBatchWithRequestBuilder(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintBatchRequest: interfacesIERC721MintableAutoIdMintBatchRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC721MintableAutoId.mintBatch
     - POST /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch
     - Write `mintBatch(to)` on an instance of `IERC721MintableAutoId`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintBatchRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC721MintableAutoIdMintBatch200Response> 
     */
    open class func interfacesIERC721MintableAutoIdMintBatchWithRequestBuilder(networkId: String, address: String, interfacesIERC721MintableAutoIdMintBatchRequest: InterfacesIERC721MintableAutoIdMintBatchRequest) -> RequestBuilder<InterfacesIERC721MintableAutoIdMintBatch200Response> {
        var localVariablePath = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC721MintableAutoIdMintBatchRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC721MintableAutoIdMintBatch200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC721MintableAutoId.safeMint
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC721MintableAutoIdSafeMint(networkId: String, address: String, interfacesIERC721MintableAutoIdMintRequest: InterfacesIERC721MintableAutoIdMintRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC721MintableAutoIdMint200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC721MintableAutoIdSafeMintWithRequestBuilder(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintRequest: interfacesIERC721MintableAutoIdMintRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC721MintableAutoId.safeMint
     - POST /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint
     - Write `safeMint(to)` on an instance of `IERC721MintableAutoId`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC721MintableAutoIdMint200Response> 
     */
    open class func interfacesIERC721MintableAutoIdSafeMintWithRequestBuilder(networkId: String, address: String, interfacesIERC721MintableAutoIdMintRequest: InterfacesIERC721MintableAutoIdMintRequest) -> RequestBuilder<InterfacesIERC721MintableAutoIdMint200Response> {
        var localVariablePath = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC721MintableAutoIdMintRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC721MintableAutoIdMint200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC721MintableAutoId.safeMintBatch
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintBatchRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC721MintableAutoIdSafeMintBatch(networkId: String, address: String, interfacesIERC721MintableAutoIdMintBatchRequest: InterfacesIERC721MintableAutoIdMintBatchRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC721MintableAutoIdMintBatch200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC721MintableAutoIdSafeMintBatchWithRequestBuilder(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintBatchRequest: interfacesIERC721MintableAutoIdMintBatchRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC721MintableAutoId.safeMintBatch
     - POST /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch
     - Write `safeMintBatch(to)` on an instance of `IERC721MintableAutoId`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC721MintableAutoIdMintBatchRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC721MintableAutoIdMintBatch200Response> 
     */
    open class func interfacesIERC721MintableAutoIdSafeMintBatchWithRequestBuilder(networkId: String, address: String, interfacesIERC721MintableAutoIdMintBatchRequest: InterfacesIERC721MintableAutoIdMintBatchRequest) -> RequestBuilder<InterfacesIERC721MintableAutoIdMintBatch200Response> {
        var localVariablePath = "/{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC721MintableAutoIdMintBatchRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC721MintableAutoIdMintBatch200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }
}
