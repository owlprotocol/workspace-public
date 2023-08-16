/*
 * Owl Contract Api
 *
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */


using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.IO;
using System.Runtime.Serialization;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;
using OpenAPIDateConverter = Org.OpenAPITools.Client.OpenAPIDateConverter;
using OpenAPIClientUtils = Org.OpenAPITools.Client.ClientUtils;

namespace Org.OpenAPITools.Model
{
    /// <summary>
    /// InterfacesIBeaconProxySetBeaconRequestContractParams
    /// </summary>
    [DataContract(Name = "interfaces_IBeaconProxy_setBeacon_request_contractParams")]
    public partial class InterfacesIBeaconProxySetBeaconRequestContractParams : IEquatable<InterfacesIBeaconProxySetBeaconRequestContractParams>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIBeaconProxySetBeaconRequestContractParams" /> class.
        /// </summary>
        /// <param name="_0">An ethereum address.</param>
        /// <param name="_1">An arbitrary length byte array.</param>
        /// <param name="beaconAddress">An ethereum address.</param>
        /// <param name="data">An arbitrary length byte array.</param>
        public InterfacesIBeaconProxySetBeaconRequestContractParams(string _0 = default(string), string _1 = default(string), string beaconAddress = default(string), string data = default(string))
        {
            this._0 = _0;
            this._1 = _1;
            this.BeaconAddress = beaconAddress;
            this.Data = data;
        }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "0", EmitDefaultValue = false)]
        public string _0 { get; set; }

        /// <summary>
        /// An arbitrary length byte array
        /// </summary>
        /// <value>An arbitrary length byte array</value>
        [DataMember(Name = "1", EmitDefaultValue = false)]
        public string _1 { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "_beaconAddress", EmitDefaultValue = false)]
        public string BeaconAddress { get; set; }

        /// <summary>
        /// An arbitrary length byte array
        /// </summary>
        /// <value>An arbitrary length byte array</value>
        [DataMember(Name = "data", EmitDefaultValue = false)]
        public string Data { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIBeaconProxySetBeaconRequestContractParams {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  _1: ").Append(_1).Append("\n");
            sb.Append("  BeaconAddress: ").Append(BeaconAddress).Append("\n");
            sb.Append("  Data: ").Append(Data).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public virtual string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this, Newtonsoft.Json.Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="input">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object input)
        {
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIBeaconProxySetBeaconRequestContractParams).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIBeaconProxySetBeaconRequestContractParams instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIBeaconProxySetBeaconRequestContractParams to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIBeaconProxySetBeaconRequestContractParams input)
        {
            return OpenAPIClientUtils.compareLogic.Compare(this, input).AreEqual;
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                int hashCode = 41;
                if (this._0 != null)
                {
                    hashCode = (hashCode * 59) + this._0.GetHashCode();
                }
                if (this._1 != null)
                {
                    hashCode = (hashCode * 59) + this._1.GetHashCode();
                }
                if (this.BeaconAddress != null)
                {
                    hashCode = (hashCode * 59) + this.BeaconAddress.GetHashCode();
                }
                if (this.Data != null)
                {
                    hashCode = (hashCode * 59) + this.Data.GetHashCode();
                }
                return hashCode;
            }
        }

        /// <summary>
        /// To validate all properties of the instance
        /// </summary>
        /// <param name="validationContext">Validation context</param>
        /// <returns>Validation Result</returns>
        IEnumerable<System.ComponentModel.DataAnnotations.ValidationResult> IValidatableObject.Validate(ValidationContext validationContext)
        {
            // _0 (string) pattern
            Regex regex_0 = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regex_0.Match(this._0).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for _0, must match a pattern of " + regex_0, new [] { "_0" });
            }

            // BeaconAddress (string) pattern
            Regex regexBeaconAddress = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexBeaconAddress.Match(this.BeaconAddress).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for BeaconAddress, must match a pattern of " + regexBeaconAddress, new [] { "BeaconAddress" });
            }

            yield break;
        }
    }

}
