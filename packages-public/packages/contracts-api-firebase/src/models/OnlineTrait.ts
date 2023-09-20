/*
 * OnlineTrait is a DNA trait, and its data source.
 * `trait` is the trait name.
 * `url` is that of the data source.
 * `jsonPath` is the key of the data to parse in the JSON body of the `url`
 */
export interface OnlineTrait {
    trait: string;
    url: string;
    jsonPath: string;
}
