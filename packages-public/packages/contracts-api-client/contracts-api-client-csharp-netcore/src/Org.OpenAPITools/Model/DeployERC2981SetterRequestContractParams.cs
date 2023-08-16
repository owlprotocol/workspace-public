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
    /// DeployERC2981SetterRequestContractParams
    /// </summary>
    [DataContract(Name = "deploy_ERC2981Setter_request_contractParams")]
    public partial class DeployERC2981SetterRequestContractParams : IEquatable<DeployERC2981SetterRequestContractParams>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DeployERC2981SetterRequestContractParams" /> class.
        /// </summary>
        /// <param name="_0">An ethereum address.</param>
        /// <param name="_1">A string.</param>
        /// <param name="_2">An ethereum address.</param>
        /// <param name="_3">An ethereum address.</param>
        /// <param name="_4">A solidity uint96.</param>
        /// <param name="admin">An ethereum address.</param>
        /// <param name="contractUri">A string.</param>
        /// <param name="royaltyRole">An ethereum address.</param>
        /// <param name="royaltyReceiver">An ethereum address.</param>
        /// <param name="feeNumerator">A solidity uint96.</param>
        public DeployERC2981SetterRequestContractParams(string _0 = default(string), string _1 = default(string), string _2 = default(string), string _3 = default(string), string _4 = default(string), string admin = default(string), string contractUri = default(string), string royaltyRole = default(string), string royaltyReceiver = default(string), string feeNumerator = default(string))
        {
            this._0 = _0;
            this._1 = _1;
            this._2 = _2;
            this._3 = _3;
            this._4 = _4;
            this.Admin = admin;
            this.ContractUri = contractUri;
            this.RoyaltyRole = royaltyRole;
            this.RoyaltyReceiver = royaltyReceiver;
            this.FeeNumerator = feeNumerator;
        }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "0", EmitDefaultValue = false)]
        public string _0 { get; set; }

        /// <summary>
        /// A string
        /// </summary>
        /// <value>A string</value>
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
        [DataMember(Name = "3", EmitDefaultValue = false)]
        public string _3 { get; set; }

        /// <summary>
        /// A solidity uint96
        /// </summary>
        /// <value>A solidity uint96</value>
        [DataMember(Name = "4", EmitDefaultValue = false)]
        public string _4 { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "_admin", EmitDefaultValue = false)]
        public string Admin { get; set; }

        /// <summary>
        /// A string
        /// </summary>
        /// <value>A string</value>
        [DataMember(Name = "_contractUri", EmitDefaultValue = false)]
        public string ContractUri { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "_royaltyRole", EmitDefaultValue = false)]
        public string RoyaltyRole { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "_royaltyReceiver", EmitDefaultValue = false)]
        public string RoyaltyReceiver { get; set; }

        /// <summary>
        /// A solidity uint96
        /// </summary>
        /// <value>A solidity uint96</value>
        [DataMember(Name = "_feeNumerator", EmitDefaultValue = false)]
        public string FeeNumerator { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class DeployERC2981SetterRequestContractParams {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  _1: ").Append(_1).Append("\n");
            sb.Append("  _2: ").Append(_2).Append("\n");
            sb.Append("  _3: ").Append(_3).Append("\n");
            sb.Append("  _4: ").Append(_4).Append("\n");
            sb.Append("  Admin: ").Append(Admin).Append("\n");
            sb.Append("  ContractUri: ").Append(ContractUri).Append("\n");
            sb.Append("  RoyaltyRole: ").Append(RoyaltyRole).Append("\n");
            sb.Append("  RoyaltyReceiver: ").Append(RoyaltyReceiver).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as DeployERC2981SetterRequestContractParams).AreEqual;
        }

        /// <summary>
        /// Returns true if DeployERC2981SetterRequestContractParams instances are equal
        /// </summary>
        /// <param name="input">Instance of DeployERC2981SetterRequestContractParams to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(DeployERC2981SetterRequestContractParams input)
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
                if (this._3 != null)
                {
                    hashCode = (hashCode * 59) + this._3.GetHashCode();
                }
                if (this._4 != null)
                {
                    hashCode = (hashCode * 59) + this._4.GetHashCode();
                }
                if (this.Admin != null)
                {
                    hashCode = (hashCode * 59) + this.Admin.GetHashCode();
                }
                if (this.ContractUri != null)
                {
                    hashCode = (hashCode * 59) + this.ContractUri.GetHashCode();
                }
                if (this.RoyaltyRole != null)
                {
                    hashCode = (hashCode * 59) + this.RoyaltyRole.GetHashCode();
                }
                if (this.RoyaltyReceiver != null)
                {
                    hashCode = (hashCode * 59) + this.RoyaltyReceiver.GetHashCode();
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

            // _3 (string) pattern
            Regex regex_3 = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regex_3.Match(this._3).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for _3, must match a pattern of " + regex_3, new [] { "_3" });
            }

            // Admin (string) pattern
            Regex regexAdmin = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexAdmin.Match(this.Admin).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for Admin, must match a pattern of " + regexAdmin, new [] { "Admin" });
            }

            // RoyaltyRole (string) pattern
            Regex regexRoyaltyRole = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexRoyaltyRole.Match(this.RoyaltyRole).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for RoyaltyRole, must match a pattern of " + regexRoyaltyRole, new [] { "RoyaltyRole" });
            }

            // RoyaltyReceiver (string) pattern
            Regex regexRoyaltyReceiver = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexRoyaltyReceiver.Match(this.RoyaltyReceiver).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for RoyaltyReceiver, must match a pattern of " + regexRoyaltyReceiver, new [] { "RoyaltyReceiver" });
            }

            yield break;
        }
    }

}
