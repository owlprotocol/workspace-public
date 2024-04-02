import { assert } from 'chai';
import { NFTGenerativeCollectionClass } from './NFTGenerativeCollectionClass.js';
import { NFTGenerativeCollectionArrayified } from '../../types/NFTGenerativeCollectionArrayified.js';

describe('NFTGenerativeCollectionClass.test.ts', async () => {
    it('fromArrayifiedData', async () => {
        const collectionArrayified = {
            name: 'test',
            traits: [
                { name: 'numberB', type: 'number', min: 0, max: 10 },
                { name: 'numberA', type: 'number', min: 0, max: 10 },
            ],
        };

        const collectionClass = NFTGenerativeCollectionClass.fromArrayifiedData(collectionArrayified);
        console.log(collectionClass.traitKeys());
        // console.log(collectionClass.traits['numberB'].getJsonFormat());
        const json = collectionClass.getJsonMetadata();
        const traitKeys = Object.keys(json.traits);
        assert.lengthOf(traitKeys, 2);
        assert.equal(traitKeys[0], 'numberB');
        assert.equal(traitKeys[1], 'numberA');
    });

    it('getArrayifiedMetadata', async () => {
        const collection = {
            name: 'test',
            traits: {
                numberB: { name: 'numberB', type: 'number', min: 0, max: 10 },
                numberA: { name: 'numberA', type: 'number', min: 0, max: 10 },
            },
        };

        const collectionClass = NFTGenerativeCollectionClass.fromData(collection);
        console.log(collectionClass.getJsonMetadata());
        const result = collectionClass.getArrayifiedMetadata();
        assert.lengthOf(result.traits, 2);
        assert.equal(result.traits[0].name, 'numberB');
        assert.equal(result.traits[1].name, 'numberA');
    });

    it('getArrayifiedMetadataWithChildren', async () => {
        const testChild2 = {
            name: 'testChild2',
            traits: { numberD: { name: 'numberD', type: 'number', min: 0, max: 10 } },
        };

        const testChild1 = {
            name: 'testChild1',
            traits: { numberC: { name: 'numberC', type: 'number', min: 0, max: 10 } },
        };
        const collection = {
            name: 'test',
            traits: {
                numberB: { name: 'numberB', type: 'number', min: 0, max: 10 },
                numberA: { name: 'numberA', type: 'number', min: 0, max: 10 },
            },
            children: { testChild2, testChild1 },
        };

        // @ts-expect-error fromData input type does not expect children
        const collectionClass = NFTGenerativeCollectionClass.fromData(collection);
        console.log(collectionClass.getJsonMetadata());
        const result = collectionClass.getArrayifiedMetadataWithChildren();
        assert.exists(result.traits);
        assert.lengthOf(result.traits, 2);
        assert.equal(result.traits[0].name, 'numberB');
        assert.equal(result.traits[1].name, 'numberA');

        assert.exists(result['children'], 'children exist');
        // TODO remove this once type expects children
        const children = result['children'] as NFTGenerativeCollectionArrayified[];
        assert.lengthOf(children, 2);
        assert.equal(children[0].name, 'testChild2');
        assert.equal(children[1].name, 'testChild1');
    });
});
