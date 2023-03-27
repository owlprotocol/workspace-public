import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

export const NODE_ENV = process.env.NODE_ENV || 'development';

let defaultEnv = '';
if (NODE_ENV === 'production') defaultEnv = '.env';
else if (NODE_ENV === 'development') defaultEnv = '.env.development';
else if (NODE_ENV === 'test') defaultEnv = '.env.test';
else if (NODE_ENV === 'mumbai') defaultEnv = '.env.mumbai';

const envFile = path.resolve(process.cwd(), defaultEnv);

dotenv.config({ path: envFile, override: true });

export const NETWORK = process.env.NETWORK;
export const HD_WALLET_MNEMONIC = process.env.HD_WALLET_MNEMONIC;

export const PRIVATE_KEY_0 = process.env.PRIVATE_KEY_0;
