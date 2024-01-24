import { NFTCollection } from './NFTCollection.js';
import { NFTGenerativeTraitBase } from './NFTGenerativeTrait/NFTGenerativeTraitBase.js';

/**
 * NFTGenerativeCollectionArrayified Interface describing a generative collection.
 * Traits and children are both arrays to preserve ordering. This is necessary with Firebase for example, where map keys are ordered alphabetically.
 */
export interface NFTGenerativeCollectionArrayified<
    T extends Array<NFTGenerativeTraitBase> = Array<NFTGenerativeTraitBase>,
    C extends Array<NFTGenerativeCollectionArrayified> | undefined = undefined,
> extends NFTCollection {
    readonly traits: T;
    readonly children?: C;
    readonly generatedImageType?: 'svg' | 'png';
}
