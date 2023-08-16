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
    /// InterfacesIERC1820SetInterfaceImplementerRequestContractParams
    /// </summary>
    [DataContract(Name = "interfaces_IERC1820_setInterfaceImplementer_request_contractParams")]
    public partial class InterfacesIERC1820SetInterfaceImplementerRequestContractParams : IEquatable<InterfacesIERC1820SetInterfaceImplementerRequestContractParams>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIERC1820SetInterfaceImplementerRequestContractParams" /> class.
        /// </summary>
        /// <param name="_0">An ethereum address.</param>
        /// <param name="_1">A solidity bytes32.</param>
        /// <param name="_2">An ethereum address.</param>
        /// <param name="account">An ethereum address.</param>
        /// <param name="interfaceHash">A solidity bytes32.</param>
        /// <param name="implementer">An ethereum address.</param>
        public InterfacesIERC1820SetInterfaceImplementerRequestContractParams(string _0 = default(string), string _1 = default(string), string _2 = default(string), string account = default(string), string interfaceHash = default(string), string implementer = default(string))
        {
            this._0 = _0;
            this._1 = _1;
            this._2 = _2;
            this.Account = account;
            this.InterfaceHash = interfaceHash;
            this.Implementer = implementer;
        }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "0", EmitDefaultValue = false)]
        public string _0 { get; set; }

        /// <summary>
        /// A solidity bytes32
        /// </summary>
        /// <value>A solidity bytes32</value>
        [DataMember(Name = "1", EmitDefaultValue = false)]
        public string _1 { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "2", EmitDefaultValue = false)]
        public string _2 { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "account", EmitDefaultValue = false)]
        public string Account { get; set; }

        /// <summary>
        /// A solidity bytes32
        /// </summary>
        /// <value>A solidity bytes32</value>
        [DataMember(Name = "_interfaceHash", EmitDefaultValue = false)]
        public string InterfaceHash { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "implementer", EmitDefaultValue = false)]
        public string Implementer { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIERC1820SetInterfaceImplementerRequestContractParams {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  _1: ").Append(_1).Append("\n");
            sb.Append("  _2: ").Append(_2).Append("\n");
            sb.Append("  Account: ").Append(Account).Append("\n");
            sb.Append("  InterfaceHash: ").Append(InterfaceHash).Append("\n");
            sb.Append("  Implementer: ").Append(Implementer).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIERC1820SetInterfaceImplementerRequestContractParams).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIERC1820SetInterfaceImplementerRequestContractParams instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIERC1820SetInterfaceImplementerRequestContractParams to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIERC1820SetInterfaceImplementerRequestContractParams input)
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
                if (this._2 != null)
                {
                    hashCode = (hashCode * 59) + this._2.GetHashCode();
                }
                if (this.Account != null)
                {
                    hashCode = (hashCode * 59) + this.Account.GetHashCode();
                }
                if (this.InterfaceHash != null)
                {
                    hashCode = (hashCode * 59) + this.InterfaceHash.GetHashCode();
                }
                if (this.Implementer != null)
                {
                    hashCode = (hashCode * 59) + this.Implementer.GetHashCode();
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

            // _2 (string) pattern
            Regex regex_2 = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regex_2.Match(this._2).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for _2, must match a pattern of " + regex_2, new [] { "_2" });
            }

            // Account (string) pattern
            Regex regexAccount = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexAccount.Match(this.Account).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for Account, must match a pattern of " + regexAccount, new [] { "Account" });
            }

            // Implementer (string) pattern
            Regex regexImplementer = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexImplementer.Match(this.Implementer).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for Implementer, must match a pattern of " + regexImplementer, new [] { "Implementer" });
            }

            yield break;
        }
    }

}
