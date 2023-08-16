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
    /// DeployTokenURIDnaRequestContractParams
    /// </summary>
    [DataContract(Name = "deploy_TokenURIDna_request_contractParams")]
    public partial class DeployTokenURIDnaRequestContractParams : IEquatable<DeployTokenURIDnaRequestContractParams>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DeployTokenURIDnaRequestContractParams" /> class.
        /// </summary>
        /// <param name="_0">An ethereum address.</param>
        /// <param name="_1">A string.</param>
        /// <param name="_2">An ethereum address.</param>
        /// <param name="_3">A string.</param>
        /// <param name="_4">An ethereum address.</param>
        /// <param name="_5">An ethereum address.</param>
        /// <param name="admin">An ethereum address.</param>
        /// <param name="contractUri">A string.</param>
        /// <param name="baseUriRole">An ethereum address.</param>
        /// <param name="baseUri">A string.</param>
        /// <param name="dnaProviderRole">An ethereum address.</param>
        /// <param name="dnaProvider">An ethereum address.</param>
        public DeployTokenURIDnaRequestContractParams(string _0 = default(string), string _1 = default(string), string _2 = default(string), string _3 = default(string), string _4 = default(string), string _5 = default(string), string admin = default(string), string contractUri = default(string), string baseUriRole = default(string), string baseUri = default(string), string dnaProviderRole = default(string), string dnaProvider = default(string))
        {
            this._0 = _0;
            this._1 = _1;
            this._2 = _2;
            this._3 = _3;
            this._4 = _4;
            this._5 = _5;
            this.Admin = admin;
            this.ContractUri = contractUri;
            this.BaseUriRole = baseUriRole;
            this.BaseUri = baseUri;
            this.DnaProviderRole = dnaProviderRole;
            this.DnaProvider = dnaProvider;
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
        /// A string
        /// </summary>
        /// <value>A string</value>
        [DataMember(Name = "3", EmitDefaultValue = false)]
        public string _3 { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "4", EmitDefaultValue = false)]
        public string _4 { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "5", EmitDefaultValue = false)]
        public string _5 { get; set; }

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
        [DataMember(Name = "_baseUriRole", EmitDefaultValue = false)]
        public string BaseUriRole { get; set; }

        /// <summary>
        /// A string
        /// </summary>
        /// <value>A string</value>
        [DataMember(Name = "_baseUri", EmitDefaultValue = false)]
        public string BaseUri { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "_dnaProviderRole", EmitDefaultValue = false)]
        public string DnaProviderRole { get; set; }

        /// <summary>
        /// An ethereum address
        /// </summary>
        /// <value>An ethereum address</value>
        [DataMember(Name = "_dnaProvider", EmitDefaultValue = false)]
        public string DnaProvider { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class DeployTokenURIDnaRequestContractParams {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  _1: ").Append(_1).Append("\n");
            sb.Append("  _2: ").Append(_2).Append("\n");
            sb.Append("  _3: ").Append(_3).Append("\n");
            sb.Append("  _4: ").Append(_4).Append("\n");
            sb.Append("  _5: ").Append(_5).Append("\n");
            sb.Append("  Admin: ").Append(Admin).Append("\n");
            sb.Append("  ContractUri: ").Append(ContractUri).Append("\n");
            sb.Append("  BaseUriRole: ").Append(BaseUriRole).Append("\n");
            sb.Append("  BaseUri: ").Append(BaseUri).Append("\n");
            sb.Append("  DnaProviderRole: ").Append(DnaProviderRole).Append("\n");
            sb.Append("  DnaProvider: ").Append(DnaProvider).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as DeployTokenURIDnaRequestContractParams).AreEqual;
        }

        /// <summary>
        /// Returns true if DeployTokenURIDnaRequestContractParams instances are equal
        /// </summary>
        /// <param name="input">Instance of DeployTokenURIDnaRequestContractParams to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(DeployTokenURIDnaRequestContractParams input)
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
                if (this._5 != null)
                {
                    hashCode = (hashCode * 59) + this._5.GetHashCode();
                }
                if (this.Admin != null)
                {
                    hashCode = (hashCode * 59) + this.Admin.GetHashCode();
                }
                if (this.ContractUri != null)
                {
                    hashCode = (hashCode * 59) + this.ContractUri.GetHashCode();
                }
                if (this.BaseUriRole != null)
                {
                    hashCode = (hashCode * 59) + this.BaseUriRole.GetHashCode();
                }
                if (this.BaseUri != null)
                {
                    hashCode = (hashCode * 59) + this.BaseUri.GetHashCode();
                }
                if (this.DnaProviderRole != null)
                {
                    hashCode = (hashCode * 59) + this.DnaProviderRole.GetHashCode();
                }
                if (this.DnaProvider != null)
                {
                    hashCode = (hashCode * 59) + this.DnaProvider.GetHashCode();
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

            // _4 (string) pattern
            Regex regex_4 = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regex_4.Match(this._4).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for _4, must match a pattern of " + regex_4, new [] { "_4" });
            }

            // _5 (string) pattern
            Regex regex_5 = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regex_5.Match(this._5).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for _5, must match a pattern of " + regex_5, new [] { "_5" });
            }

            // Admin (string) pattern
            Regex regexAdmin = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexAdmin.Match(this.Admin).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for Admin, must match a pattern of " + regexAdmin, new [] { "Admin" });
            }

            // BaseUriRole (string) pattern
            Regex regexBaseUriRole = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexBaseUriRole.Match(this.BaseUriRole).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for BaseUriRole, must match a pattern of " + regexBaseUriRole, new [] { "BaseUriRole" });
            }

            // DnaProviderRole (string) pattern
            Regex regexDnaProviderRole = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexDnaProviderRole.Match(this.DnaProviderRole).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for DnaProviderRole, must match a pattern of " + regexDnaProviderRole, new [] { "DnaProviderRole" });
            }

            // DnaProvider (string) pattern
            Regex regexDnaProvider = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexDnaProvider.Match(this.DnaProvider).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for DnaProvider, must match a pattern of " + regexDnaProvider, new [] { "DnaProvider" });
            }

            yield break;
        }
    }

}
