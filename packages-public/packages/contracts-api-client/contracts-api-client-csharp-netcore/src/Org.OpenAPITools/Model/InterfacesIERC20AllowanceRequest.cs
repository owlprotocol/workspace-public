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
    /// InterfacesIERC20AllowanceRequest
    /// </summary>
    [DataContract(Name = "interfaces_IERC20_allowance_request")]
    public partial class InterfacesIERC20AllowanceRequest : IEquatable<InterfacesIERC20AllowanceRequest>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIERC20AllowanceRequest" /> class.
        /// </summary>
        [JsonConstructorAttribute]
        protected InterfacesIERC20AllowanceRequest() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIERC20AllowanceRequest" /> class.
        /// </summary>
        /// <param name="contractParams">contractParams (required).</param>
        public InterfacesIERC20AllowanceRequest(InterfacesIERC20AllowanceRequestContractParams contractParams = default(InterfacesIERC20AllowanceRequestContractParams))
        {
            // to ensure "contractParams" is required (not null)
            if (contractParams == null)
            {
                throw new ArgumentNullException("contractParams is a required property for InterfacesIERC20AllowanceRequest and cannot be null");
            }
            this.ContractParams = contractParams;
        }

        /// <summary>
        /// Gets or Sets ContractParams
        /// </summary>
        [DataMember(Name = "contractParams", IsRequired = true, EmitDefaultValue = true)]
        public InterfacesIERC20AllowanceRequestContractParams ContractParams { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIERC20AllowanceRequest {\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIERC20AllowanceRequest).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIERC20AllowanceRequest instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIERC20AllowanceRequest to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIERC20AllowanceRequest input)
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
