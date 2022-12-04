import { rm } from 'fs/promises';

import { fileURLToPath } from 'url';
import { isFileExists } from './existFunctions.js';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToRemove.txt';

const remove = async () => {
    try {
        if (!(await isFileExists(`${_dirname}${PATH}`))) {
            throw new Error('FS operation failed');
        }

        await rm(`${_dirname}${PATH}`);
    } catch(error) {
        console.error(error);
    }
};

await remove();