import { writeFile } from 'fs/promises';

import { fileURLToPath } from 'url';
import { isFileExists } from './existFunctions.js';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fresh.txt';
const TEXT = 'I am fresh and young';

const create = async () => {
    try {
        if (await isFileExists(`${_dirname}${PATH}`)) {
            throw new Error('FS operation failed');
        }

        await writeFile(`${_dirname}${PATH}`, TEXT);
    } catch (error) {
        console.error(error);
    }    
};

await create();