import { access, constants } from 'fs/promises';
import { createReadStream } from 'fs';

import { fileURLToPath } from 'url';

const { createHash } = await import('crypto');

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToCalculateHashFor.txt';

const isFileNotExists = async (path) => {
    try {
        await access(path, constants.F_OK);

        return false;
    } catch {
        return true;
    }
}

const isFileNotReadable = async (path) => {
    try {
        await access(path, constants.R_OK);

        return false;
    } catch {
        return true;
    }
}

const calculateHash = async () => {
    try {
        if (await isFileNotExists(`${_dirname}${PATH}`)
            || await isFileNotReadable(`${_dirname}${PATH}`)) { 
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