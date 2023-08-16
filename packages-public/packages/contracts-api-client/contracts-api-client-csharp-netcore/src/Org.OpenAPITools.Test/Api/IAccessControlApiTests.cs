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
    ///  Class for testing IAccessControlApi
    /// </summary>
    /// <remarks>
    /// This file is automatically generated by OpenAPI Generator (https://openapi-generator.tech).
    /// Please update the test case below to test the API endpoint.
    /// </remarks>
    public class IAccessControlApiTests : IDisposable
    {
        private IAccessControlApi instance;

        public IAccessControlApiTests()
        {
            instance = new IAccessControlApi();
        }

        public void Dispose()
        {
            // Cleanup when everything is done.
        }

        /// <summary>
        /// Test an instance of IAccessControlApi
        /// </summary>
        [Fact]
        public void InstanceTest()
        {
            // TODO uncomment below to test 'IsType' IAccessControlApi
            //Assert.IsType<IAccessControlApi>(instance);
        }

        /// <summary>
        /// Test InterfacesIAccessControlGetRoleAdmin
        /// </summary>
        [Fact]
        public void InterfacesIAccessControlGetRoleAdminTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //string networkId = null;
            //string address = null;
            //InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest = null;
            //var response = instance.InterfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
            //Assert.IsType<InterfacesIAccessControlGetRoleAdmin200Response>(response);
        }

        /// <summary>
        /// Test InterfacesIAccessControlGrantRole
        /// </summary>
        [Fact]
        public void InterfacesIAccessControlGrantRoleTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //string networkId = null;
            //string address = null;
            //InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
            //var response = instance.InterfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
            //Assert.IsType<InterfacesIAccessControlGrantRole200Response>(response);
        }

        /// <summary>
        /// Test InterfacesIAccessControlHasRole
        /// </summary>
        [Fact]
        public void InterfacesIAccessControlHasRoleTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //string networkId = null;
            //string address = null;
            //InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
            //var response = instance.InterfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
            //Assert.IsType<InterfacesIAccessControlHasRole200Response>(response);
        }

        /// <summary>
        /// Test InterfacesIAccessControlRenounceRole
        /// </summary>
        [Fact]
        public void InterfacesIAccessControlRenounceRoleTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //string networkId = null;
            //string address = null;
            //InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
            //var response = instance.InterfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
            //Assert.IsType<InterfacesIAccessControlGrantRole200Response>(response);
        }

        /// <summary>
        /// Test InterfacesIAccessControlRevokeRole
        /// </summary>
        [Fact]
        public void InterfacesIAccessControlRevokeRoleTest()
        {
            // TODO uncomment below to test the method and replace null with proper value
            //string networkId = null;
            //string address = null;
            //InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
            //var response = instance.InterfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
            //Assert.IsType<InterfacesIAccessControlGrantRole200Response>(response);
        }
    }
}
