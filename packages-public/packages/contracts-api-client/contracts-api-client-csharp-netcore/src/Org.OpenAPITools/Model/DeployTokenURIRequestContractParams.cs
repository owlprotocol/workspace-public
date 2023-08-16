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
    /// DeployTokenURIRequestContractParams
    /// </summary>
    [DataContract(Name = "deploy_TokenURI_request_contractParams")]
    public partial class DeployTokenURIRequestContractParams : IEquatable<DeployTokenURIRequestContractParams>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DeployTokenURIRequestContractParams" /> class.
        /// </summary>
        /// <param name="_0">An ethereum address.</param>
        /// <param name="_1">A string.</param>
        /// <param name="_2">An ethereum address.</param>
        /// <param name="_3">A string.</param>
        /// <param name="admin">An ethereum address.</param>
        /// <param name="contractUri">A string.</param>
        /// <param name="uriRole">An ethereum address.</param>
        /// <param name="uri">A string.</param>
        public DeployTokenURIRequestContractParams(string _0 = default(string), string _1 = default(string), string _2 = default(string), string _3 = default(string), string admin = default(string), string contractUri = default(string), string uriRole = default(string), string uri = default(string))
        {
            this._0 = _0;
            this._1 = _1;
            this._2 = _2;
            this._3 = _3;
            this.Admin = admin;
            this.ContractUri = contractUri;
            this.UriRole = uriRole;
            this.Uri = uri;
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
        [DataMember(Name = "_uriRole", EmitDefaultValue = false)]
        public string UriRole { get; set; }

        /// <summary>
        /// A string
        /// </summary>
        /// <value>A string</value>
        [DataMember(Name = "_uri", EmitDefaultValue = false)]
        public string Uri { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class DeployTokenURIRequestContractParams {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  _1: ").Append(_1).Append("\n");
            sb.Append("  _2: ").Append(_2).Append("\n");
            sb.Append("  _3: ").Append(_3).Append("\n");
            sb.Append("  Admin: ").Append(Admin).Append("\n");
            sb.Append("  ContractUri: ").Append(ContractUri).Append("\n");
            sb.Append("  UriRole: ").Append(UriRole).Append("\n");
            sb.Append("  Uri: ").Append(Uri).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as DeployTokenURIRequestContractParams).AreEqual;
        }

        /// <summary>
        /// Returns true if DeployTokenURIRequestContractParams instances are equal
        /// </summary>
        /// <param name="input">Instance of DeployTokenURIRequestContractParams to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(DeployTokenURIRequestContractParams input)
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
                if (this.Admin != null)
                {
                    hashCode = (hashCode * 59) + this.Admin.GetHashCode();
                }
                if (this.ContractUri != null)
                {
                    hashCode = (hashCode * 59) + this.ContractUri.GetHashCode();
                }
                if (this.UriRole != null)
                {
                    hashCode = (hashCode * 59) + this.UriRole.GetHashCode();
                }
                if (this.Uri != null)
                {
                    hashCode = (hashCode * 59) + this.Uri.GetHashCode();
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

            // Admin (string) pattern
            Regex regexAdmin = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexAdmin.Match(this.Admin).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for Admin, must match a pattern of " + regexAdmin, new [] { "Admin" });
            }

            // UriRole (string) pattern
            Regex regexUriRole = new Regex(@"0x([a-fA-F0-9]){40}", RegexOptions.CultureInvariant);
            if (false == regexUriRole.Match(this.UriRole).Success)
            {
                yield return new System.ComponentModel.DataAnnotations.ValidationResult("Invalid value for UriRole, must match a pattern of " + regexUriRole, new [] { "UriRole" });
            }

            yield break;
        }
    }

}
