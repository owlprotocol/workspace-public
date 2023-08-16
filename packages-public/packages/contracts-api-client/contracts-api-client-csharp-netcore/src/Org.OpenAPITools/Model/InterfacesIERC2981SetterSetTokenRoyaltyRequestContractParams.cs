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
    /// InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams
    /// </summary>
    [DataContract(Name = "interfaces_IERC2981Setter_setTokenRoyalty_request_contractParams")]
    public partial class InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams : IEquatable<InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams" /> class.
        /// </summary>
        /// <param name="_0">A solidity uint256.</param>
        /// <param name="_1">An ethereum address.</param>
        /// <param name="_2">A solidity uint96.</param>
        /// <param name="tokenId">A solidity uint256.</param>
        /// <param name="receiver">An ethereum address.</param>
        /// <param name="feeNumerator">A solidity uint96.</param>
        public InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams(string _0 = default(string), string _1 = default(string), string _2 = default(string), string tokenId = default(string), string receiver = default(string), string feeNumerator = default(string))
        {
            this._0 = _0;
            this._1 = _1;
            this._2 = _2;
            this.TokenId = tokenId;
            this.Receiver = receiver;
            this.FeeNumerator = feeNumerator;
        }

        /// <summary>
        /// A solidity uint256
        /// </summary>
        /// <value>A solidity uint256</value>
        [DataMember(Name = "0", EmitDefaultValue = false)]
        public string _0 { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "1", EmitDefaultValue = false)]
        public string _1 { get; set; }

        /// <summary>
        /// A solidity uint96
        /// </summary>
        /// <value>A solidity uint96</value>
        [DataMember(Name = "2", EmitDefaultValue = false)]
        public string _2 { get; set; }

        /// <summary>
        /// A solidity uint256
        /// </summary>
        /// <value>A solidity uint256</value>
        [DataMember(Name = "tokenId", EmitDefaultValue = false)]
        public string TokenId { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "receiver", EmitDefaultValue = false)]
        public string Receiver { get; set; }

        /// <summary>
        /// A solidity uint96
        /// </summary>
        /// <value>A solidity uint96</value>
        [DataMember(Name = "feeNumerator", EmitDefaultValue = false)]
        public string FeeNumerator { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  _1: ").Append(_1).Append("\n");
            sb.Append("  _2: ").Append(_2).Append("\n");
            sb.Append("  TokenId: ").Append(TokenId).Append("\n");
            sb.Append("  Receiver: ").Append(Receiver).Append("\n");
            sb.Append("  FeeNumerator: ").Append(FeeNumerator).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams input)
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
                if (this.TokenId != null)
                {
                    hashCode = (hashCode * 59) + this.TokenId.GetHashCode();
                }
                if (this.Receiver != null)
                {
                    hashCode = (hashCode * 59) + this.Receiver.GetHashCode();
                }
                if (this.FeeNumerator != null)
                {
                    hashCode = (hashCode * 59) + this.FeeNumerator.GetHashCode();
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
            // _1 (string) pattern
            Regex regex_1 = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regex_1.Match(this._1).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for _1, must match a pattern of " + regex_1, new [] { "_1" });
            }

            // Receiver (string) pattern
            Regex regexReceiver = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexReceiver.Match(this.Receiver).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for Receiver, must match a pattern of " + regexReceiver, new [] { "Receiver" });
            }

            yield break;
        }
    }

}
