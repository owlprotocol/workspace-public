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
    /// InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest
    /// </summary>
    [DataContract(Name = "interfaces_IERC721Enumerable_tokenOfOwnerByIndex_request")]
    public partial class InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest : IEquatable<InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest" /> class.
        /// </summary>
        [JsonConstructorAttribute]
        protected InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest" /> class.
        /// </summary>
        /// <param name="contractParams">contractParams (required).</param>
        public InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest(InterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams contractParams = default(InterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams))
        {
            // to ensure "contractParams" is required (not null)
            if (contractParams == null)
            {
                throw new ArgumentNullException("contractParams is a required property for InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest and cannot be null");
            }
            this.ContractParams = contractParams;
        }

        /// <summary>
        /// Gets or Sets ContractParams
        /// </summary>
        [DataMember(Name = "contractParams", IsRequired = true, EmitDefaultValue = true)]
        public InterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams ContractParams { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest {\n");
            sb.Append("  ContractParams: ").Append(ContractParams).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest input)
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
                if (this.ContractParams != null)
                {
                    hashCode = (hashCode * 59) + this.ContractParams.GetHashCode();
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