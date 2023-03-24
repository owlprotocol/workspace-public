import {NFTGenerativeTraitImage, NFTGenerativeTraitEnum, NFTGenerativeTraitNumber} from '@owlprotocol/nft-sdk';

export const attrMemberIdNumber: NFTGenerativeTraitNumber = {
    name: 'Member ID',
    type: 'number',
    description: `Owner's membership ID`,
    min: 1000000,
    max: 99999999999,
    abi: 'uint48',
};

export const attrTierEnum: NFTGenerativeTraitEnum = {
    name: 'Status Tier',
    type: 'enum',
    description: 'Status tier in the loyalty program, can be one of: General, Blue, Silver, Gold, Platinum, Diamond',
    options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'],
};

export const attrTierBgImage: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Basic',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-blue.png',
        },
        {
            value: 'Facets',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-silver.png',
        },
        {
            value: 'Swirls',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-purple.png',
        },
        {
            value: 'Dark',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-dark.png',
        },
        {
            value: 'Tunnels',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-squares.png',
        },
    ],
};

export const attrTierIconImage: NFTGenerativeTraitImage = {
    name: 'Tier Badge',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Bronze',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-bronze.png',
        },
        {
            value: 'Silver',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-silver.png',
        },
        {
            value: 'Gold',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-gold.png',
        },
        {
            value: 'Platinum',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-platinum.png',
        },
        {
            value: 'Diamond',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-diamond.png',
        },
    ],
};

export const attrPointsNumber: NFTGenerativeTraitNumber = {
    name: 'Points',
    type: 'number',
    description: 'Points collected from participation',
    min: 0,
    max: 16777215,
    abi: 'uint24',
};

export const attrCountryEnum: NFTGenerativeTraitEnum = {
    name: 'Country',
    type: 'enum',
    description: `Owner's country`,
    options: [
        'United Arab Emirates',
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        `Côte d'Ivoire`,
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo ',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czechia ',
        'Democratic Republic of the Congo',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini ',
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea',
        'Guyana',
        'Haiti',
        'Holy See',
        'Hong Kong',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar ',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Korea',
        'North Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestine State',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Korea',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor',
        'Togo',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Kingdom',
        'United States of America',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe',
    ],
};

export const attrSubGroupEnum: NFTGenerativeTraitEnum = {
    name: 'Sub Group',
    type: 'enum',
    description: 'The special subgroup the user is part of, if any',
    options: ['None', 'Yacht Club', 'Car Club', 'Diving Club'],
    abi: 'uint16', // overrides the 'uint8' default
};

export const attrLastTransferTimestampNumber: NFTGenerativeTraitNumber = {
    name: 'Last Transferred',
    type: 'number',
    description: 'Time this NFT was last transferred, as seconds since the epoch - JS time.now() / 1000',
    min: 0,
    max: 4294967295,
    abi: 'uint32',
};
