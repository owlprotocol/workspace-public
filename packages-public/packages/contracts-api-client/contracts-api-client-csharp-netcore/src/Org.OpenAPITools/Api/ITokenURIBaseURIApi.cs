/*
 * Owl Contract Api
 *
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */


using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Mime;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Org.OpenAPITools.Api
{

    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public interface IITokenURIBaseURIApiSync : IApiAccessor
    {
        #region Synchronous Operations
        /// <summary>
        /// ITokenURIBaseURI.baseURI
        /// </summary>
        /// <remarks>
        /// Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>InterfacesIContractURIContractURI200Response</returns>
        InterfacesIContractURIContractURI200Response InterfacesITokenURIBaseURIBaseURI(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0);

        /// <summary>
        /// ITokenURIBaseURI.baseURI
        /// </summary>
        /// <remarks>
        /// Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>ApiResponse of InterfacesIContractURIContractURI200Response</returns>
        ApiResponse<InterfacesIContractURIContractURI200Response> InterfacesITokenURIBaseURIBaseURIWithHttpInfo(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0);
        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI
        /// </summary>
        /// <remarks>
        /// Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>InterfacesIContractURISetContractURI200Response</returns>
        InterfacesIContractURISetContractURI200Response InterfacesITokenURIBaseURISetTokenURIBaseURI(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0);

        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI
        /// </summary>
        /// <remarks>
        /// Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>ApiResponse of InterfacesIContractURISetContractURI200Response</returns>
        ApiResponse<InterfacesIContractURISetContractURI200Response> InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfo(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0);
        #endregion Synchronous Operations
    }

    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public interface IITokenURIBaseURIApiAsync : IApiAccessor
    {
        #region Asynchronous Operations
        /// <summary>
        /// ITokenURIBaseURI.baseURI
        /// </summary>
        /// <remarks>
        /// Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of InterfacesIContractURIContractURI200Response</returns>
        System.Threading.Tasks.Task<InterfacesIContractURIContractURI200Response> InterfacesITokenURIBaseURIBaseURIAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken));

        /// <summary>
        /// ITokenURIBaseURI.baseURI
        /// </summary>
        /// <remarks>
        /// Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of ApiResponse (InterfacesIContractURIContractURI200Response)</returns>
        System.Threading.Tasks.Task<ApiResponse<InterfacesIContractURIContractURI200Response>> InterfacesITokenURIBaseURIBaseURIWithHttpInfoAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken));
        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI
        /// </summary>
        /// <remarks>
        /// Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of InterfacesIContractURISetContractURI200Response</returns>
        System.Threading.Tasks.Task<InterfacesIContractURISetContractURI200Response> InterfacesITokenURIBaseURISetTokenURIBaseURIAsync(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken));

        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI
        /// </summary>
        /// <remarks>
        /// Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of ApiResponse (InterfacesIContractURISetContractURI200Response)</returns>
        System.Threading.Tasks.Task<ApiResponse<InterfacesIContractURISetContractURI200Response>> InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfoAsync(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken));
        #endregion Asynchronous Operations
    }

    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public interface IITokenURIBaseURIApi : IITokenURIBaseURIApiSync, IITokenURIBaseURIApiAsync
    {

    }

    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public partial class ITokenURIBaseURIApi : IITokenURIBaseURIApi
    {
        private Org.OpenAPITools.Client.ExceptionFactory _exceptionFactory = (name, response) => null;

        /// <summary>
        /// Initializes a new instance of the <see cref="ITokenURIBaseURIApi"/> class.
        /// </summary>
        /// <returns></returns>
        public ITokenURIBaseURIApi() : this((string)null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ITokenURIBaseURIApi"/> class.
        /// </summary>
        /// <returns></returns>
        public ITokenURIBaseURIApi(string basePath)
        {
            this.Configuration = Org.OpenAPITools.Client.Configuration.MergeConfigurations(
                Org.OpenAPITools.Client.GlobalConfiguration.Instance,
                new Org.OpenAPITools.Client.Configuration { BasePath = basePath }
            );
            this.Client = new Org.OpenAPITools.Client.ApiClient(this.Configuration.BasePath);
            this.AsynchronousClient = new Org.OpenAPITools.Client.ApiClient(this.Configuration.BasePath);
            this.ExceptionFactory = Org.OpenAPITools.Client.Configuration.DefaultExceptionFactory;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ITokenURIBaseURIApi"/> class
        /// using Configuration object
        /// </summary>
        /// <param name="configuration">An instance of Configuration</param>
        /// <returns></returns>
        public ITokenURIBaseURIApi(Org.OpenAPITools.Client.Configuration configuration)
        {
            if (configuration == null) throw new ArgumentNullException("configuration");

            this.Configuration = Org.OpenAPITools.Client.Configuration.MergeConfigurations(
                Org.OpenAPITools.Client.GlobalConfiguration.Instance,
                configuration
            );
            this.Client = new Org.OpenAPITools.Client.ApiClient(this.Configuration.BasePath);
            this.AsynchronousClient = new Org.OpenAPITools.Client.ApiClient(this.Configuration.BasePath);
            ExceptionFactory = Org.OpenAPITools.Client.Configuration.DefaultExceptionFactory;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ITokenURIBaseURIApi"/> class
        /// using a Configuration object and client instance.
        /// </summary>
        /// <param name="client">The client interface for synchronous API access.</param>
        /// <param name="asyncClient">The client interface for asynchronous API access.</param>
        /// <param name="configuration">The configuration object.</param>
        public ITokenURIBaseURIApi(Org.OpenAPITools.Client.ISynchronousClient client, Org.OpenAPITools.Client.IAsynchronousClient asyncClient, Org.OpenAPITools.Client.IReadableConfiguration configuration)
        {
            if (client == null) throw new ArgumentNullException("client");
            if (asyncClient == null) throw new ArgumentNullException("asyncClient");
            if (configuration == null) throw new ArgumentNullException("configuration");

            this.Client = client;
            this.AsynchronousClient = asyncClient;
            this.Configuration = configuration;
            this.ExceptionFactory = Org.OpenAPITools.Client.Configuration.DefaultExceptionFactory;
        }

        /// <summary>
        /// The client for accessing this underlying API asynchronously.
        /// </summary>
        public Org.OpenAPITools.Client.IAsynchronousClient AsynchronousClient { get; set; }

        /// <summary>
        /// The client for accessing this underlying API synchronously.
        /// </summary>
        public Org.OpenAPITools.Client.ISynchronousClient Client { get; set; }

        /// <summary>
        /// Gets the base path of the API client.
        /// </summary>
        /// <value>The base path</value>
        public string GetBasePath()
        {
            return this.Configuration.BasePath;
        }

        /// <summary>
        /// Gets or sets the configuration object
        /// </summary>
        /// <value>An instance of the Configuration</value>
        public Org.OpenAPITools.Client.IReadableConfiguration Configuration { get; set; }

        /// <summary>
        /// Provides a factory method hook for the creation of exceptions.
        /// </summary>
        public Org.OpenAPITools.Client.ExceptionFactory ExceptionFactory
        {
            get
            {
                if (_exceptionFactory != null && _exceptionFactory.GetInvocationList().Length > 1)
                {
                    throw new InvalidOperationException("Multicast delegate for ExceptionFactory is unsupported.");
                }
                return _exceptionFactory;
            }
            set { _exceptionFactory = value; }
        }

        /// <summary>
        /// ITokenURIBaseURI.baseURI Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>InterfacesIContractURIContractURI200Response</returns>
        public InterfacesIContractURIContractURI200Response InterfacesITokenURIBaseURIBaseURI(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0)
        {
            Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURIContractURI200Response> localVarResponse = InterfacesITokenURIBaseURIBaseURIWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
            return localVarResponse.Data;
        }

        /// <summary>
        /// ITokenURIBaseURI.baseURI Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>ApiResponse of InterfacesIContractURIContractURI200Response</returns>
        public Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURIContractURI200Response> InterfacesITokenURIBaseURIBaseURIWithHttpInfo(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0)
        {
            // verify the required parameter 'networkId' is set
            if (networkId == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'networkId' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURIBaseURI");
            }

            // verify the required parameter 'address' is set
            if (address == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'address' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURIBaseURI");
            }

            // verify the required parameter 'interfacesIBeaconImplementationRequest' is set
            if (interfacesIBeaconImplementationRequest == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'interfacesIBeaconImplementationRequest' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURIBaseURI");
            }

            Org.OpenAPITools.Client.RequestOptions localVarRequestOptions = new Org.OpenAPITools.Client.RequestOptions();

            string[] _contentTypes = new string[] {
                "application/json"
            };

            // to determine the Accept header
            string[] _accepts = new string[] {
                "application/json"
            };

            var localVarContentType = Org.OpenAPITools.Client.ClientUtils.SelectHeaderContentType(_contentTypes);
            if (localVarContentType != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Content-Type", localVarContentType);
            }

            var localVarAccept = Org.OpenAPITools.Client.ClientUtils.SelectHeaderAccept(_accepts);
            if (localVarAccept != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Accept", localVarAccept);
            }

            localVarRequestOptions.PathParameters.Add("networkId", Org.OpenAPITools.Client.ClientUtils.ParameterToString(networkId)); // path parameter
            localVarRequestOptions.PathParameters.Add("address", Org.OpenAPITools.Client.ClientUtils.ParameterToString(address)); // path parameter
            localVarRequestOptions.Data = interfacesIBeaconImplementationRequest;

            localVarRequestOptions.Operation = "ITokenURIBaseURIApi.InterfacesITokenURIBaseURIBaseURI";
            localVarRequestOptions.OperationIndex = operationIndex;

            // authentication (Authorization) required
            if (!string.IsNullOrEmpty(this.Configuration.GetApiKeyWithPrefix("x-api-key")))
            {
                localVarRequestOptions.HeaderParameters.Add("x-api-key", this.Configuration.GetApiKeyWithPrefix("x-api-key"));
            }

            // make the HTTP request
            var localVarResponse = this.Client.Post<InterfacesIContractURIContractURI200Response>("/{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI", localVarRequestOptions, this.Configuration);
            if (this.ExceptionFactory != null)
            {
                Exception _exception = this.ExceptionFactory("InterfacesITokenURIBaseURIBaseURI", localVarResponse);
                if (_exception != null)
                {
                    throw _exception;
                }
            }

            return localVarResponse;
        }

        /// <summary>
        /// ITokenURIBaseURI.baseURI Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of InterfacesIContractURIContractURI200Response</returns>
        public async System.Threading.Tasks.Task<InterfacesIContractURIContractURI200Response> InterfacesITokenURIBaseURIBaseURIAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURIContractURI200Response> localVarResponse = await InterfacesITokenURIBaseURIBaseURIWithHttpInfoAsync(networkId, address, interfacesIBeaconImplementationRequest, operationIndex, cancellationToken).ConfigureAwait(false);
            return localVarResponse.Data;
        }

        /// <summary>
        /// ITokenURIBaseURI.baseURI Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of ApiResponse (InterfacesIContractURIContractURI200Response)</returns>
        public async System.Threading.Tasks.Task<Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURIContractURI200Response>> InterfacesITokenURIBaseURIBaseURIWithHttpInfoAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            // verify the required parameter 'networkId' is set
            if (networkId == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'networkId' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURIBaseURI");
            }

            // verify the required parameter 'address' is set
            if (address == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'address' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURIBaseURI");
            }

            // verify the required parameter 'interfacesIBeaconImplementationRequest' is set
            if (interfacesIBeaconImplementationRequest == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'interfacesIBeaconImplementationRequest' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURIBaseURI");
            }


            Org.OpenAPITools.Client.RequestOptions localVarRequestOptions = new Org.OpenAPITools.Client.RequestOptions();

            string[] _contentTypes = new string[] {
                "application/json"
            };

            // to determine the Accept header
            string[] _accepts = new string[] {
                "application/json"
            };

            var localVarContentType = Org.OpenAPITools.Client.ClientUtils.SelectHeaderContentType(_contentTypes);
            if (localVarContentType != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Content-Type", localVarContentType);
            }

            var localVarAccept = Org.OpenAPITools.Client.ClientUtils.SelectHeaderAccept(_accepts);
            if (localVarAccept != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Accept", localVarAccept);
            }

            localVarRequestOptions.PathParameters.Add("networkId", Org.OpenAPITools.Client.ClientUtils.ParameterToString(networkId)); // path parameter
            localVarRequestOptions.PathParameters.Add("address", Org.OpenAPITools.Client.ClientUtils.ParameterToString(address)); // path parameter
            localVarRequestOptions.Data = interfacesIBeaconImplementationRequest;

            localVarRequestOptions.Operation = "ITokenURIBaseURIApi.InterfacesITokenURIBaseURIBaseURI";
            localVarRequestOptions.OperationIndex = operationIndex;

            // authentication (Authorization) required
            if (!string.IsNullOrEmpty(this.Configuration.GetApiKeyWithPrefix("x-api-key")))
            {
                localVarRequestOptions.HeaderParameters.Add("x-api-key", this.Configuration.GetApiKeyWithPrefix("x-api-key"));
            }

            // make the HTTP request
            var localVarResponse = await this.AsynchronousClient.PostAsync<InterfacesIContractURIContractURI200Response>("/{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI", localVarRequestOptions, this.Configuration, cancellationToken).ConfigureAwait(false);

            if (this.ExceptionFactory != null)
            {
                Exception _exception = this.ExceptionFactory("InterfacesITokenURIBaseURIBaseURI", localVarResponse);
                if (_exception != null)
                {
                    throw _exception;
                }
            }

            return localVarResponse;
        }

        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>InterfacesIContractURISetContractURI200Response</returns>
        public InterfacesIContractURISetContractURI200Response InterfacesITokenURIBaseURISetTokenURIBaseURI(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0)
        {
            Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURISetContractURI200Response> localVarResponse = InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfo(networkId, address, interfacesIContractURISetContractURIRequest);
            return localVarResponse.Data;
        }

        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>ApiResponse of InterfacesIContractURISetContractURI200Response</returns>
        public Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURISetContractURI200Response> InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfo(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0)
        {
            // verify the required parameter 'networkId' is set
            if (networkId == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'networkId' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURISetTokenURIBaseURI");
            }

            // verify the required parameter 'address' is set
            if (address == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'address' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURISetTokenURIBaseURI");
            }

            // verify the required parameter 'interfacesIContractURISetContractURIRequest' is set
            if (interfacesIContractURISetContractURIRequest == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'interfacesIContractURISetContractURIRequest' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURISetTokenURIBaseURI");
            }

            Org.OpenAPITools.Client.RequestOptions localVarRequestOptions = new Org.OpenAPITools.Client.RequestOptions();

            string[] _contentTypes = new string[] {
                "application/json"
            };

            // to determine the Accept header
            string[] _accepts = new string[] {
                "application/json"
            };

            var localVarContentType = Org.OpenAPITools.Client.ClientUtils.SelectHeaderContentType(_contentTypes);
            if (localVarContentType != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Content-Type", localVarContentType);
            }

            var localVarAccept = Org.OpenAPITools.Client.ClientUtils.SelectHeaderAccept(_accepts);
            if (localVarAccept != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Accept", localVarAccept);
            }

            localVarRequestOptions.PathParameters.Add("networkId", Org.OpenAPITools.Client.ClientUtils.ParameterToString(networkId)); // path parameter
            localVarRequestOptions.PathParameters.Add("address", Org.OpenAPITools.Client.ClientUtils.ParameterToString(address)); // path parameter
            localVarRequestOptions.Data = interfacesIContractURISetContractURIRequest;

            localVarRequestOptions.Operation = "ITokenURIBaseURIApi.InterfacesITokenURIBaseURISetTokenURIBaseURI";
            localVarRequestOptions.OperationIndex = operationIndex;

            // authentication (Authorization) required
            if (!string.IsNullOrEmpty(this.Configuration.GetApiKeyWithPrefix("x-api-key")))
            {
                localVarRequestOptions.HeaderParameters.Add("x-api-key", this.Configuration.GetApiKeyWithPrefix("x-api-key"));
            }

            // make the HTTP request
            var localVarResponse = this.Client.Post<InterfacesIContractURISetContractURI200Response>("/{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI", localVarRequestOptions, this.Configuration);
            if (this.ExceptionFactory != null)
            {
                Exception _exception = this.ExceptionFactory("InterfacesITokenURIBaseURISetTokenURIBaseURI", localVarResponse);
                if (_exception != null)
                {
                    throw _exception;
                }
            }

            return localVarResponse;
        }

        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of InterfacesIContractURISetContractURI200Response</returns>
        public async System.Threading.Tasks.Task<InterfacesIContractURISetContractURI200Response> InterfacesITokenURIBaseURISetTokenURIBaseURIAsync(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURISetContractURI200Response> localVarResponse = await InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfoAsync(networkId, address, interfacesIContractURISetContractURIRequest, operationIndex, cancellationToken).ConfigureAwait(false);
            return localVarResponse.Data;
        }

        /// <summary>
        /// ITokenURIBaseURI.setTokenURIBaseURI Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIContractURISetContractURIRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of ApiResponse (InterfacesIContractURISetContractURI200Response)</returns>
        public async System.Threading.Tasks.Task<Org.OpenAPITools.Client.ApiResponse<InterfacesIContractURISetContractURI200Response>> InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfoAsync(string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            // verify the required parameter 'networkId' is set
            if (networkId == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'networkId' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURISetTokenURIBaseURI");
            }

            // verify the required parameter 'address' is set
            if (address == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'address' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURISetTokenURIBaseURI");
            }

            // verify the required parameter 'interfacesIContractURISetContractURIRequest' is set
            if (interfacesIContractURISetContractURIRequest == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'interfacesIContractURISetContractURIRequest' when calling ITokenURIBaseURIApi->InterfacesITokenURIBaseURISetTokenURIBaseURI");
            }


            Org.OpenAPITools.Client.RequestOptions localVarRequestOptions = new Org.OpenAPITools.Client.RequestOptions();

            string[] _contentTypes = new string[] {
                "application/json"
            };

            // to determine the Accept header
            string[] _accepts = new string[] {
                "application/json"
            };

            var localVarContentType = Org.OpenAPITools.Client.ClientUtils.SelectHeaderContentType(_contentTypes);
            if (localVarContentType != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Content-Type", localVarContentType);
            }

            var localVarAccept = Org.OpenAPITools.Client.ClientUtils.SelectHeaderAccept(_accepts);
            if (localVarAccept != null)
            {
                localVarRequestOptions.HeaderParameters.Add("Accept", localVarAccept);
            }

            localVarRequestOptions.PathParameters.Add("networkId", Org.OpenAPITools.Client.ClientUtils.ParameterToString(networkId)); // path parameter
            localVarRequestOptions.PathParameters.Add("address", Org.OpenAPITools.Client.ClientUtils.ParameterToString(address)); // path parameter
            localVarRequestOptions.Data = interfacesIContractURISetContractURIRequest;

            localVarRequestOptions.Operation = "ITokenURIBaseURIApi.InterfacesITokenURIBaseURISetTokenURIBaseURI";
            localVarRequestOptions.OperationIndex = operationIndex;

            // authentication (Authorization) required
            if (!string.IsNullOrEmpty(this.Configuration.GetApiKeyWithPrefix("x-api-key")))
            {
                localVarRequestOptions.HeaderParameters.Add("x-api-key", this.Configuration.GetApiKeyWithPrefix("x-api-key"));
            }

            // make the HTTP request
            var localVarResponse = await this.AsynchronousClient.PostAsync<InterfacesIContractURISetContractURI200Response>("/{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI", localVarRequestOptions, this.Configuration, cancellationToken).ConfigureAwait(false);

            if (this.ExceptionFactory != null)
            {
                Exception _exception = this.ExceptionFactory("InterfacesITokenURIBaseURISetTokenURIBaseURI", localVarResponse);
                if (_exception != null)
                {
                    throw _exception;
                }
            }

            return localVarResponse;
        }

    }
}
