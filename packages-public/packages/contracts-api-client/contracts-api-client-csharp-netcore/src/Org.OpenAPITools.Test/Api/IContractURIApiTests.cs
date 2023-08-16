/*
 * Owl Contract Api
 *
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */

using System;
using System.IO;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using RestSharp;
using Xunit;

using Org.OpenAPITools.Client;
using Org.OpenAPITools.Api;
// uncomment below to import models
//using Org.OpenAPITools.Model;

namespace Org.OpenAPITools.Test.Api
{
    /// <summary>
    ///  Class for testing IContractURIApi
    /// </summary>
    /// <remarks>
    /// This file is automatically generated by OpenAPI Generator (https://openapi-generator.tech).
    /// Please update the test case below to test the API endpoint.
    /// </remarks>
    public class IContractURIApiTests : IDisposable
    {
        private IContractURIApi instance;

        public IContractURIApiTests()
        {
            instance = new IContractURIApi();
        }

        public void Dispose()
        {
            // Cleanup when everything is done.
        }

        /// <summary>
        /// Test an instance of IContractURIApi
        /// </summary>
        [Fact]
        public void InstanceTest()
        {
            // TODO uncomment below to test 'IsType' IContractURIApi
            //Assert.IsType<IContractURIApi>(instance);
        }

        /// <summary>
        /// Test InterfacesIContractURIContractURI
        /// </summary>
        [Fact]
        public void InterfacesIContractURIContractURITest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //string networkId = null;
            //string address = null;
            //InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = null;
            //var response = instance.InterfacesIContractURIContractURI(networkId, address, interfacesIBeaconImplementationRequest);
            //Assert.IsType<InterfacesIContractURIContractURI200Response>(response);
        }

        /// <summary>
        /// Test InterfacesIContractURISetContractURI
        /// </summary>
        [Fact]
        public void InterfacesIContractURISetContractURITest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //string networkId = null;
            //string address = null;
            //InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest = null;
            //var response = instance.InterfacesIContractURISetContractURI(networkId, address, interfacesIContractURISetContractURIRequest);
            //Assert.IsType<InterfacesIContractURISetContractURI200Response>(response);
        }
    }
}
