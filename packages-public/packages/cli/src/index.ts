import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as generateJsonSchema from './commands/generateJsonSchema.js';
import * as generateItemNFT from './commands/generateItemNFT.js';
import * as generateRandomNFT from './commands/generateRandomNFT.js';
import * as deployTopDown from './commands/deployTopDown.js';
import * as detachTopDown from './commands/detachTopDown.js';
import * as viewTopDown from './commands/viewTopDown.js';
import * as updateDnaNFT from './commands/updateDnaNFT.js';
import * as burnNFT from './commands/burnNFT.js';
import * as deployCommon from './commands/deployCommon.js';

yargs(hideBin(process.argv))
    // .describe('config', 'Path to the config file. Default: "config/default.json"')
    .command(generateJsonSchema)
    .command(generateItemNFT)
    .example(generateItemNFT.example, generateItemNFT.exampleDescription)
    .command(generateRandomNFT)
    .example(generateRandomNFT.example, generateRandomNFT.exampleDescription)
    .command(deployTopDown)
    .example(deployTopDown.example, deployTopDown.exampleDescription)
    .command(detachTopDown)
    .example(detachTopDown.example, detachTopDown.exampleDescription)
    .command(viewTopDown)
    .example(viewTopDown.example, viewTopDown.exampleDescription)
    .command(updateDnaNFT)
    .example(updateDnaNFT.example, updateDnaNFT.exampleDescription)
    .example(updateDnaNFT.example, updateDnaNFT.exampleDescription2)
    .command(burnNFT)
    .example(burnNFT.example, burnNFT.exampleDescription)
    .command(deployCommon)
    .example(deployCommon.example, deployCommon.exampleDescription)
    .demandCommand()
    .recommendCommands()
    .wrap(null)
    .help().argv;
