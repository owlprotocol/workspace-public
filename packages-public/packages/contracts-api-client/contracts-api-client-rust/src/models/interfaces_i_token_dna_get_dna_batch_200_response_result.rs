/*
 * Owl Contract Api
 *
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 * Generated by: https://openapi-generator.tech
 */




#[derive(Clone, Debug, PartialEq, Default, Serialize, Deserialize)]
pub struct InterfacesITokenDnaGetDnaBatch200ResponseResult {
    #[serde(rename = "0", skip_serializing_if = "Option::is_none")]
    pub param_0: Option<Vec<String>>,
    #[serde(rename = "", skip_serializing_if = "Option::is_none")]
    pub : Option<Vec<String>>,
}

impl InterfacesITokenDnaGetDnaBatch200ResponseResult {
    pub fn new() -> InterfacesITokenDnaGetDnaBatch200ResponseResult {
        InterfacesITokenDnaGetDnaBatch200ResponseResult {
            param_0: None,
            : None,
        }
    }
}


