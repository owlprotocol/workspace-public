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
    /// InterfacesIContractURIContractURI200Response
    /// </summary>
    [DataContract(Name = "interfaces_IContractURI_contractURI_200_response")]
    public partial class InterfacesIContractURIContractURI200Response : IEquatable<InterfacesIContractURIContractURI200Response>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIContractURIContractURI200Response" /> class.
        /// </summary>
        [JsonConstructorAttribute]
        protected InterfacesIContractURIContractURI200Response() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIContractURIContractURI200Response" /> class.
        /// </summary>
        /// <param name="contractParams">contractParams (required).</param>
        /// <param name="result">result (required).</param>
        public InterfacesIContractURIContractURI200Response(Object contractParams = default(Object), InterfacesIContractURIContractURI200ResponseResult result = default(InterfacesIContractURIContractURI200ResponseResult))
        {
            // to ensure "contractParams" is required (not null)
            if (contractParams == null)
            {
                throw new ArgumentNullException("contractParams is a required property for InterfacesIContractURIContractURI200Response and cannot be null");
            }
            this.ContractParams = contractParams;
            // to ensure "result" is required (not null)
            if (result == null)
            {
                throw new ArgumentNullException("result is a required property for InterfacesIContractURIContractURI200Response and cannot be null");
            }
            this.Result = result;
        }

        /// <summary>
        /// Gets or Sets ContractParams
        /// </summary>
        [DataMember(Name = "contractParams", IsRequired = true, EmitDefaultValue = true)]
        public Object ContractParams { get; set; }

        /// <summary>
        /// Gets or Sets Result
        /// </summary>
        [DataMember(Name = "result", IsRequired = true, EmitDefaultValue = true)]
        public InterfacesIContractURIContractURI200ResponseResult Result { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIContractURIContractURI200Response {\n");
            sb.Append("  ContractParams: ").Append(ContractParams).Append("\n");
            sb.Append("  Result: ").Append(Result).Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIContractURIContractURI200Response).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIContractURIContractURI200Response instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIContractURIContractURI200Response to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIContractURIContractURI200Response input)
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
                if (this.Result != null)
                {
                    hashCode = (hashCode * 59) + this.Result.GetHashCode();
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
