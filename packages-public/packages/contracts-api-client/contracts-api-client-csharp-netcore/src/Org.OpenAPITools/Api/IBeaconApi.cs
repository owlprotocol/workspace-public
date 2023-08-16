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
    public interface IIBeaconApiSync : IApiAccessor
    {
        #region Synchronous Operations
        /// <summary>
        /// IBeacon.implementation
        /// </summary>
        /// <remarks>
        /// Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>InterfacesIBeaconImplementation200Response</returns>
        InterfacesIBeaconImplementation200Response InterfacesIBeaconImplementation(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0);

        /// <summary>
        /// IBeacon.implementation
        /// </summary>
        /// <remarks>
        /// Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>ApiResponse of InterfacesIBeaconImplementation200Response</returns>
        ApiResponse<InterfacesIBeaconImplementation200Response> InterfacesIBeaconImplementationWithHttpInfo(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0);
        #endregion Synchronous Operations
    }

    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public interface IIBeaconApiAsync : IApiAccessor
    {
        #region Asynchronous Operations
        /// <summary>
        /// IBeacon.implementation
        /// </summary>
        /// <remarks>
        /// Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of InterfacesIBeaconImplementation200Response</returns>
        System.Threading.Tasks.Task<InterfacesIBeaconImplementation200Response> InterfacesIBeaconImplementationAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken));

        /// <summary>
        /// IBeacon.implementation
        /// </summary>
        /// <remarks>
        /// Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </remarks>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of ApiResponse (InterfacesIBeaconImplementation200Response)</returns>
        System.Threading.Tasks.Task<ApiResponse<InterfacesIBeaconImplementation200Response>> InterfacesIBeaconImplementationWithHttpInfoAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken));
        #endregion Asynchronous Operations
    }

    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public interface IIBeaconApi : IIBeaconApiSync, IIBeaconApiAsync
    {

    }

    /// <summary>
    /// Represents a collection of functions to interact with the API endpoints
    /// </summary>
    public partial class IBeaconApi : IIBeaconApi
    {
        private Org.OpenAPITools.Client.ExceptionFactory _exceptionFactory = (name, response) => null;

        /// <summary>
        /// Initializes a new instance of the <see cref="IBeaconApi"/> class.
        /// </summary>
        /// <returns></returns>
        public IBeaconApi() : this((string)null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="IBeaconApi"/> class.
        /// </summary>
        /// <returns></returns>
        public IBeaconApi(string basePath)
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
        /// Initializes a new instance of the <see cref="IBeaconApi"/> class
        /// using Configuration object
        /// </summary>
        /// <param name="configuration">An instance of Configuration</param>
        /// <returns></returns>
        public IBeaconApi(Org.OpenAPITools.Client.Configuration configuration)
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
        /// Initializes a new instance of the <see cref="IBeaconApi"/> class
        /// using a Configuration object and client instance.
        /// </summary>
        /// <param name="client">The client interface for synchronous API access.</param>
        /// <param name="asyncClient">The client interface for asynchronous API access.</param>
        /// <param name="configuration">The configuration object.</param>
        public IBeaconApi(Org.OpenAPITools.Client.ISynchronousClient client, Org.OpenAPITools.Client.IAsynchronousClient asyncClient, Org.OpenAPITools.Client.IReadableConfiguration configuration)
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
        /// IBeacon.implementation Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>InterfacesIBeaconImplementation200Response</returns>
        public InterfacesIBeaconImplementation200Response InterfacesIBeaconImplementation(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0)
        {
            Org.OpenAPITools.Client.ApiResponse<InterfacesIBeaconImplementation200Response> localVarResponse = InterfacesIBeaconImplementationWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
            return localVarResponse.Data;
        }

        /// <summary>
        /// IBeacon.implementation Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <returns>ApiResponse of InterfacesIBeaconImplementation200Response</returns>
        public Org.OpenAPITools.Client.ApiResponse<InterfacesIBeaconImplementation200Response> InterfacesIBeaconImplementationWithHttpInfo(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0)
        {
            // verify the required parameter 'networkId' is set
            if (networkId == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'networkId' when calling IBeaconApi->InterfacesIBeaconImplementation");
            }

            // verify the required parameter 'address' is set
            if (address == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'address' when calling IBeaconApi->InterfacesIBeaconImplementation");
            }

            // verify the required parameter 'interfacesIBeaconImplementationRequest' is set
            if (interfacesIBeaconImplementationRequest == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'interfacesIBeaconImplementationRequest' when calling IBeaconApi->InterfacesIBeaconImplementation");
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

            localVarRequestOptions.Operation = "IBeaconApi.InterfacesIBeaconImplementation";
            localVarRequestOptions.OperationIndex = operationIndex;

            // authentication (Authorization) required
            if (!string.IsNullOrEmpty(this.Configuration.GetApiKeyWithPrefix("x-api-key")))
            {
                localVarRequestOptions.HeaderParameters.Add("x-api-key", this.Configuration.GetApiKeyWithPrefix("x-api-key"));
            }

            // make the HTTP request
            var localVarResponse = this.Client.Post<InterfacesIBeaconImplementation200Response>("/{networkId}/interface/IBeacon/read/{address}/implementation", localVarRequestOptions, this.Configuration);
            if (this.ExceptionFactory != null)
            {
                Exception _exception = this.ExceptionFactory("InterfacesIBeaconImplementation", localVarResponse);
                if (_exception != null)
                {
                    throw _exception;
                }
            }

            return localVarResponse;
        }

        /// <summary>
        /// IBeacon.implementation Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of InterfacesIBeaconImplementation200Response</returns>
        public async System.Threading.Tasks.Task<InterfacesIBeaconImplementation200Response> InterfacesIBeaconImplementationAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            Org.OpenAPITools.Client.ApiResponse<InterfacesIBeaconImplementation200Response> localVarResponse = await InterfacesIBeaconImplementationWithHttpInfoAsync(networkId, address, interfacesIBeaconImplementationRequest, operationIndex, cancellationToken).ConfigureAwait(false);
            return localVarResponse.Data;
        }

        /// <summary>
        /// IBeacon.implementation Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;
        /// </summary>
        /// <exception cref="Org.OpenAPITools.Client.ApiException">Thrown when fails to make API call</exception>
        /// <param name="networkId">The network id</param>
        /// <param name="address">An ethereum address</param>
        /// <param name="interfacesIBeaconImplementationRequest"></param>
        /// <param name="operationIndex">Index associated with the operation.</param>
        /// <param name="cancellationToken">Cancellation Token to cancel the request.</param>
        /// <returns>Task of ApiResponse (InterfacesIBeaconImplementation200Response)</returns>
        public async System.Threading.Tasks.Task<Org.OpenAPITools.Client.ApiResponse<InterfacesIBeaconImplementation200Response>> InterfacesIBeaconImplementationWithHttpInfoAsync(string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest, int operationIndex = 0, System.Threading.CancellationToken cancellationToken = default(System.Threading.CancellationToken))
        {
            // verify the required parameter 'networkId' is set
            if (networkId == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'networkId' when calling IBeaconApi->InterfacesIBeaconImplementation");
            }

            // verify the required parameter 'address' is set
            if (address == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'address' when calling IBeaconApi->InterfacesIBeaconImplementation");
            }

            // verify the required parameter 'interfacesIBeaconImplementationRequest' is set
            if (interfacesIBeaconImplementationRequest == null)
            {
                throw new Org.OpenAPITools.Client.ApiException(400, "Missing required parameter 'interfacesIBeaconImplementationRequest' when calling IBeaconApi->InterfacesIBeaconImplementation");
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

            localVarRequestOptions.Operation = "IBeaconApi.InterfacesIBeaconImplementation";
            localVarRequestOptions.OperationIndex = operationIndex;

            // authentication (Authorization) required
            if (!string.IsNullOrEmpty(this.Configuration.GetApiKeyWithPrefix("x-api-key")))
            {
                localVarRequestOptions.HeaderParameters.Add("x-api-key", this.Configuration.GetApiKeyWithPrefix("x-api-key"));
            }

            // make the HTTP request
            var localVarResponse = await this.AsynchronousClient.PostAsync<InterfacesIBeaconImplementation200Response>("/{networkId}/interface/IBeacon/read/{address}/implementation", localVarRequestOptions, this.Configuration, cancellationToken).ConfigureAwait(false);

            if (this.ExceptionFactory != null)
            {
                Exception _exception = this.ExceptionFactory("InterfacesIBeaconImplementation", localVarResponse);
                if (_exception != null)
                {
                    throw _exception;
                }
            }

            return localVarResponse;
        }

    }
}
