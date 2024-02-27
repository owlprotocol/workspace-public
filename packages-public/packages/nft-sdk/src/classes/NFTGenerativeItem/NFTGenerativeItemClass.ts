import { Options as MergeImagesOptions } from 'merge-images';
import { mapValues, omit, isObject } from 'lodash-es';
import type { NFTGenerativeItemInterface } from './NFTGenerativeItemInterface.js';
import type {
    AttributeSimple,
    AttributeValue,
    NFTGenerativeItem,
    NFTGenerativeItemJsonMetadata,
    NFTGenerativeTraitImageOption,
} from '../../types/index.js';
import type { NFTGenerativeCollectionInterface } from '../NFTGenerativeCollection/NFTGenerativeCollectionInterface.js';

export class NFTGenerativeItemClass<
    Collection extends NFTGenerativeCollectionInterface = NFTGenerativeCollectionInterface,
> implements NFTGenerativeItemInterface<Collection>
{
    readonly collection: Collection;
    readonly attributes: { [K in keyof Collection['traits']]: AttributeValue };
    readonly children: Collection['children'] extends Record<string, NFTGenerativeCollectionInterface>
        ? { [K in keyof Collection['children']]: NFTGenerativeItemInterface<Collection['children'][K]> }
        : undefined;

    private constructor({
        collection,
        attributes,
        children,
    }: {
        collection: NFTGenerativeCollectionInterface;
        attributes: NFTGenerativeItem['attributes'];
        children?: Record<string, NFTGenerativeItemInterface>;
    }) {
        //@ts-expect-error
        this.attributes = attributes;
        //@ts-expect-error
        this.collection = collection;
        //@ts-expect-error
        this.children = children;
    }
    withAttribute(name: keyof Collection['traits'], value: string | number): NFTGenerativeItemInterface<Collection> {
        return NFTGenerativeItemClass.fromAttributes({
            collection: this.collection,
            attributes: { ...this.attributes, [name]: value },
            //@ts-expect-error
            children: this.children,
        });
    }

    withChild(
        name: keyof Collection['children'],
        value: Collection['children'][keyof Collection['children']],
    ): NFTGenerativeItem<Collection> {
        return NFTGenerativeItemClass.fromAttributes({
            collection: this.collection,
            attributes: this.attributes,
            children: { ...this.children, [name]: value },
        });
    }

    //@ts-expect-error
    static fromAttributes({
        collection,
        attributes,
        children,
    }: {
        collection: NFTGenerativeCollectionInterface;
        attributes: NFTGenerativeItem['attributes'];
        children?: Record<string, NFTGenerativeItem | undefined>;
    }) {
        //@ts-expect-error
        const children2 =
            collection.children && children
                ? mapValues(collection.children, (col, k) => {
                      if (children[k]) {
                          return NFTGenerativeItemClass.fromAttributes({
                              //@ts-expect-error
                              collection: col,
                              attributes: (children[k] as NFTGenerativeItem).attributes,
                              children: (children[k] as NFTGenerativeItem).children,
                          });
                      }
                  })
                : undefined;

        return new NFTGenerativeItemClass({ collection, attributes, children: children2 });
    }

    genes() {
        return this.collection.attributesToGenes(this.attributes) as ReturnType<Collection['attributesToGenes']>;
    }
    genesWithChildren() {
        //TODO
        return this.collection.attributesToGenes(this.attributes) as ReturnType<
            Collection['attributesToGenesWithChildren']
        >;
    }

    dna() {
        return this.collection.attributesToDna(this.attributes) as ReturnType<Collection['attributesToDna']>;
    }
    dnaWithChildren(): ReturnType<Collection['attributesToDnaWithChildren']> {
        return this.collection.attributesToDnaWithChildren({
            attributes: this.attributes,
            children: this.children as any,
        }) as ReturnType<Collection['attributesToDnaWithChildren']>;
    }

    fullDna() {
        return this.collection.attributesToFullDna(this.attributes) as ReturnType<Collection['attributesToFullDna']>;
    }

    fullDnaWithChildren(): ReturnType<Collection['attributesToFullDnaWithChildren']> {
        return this.collection.attributesToFullDnaWithChildren({
            attributes: this.attributes,
            children: this.children as any,
        }) as ReturnType<Collection['attributesToFullDnaWithChildren']>;
    }

    attributesFormatted() {
        return this.collection.attributesToAttributesFormatted(this.attributes) as ReturnType<
            Collection['attributesToAttributesFormatted']
        >;
    }

    attributesFormattedWithChildren() {
        return this.collection.attributesToAttributesFormattedWithChildren({
            attributes: this.attributes,
            children: this.children as any,
        }) as ReturnType<Collection['attributesToAttributesFormattedWithChildren']>;
    }

    async getImage(mergeOptions?: MergeImagesOptions, width = 800, height = 800): Promise<string | undefined> {
        return this.collection.getImage(this.attributesFormatted(), mergeOptions, width, height);
    }

    async getImageWithChildren(
        mergeOptions?: MergeImagesOptions,
        width = 800,
        height = 800,
    ): Promise<string | undefined> {
        return this.collection.getImageWithChildren(
            this.attributesFormattedWithChildren(),
            mergeOptions,
            width,
            height,
        );
    }

    // TODO: pull image generation out of here
    async getJsonMetadata(mergeOptions?: MergeImagesOptions, width = 800, height = 800) {
        const imageBuff = await this.getImageWithChildren(mergeOptions, width, height);
        const attributesRaw = this.attributesFormatted();

        const attributes = [] as AttributeSimple[];

        mapValues(attributesRaw, (attr, traitName: string) => {
            let attribute: any;

            if (isObject(attr)) {
                attribute = attr;
                if (!!(attr as NFTGenerativeTraitImageOption).image_url) {
                    attribute = omit(attribute as any, ['image', 'image_url']);
                }

                attribute.name = this.collection.traits[traitName].name;
            } else {
                attribute = {
                    name: this.collection.traits[traitName].name,
                    value: attr,
                };
            }

            attributes.push(attribute);
        });

        const asJson: NFTGenerativeItemJsonMetadata = {
            name: this.collection.name,
            traits: attributes,
        };

        if (imageBuff) {
            const imageType = this.collection.generatedImageType;
            // @ts-ignore imageBuff is a buffer, but passed a string
            asJson.image = `${imageType === 'png' ? 'data:image/png;base64, ' : ''}${imageBuff.toString('base64')}`;
        }

        return asJson;
    }
}
