import { readdir } from 'fs/promises';

import { fileURLToPath } from 'url';
import { isDirExists } from './existFunctions.js';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const DIR = '/files';

const list = async () => {
    try {
        if (!(await isDirExists(`${_dirname}${DIR}`))) {
            throw new Error('FS operation failed');
        }

        const files = await readdir(`${_dirname}${DIR}`);

        if (files.length) {
            console.log(files);
        }
    } catch (error) {
        console.error(error);
    }  
};

await list();