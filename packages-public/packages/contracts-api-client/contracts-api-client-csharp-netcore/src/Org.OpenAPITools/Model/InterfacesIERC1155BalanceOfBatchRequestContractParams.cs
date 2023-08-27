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
    /// InterfacesIERC1155BalanceOfBatchRequestContractParams
    /// </summary>
    [DataContract(Name = "interfaces_IERC1155_balanceOfBatch_request_contractParams")]
    public partial class InterfacesIERC1155BalanceOfBatchRequestContractParams : IEquatable<InterfacesIERC1155BalanceOfBatchRequestContractParams>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIERC1155BalanceOfBatchRequestContractParams" /> class.
        /// </summary>
        /// <param name="_0">_0.</param>
        /// <param name="_1">_1.</param>
        /// <param name="accounts">accounts.</param>
        /// <param name="ids">ids.</param>
        public InterfacesIERC1155BalanceOfBatchRequestContractParams(List<string> _0 = default(List<string>), List<string> _1 = default(List<string>), List<string> accounts = default(List<string>), List<string> ids = default(List<string>))
        {
            this._0 = _0;
            this._1 = _1;
            this.Accounts = accounts;
            this.Ids = ids;
        }

        /// <summary>
        /// Gets or Sets _0
        /// </summary>
        [DataMember(Name = "0", EmitDefaultValue = false)]
        public List<string> _0 { get; set; }

        /// <summary>
        /// Gets or Sets _1
        /// </summary>
        [DataMember(Name = "1", EmitDefaultValue = false)]
        public List<string> _1 { get; set; }

        /// <summary>
        /// Gets or Sets Accounts
        /// </summary>
        [DataMember(Name = "accounts", EmitDefaultValue = false)]
        public List<string> Accounts { get; set; }

        /// <summary>
        /// Gets or Sets Ids
        /// </summary>
        [DataMember(Name = "ids", EmitDefaultValue = false)]
        public List<string> Ids { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIERC1155BalanceOfBatchRequestContractParams {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  _1: ").Append(_1).Append("\n");
            sb.Append("  Accounts: ").Append(Accounts).Append("\n");
            sb.Append("  Ids: ").Append(Ids).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIERC1155BalanceOfBatchRequestContractParams).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIERC1155BalanceOfBatchRequestContractParams instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIERC1155BalanceOfBatchRequestContractParams to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIERC1155BalanceOfBatchRequestContractParams input)
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
                if (this.Accounts != null)
                {
                    hashCode = (hashCode * 59) + this.Accounts.GetHashCode();
                }
                if (this.Ids != null)
                {
                    hashCode = (hashCode * 59) + this.Ids.GetHashCode();
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
            yield break;
        }
    }

}