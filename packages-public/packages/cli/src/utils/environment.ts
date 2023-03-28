import * as dotenv from 'dotenv';
import path from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

process.env.NODE_ENV = NODE_ENV;

const envFilePath = `.env.${NODE_ENV}`;
const envFile = path.resolve(process.cwd(), envFilePath);

const dotenvResult = dotenv.config({ path: envFile, override: true });

if (dotenvResult.error && (!process.env.NETWORK || (!process.env.HD_WALLET_MNEMONIC && !process.env.PRIVATE_KEY_0))) {
    console.error(dotenvResult.error);
}

// TODO: Since we are overriding, we should warn developer if something is overwritten
export const NETWORK = process.env.NETWORK;
export const HD_WALLET_MNEMONIC = process.env.HD_WALLET_MNEMONIC;
export const PRIVATE_KEY_0 = process.env.PRIVATE_KEY_0;
