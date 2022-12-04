import { createReadStream } from 'fs';

import { fileURLToPath } from 'url';
import { isFileReadable } from '../fs/existFunctions.js';

const { createHash } = await import('crypto');

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToCalculateHashFor.txt';

const calculateHash = async () => {
    try {
        if (!(await isFileReadable(`${_dirname}${PATH}`))) { 
            throw new Error('FS operation failed');
        }

        const hash = createHash('sha256');
        const readStream = createReadStream(`${_dirname}${PATH}`);

        readStream.pipe(hash);
        readStream.on('end', () => {
            console.log(hash.digest('hex'));
        });
    } catch (error) {
        console.error(error);
    }
};

await calculateHash();