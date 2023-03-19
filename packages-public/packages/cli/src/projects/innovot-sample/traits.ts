import { NFTGenerativeTraitEnum, NFTGenerativeTraitImage } from '@owlprotocol/nft-sdk';

export const traitEnumName: NFTGenerativeTraitEnum = {
    name: 'Name',
    type: 'enum',
    options: ['Unnamed', 'Hussle', 'Mann', 'NerD', 'PaC'],
    abi: 'uint16'
}

export const traitEnumSignificance: NFTGenerativeTraitEnum = {
    name: 'Significance',
    type: 'enum',
    options: ['N/A', 'Inattention', 'Impulsivity', 'Hyperactivity']
}

export const traitImageBg: NFTGenerativeTraitImage = {
    name: 'Background [The Environment]',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'None',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Orange',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        }
    ]
}

export const traitImageLight: NFTGenerativeTraitImage = {
    name: 'Light Bulb [The Treatment]',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Blue [Medication]',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Yellow [Mindful Meditation]',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        }
    ]
}

export const traitImageBase: NFTGenerativeTraitImage = {
    name: 'Base [The Source]',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Default',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        }
    ]
}

export const traitImageOutfit: NFTGenerativeTraitImage = {
    name: 'Outfit [The Symptoms]',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Party - Suit 2',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Thread Haus - Blue Hoodie',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        }
    ]
}

export const traitImageGlasses: NFTGenerativeTraitImage = {
    name: 'Glasses [The Appearance]',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Party - Glasses 17',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Thread Haus - Kani Glasses',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        }
    ]
}

export const traitImageHat: NFTGenerativeTraitImage = {
    name: 'Hat [The Appearance]',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Sport - Blue Baseball Cap',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Military - R3 Crew Cap Camo',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        }
    ]
}

export const traitImageFacialHair: NFTGenerativeTraitImage = {
    name: 'Facial Hair [Identity]',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Facial Hair 1',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Flat Beard 2',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        }
    ]
}
