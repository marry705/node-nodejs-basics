import { readFile } from 'fs/promises';

import { fileURLToPath } from 'url';
import { isFileReadable } from './existFunctions.js';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToRead.txt';

const read = async () => {
    try {
        if (!(await isFileReadable(`${_dirname}${PATH}`))) { 
            throw new Error('FS operation failed');
        }

        const text = await readFile(`${_dirname}${PATH}`, 'utf-8');
        console.log(text);
    } catch(error) {
        console.error(error);
    }
};

await read();