//
// IERC20MetadataAPI.swift
//
// Generated by openapi-generator
// https://openapi-generator.tech
//

import Foundation
#if canImport(AnyCodable)
import AnyCodable
#endif

open class IERC20MetadataAPI {

    /**
     IERC20Metadata.allowance
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20AllowanceRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataAllowance(networkId: String, address: String, interfacesIERC20AllowanceRequest: InterfacesIERC20AllowanceRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC20Allowance200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataAllowanceWithRequestBuilder(networkId: networkId, address: address, interfacesIERC20AllowanceRequest: interfacesIERC20AllowanceRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.allowance
     - POST /{networkId}/interface/IERC20Metadata/read/{address}/allowance
     - Read `allowance(owner,spender)` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20AllowanceRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC20Allowance200Response> 
     */
    open class func interfacesIERC20MetadataAllowanceWithRequestBuilder(networkId: String, address: String, interfacesIERC20AllowanceRequest: InterfacesIERC20AllowanceRequest) -> RequestBuilder<InterfacesIERC20Allowance200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/read/{address}/allowance"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC20AllowanceRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC20Allowance200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.approve
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20ApproveRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataApprove(networkId: String, address: String, interfacesIERC20ApproveRequest: InterfacesIERC20ApproveRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC20Approve200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataApproveWithRequestBuilder(networkId: networkId, address: address, interfacesIERC20ApproveRequest: interfacesIERC20ApproveRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.approve
     - POST /{networkId}/interface/IERC20Metadata/write/{address}/approve
     - Write `approve(spender,amount)` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20ApproveRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC20Approve200Response> 
     */
    open class func interfacesIERC20MetadataApproveWithRequestBuilder(networkId: String, address: String, interfacesIERC20ApproveRequest: InterfacesIERC20ApproveRequest) -> RequestBuilder<InterfacesIERC20Approve200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/write/{address}/approve"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC20ApproveRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC20Approve200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.balanceOf
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC1820GetManagerRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataBalanceOf(networkId: String, address: String, interfacesIERC1820GetManagerRequest: InterfacesIERC1820GetManagerRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC20BalanceOf200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataBalanceOfWithRequestBuilder(networkId: networkId, address: address, interfacesIERC1820GetManagerRequest: interfacesIERC1820GetManagerRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.balanceOf
     - POST /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf
     - Read `balanceOf(account)` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC1820GetManagerRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC20BalanceOf200Response> 
     */
    open class func interfacesIERC20MetadataBalanceOfWithRequestBuilder(networkId: String, address: String, interfacesIERC1820GetManagerRequest: InterfacesIERC1820GetManagerRequest) -> RequestBuilder<InterfacesIERC20BalanceOf200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/read/{address}/balanceOf"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC1820GetManagerRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC20BalanceOf200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.decimals
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataDecimals(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC20MetadataDecimals200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataDecimalsWithRequestBuilder(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.decimals
     - POST /{networkId}/interface/IERC20Metadata/read/{address}/decimals
     - Read `decimals()` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC20MetadataDecimals200Response> 
     */
    open class func interfacesIERC20MetadataDecimalsWithRequestBuilder(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest) -> RequestBuilder<InterfacesIERC20MetadataDecimals200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/read/{address}/decimals"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIBeaconImplementationRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC20MetadataDecimals200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.name
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataName(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataNameWithRequestBuilder(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.name
     - POST /{networkId}/interface/IERC20Metadata/read/{address}/name
     - Read `name()` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - returns: RequestBuilder<InterfacesIContractURIContractURI200Response> 
     */
    open class func interfacesIERC20MetadataNameWithRequestBuilder(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest) -> RequestBuilder<InterfacesIContractURIContractURI200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/read/{address}/name"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIBeaconImplementationRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIContractURIContractURI200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.symbol
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataSymbol(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataSymbolWithRequestBuilder(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.symbol
     - POST /{networkId}/interface/IERC20Metadata/read/{address}/symbol
     - Read `symbol()` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - returns: RequestBuilder<InterfacesIContractURIContractURI200Response> 
     */
    open class func interfacesIERC20MetadataSymbolWithRequestBuilder(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest) -> RequestBuilder<InterfacesIContractURIContractURI200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/read/{address}/symbol"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIBeaconImplementationRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIContractURIContractURI200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.totalSupply
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataTotalSupply(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC20TotalSupply200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataTotalSupplyWithRequestBuilder(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.totalSupply
     - POST /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply
     - Read `totalSupply()` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIBeaconImplementationRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC20TotalSupply200Response> 
     */
    open class func interfacesIERC20MetadataTotalSupplyWithRequestBuilder(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest) -> RequestBuilder<InterfacesIERC20TotalSupply200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/read/{address}/totalSupply"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIBeaconImplementationRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC20TotalSupply200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.transfer
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20TransferRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataTransfer(networkId: String, address: String, interfacesIERC20TransferRequest: InterfacesIERC20TransferRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC20Transfer200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataTransferWithRequestBuilder(networkId: networkId, address: address, interfacesIERC20TransferRequest: interfacesIERC20TransferRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.transfer
     - POST /{networkId}/interface/IERC20Metadata/write/{address}/transfer
     - Write `transfer(to,amount)` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20TransferRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC20Transfer200Response> 
     */
    open class func interfacesIERC20MetadataTransferWithRequestBuilder(networkId: String, address: String, interfacesIERC20TransferRequest: InterfacesIERC20TransferRequest) -> RequestBuilder<InterfacesIERC20Transfer200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/write/{address}/transfer"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC20TransferRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC20Transfer200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }

    /**
     IERC20Metadata.transferFrom
     
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20TransferFromRequest: (body)  
     - parameter apiResponseQueue: The queue on which api response is dispatched.
     - parameter completion: completion handler to receive the data and the error objects
     */
    @discardableResult
    open class func interfacesIERC20MetadataTransferFrom(networkId: String, address: String, interfacesIERC20TransferFromRequest: InterfacesIERC20TransferFromRequest, apiResponseQueue: DispatchQueue = OpenAPIClientAPI.apiResponseQueue, completion: @escaping ((_ data: InterfacesIERC20TransferFrom200Response?, _ error: Error?) -> Void)) -> RequestTask {
        return interfacesIERC20MetadataTransferFromWithRequestBuilder(networkId: networkId, address: address, interfacesIERC20TransferFromRequest: interfacesIERC20TransferFromRequest).execute(apiResponseQueue) { result in
            switch result {
            case let .success(response):
                completion(response.body, nil)
            case let .failure(error):
                completion(nil, error)
            }
        }
    }

    /**
     IERC20Metadata.transferFrom
     - POST /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom
     - Write `transferFrom(from,to,amount)` on an instance of `IERC20Metadata`
     - API Key:
       - type: apiKey x-api-key (HEADER)
       - name: Authorization
     - parameter networkId: (path) The network id 
     - parameter address: (path) An ethereum address 
     - parameter interfacesIERC20TransferFromRequest: (body)  
     - returns: RequestBuilder<InterfacesIERC20TransferFrom200Response> 
     */
    open class func interfacesIERC20MetadataTransferFromWithRequestBuilder(networkId: String, address: String, interfacesIERC20TransferFromRequest: InterfacesIERC20TransferFromRequest) -> RequestBuilder<InterfacesIERC20TransferFrom200Response> {
        var localVariablePath = "/{networkId}/interface/IERC20Metadata/write/{address}/transferFrom"
        let networkIdPreEscape = "\(APIHelper.mapValueToPathItem(networkId))"
        let networkIdPostEscape = networkIdPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{networkId}", with: networkIdPostEscape, options: .literal, range: nil)
        let addressPreEscape = "\(APIHelper.mapValueToPathItem(address))"
        let addressPostEscape = addressPreEscape.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? ""
        localVariablePath = localVariablePath.replacingOccurrences(of: "{address}", with: addressPostEscape, options: .literal, range: nil)
        let localVariableURLString = OpenAPIClientAPI.basePath + localVariablePath
        let localVariableParameters = JSONEncodingHelper.encodingParameters(forEncodableObject: interfacesIERC20TransferFromRequest)

        let localVariableUrlComponents = URLComponents(string: localVariableURLString)

        let localVariableNillableHeaders: [String: Any?] = [
            :
        ]

        let localVariableHeaderParameters = APIHelper.rejectNilHeaders(localVariableNillableHeaders)

        let localVariableRequestBuilder: RequestBuilder<InterfacesIERC20TransferFrom200Response>.Type = OpenAPIClientAPI.requestBuilderFactory.getBuilder()

        return localVariableRequestBuilder.init(method: "POST", URLString: (localVariableUrlComponents?.string ?? localVariableURLString), parameters: localVariableParameters, headers: localVariableHeaderParameters, requiresAuthentication: true)
    }
}
