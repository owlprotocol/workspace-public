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
    /// InterfacesIContractURIContractURI200ResponseResult
    /// </summary>
    [DataContract(Name = "interfaces_IContractURI_contractURI_200_response_result")]
    public partial class InterfacesIContractURIContractURI200ResponseResult : IEquatable<InterfacesIContractURIContractURI200ResponseResult>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InterfacesIContractURIContractURI200ResponseResult" /> class.
        /// </summary>
        /// <param name="_0">A string.</param>
        /// <param name="">A string.</param>
        public InterfacesIContractURIContractURI200ResponseResult(string _0 = default(string), string  = default(string))
        {
            this._0 = _0;
            this. = ;
        }

        /// <summary>
        /// A string
        /// </summary>
        /// <value>A string</value>
        [DataMember(Name = "0", EmitDefaultValue = false)]
        public string _0 { get; set; }

        /// <summary>
        /// A string
        /// </summary>
        /// <value>A string</value>
        [DataMember(Name = "", EmitDefaultValue = false)]
        public string  { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class InterfacesIContractURIContractURI200ResponseResult {\n");
            sb.Append("  _0: ").Append(_0).Append("\n");
            sb.Append("  : ").Append().Append("\n");
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
            return OpenAPIClientUtils.compareLogic.Compare(this, input as InterfacesIContractURIContractURI200ResponseResult).AreEqual;
        }

        /// <summary>
        /// Returns true if InterfacesIContractURIContractURI200ResponseResult instances are equal
        /// </summary>
        /// <param name="input">Instance of InterfacesIContractURIContractURI200ResponseResult to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InterfacesIContractURIContractURI200ResponseResult input)
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
                if (this. != null)
                {
                    hashCode = (hashCode * 59) + this..GetHashCode();
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