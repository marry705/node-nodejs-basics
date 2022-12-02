import { rename as prRename } from 'fs/promises';

import { fileURLToPath } from 'url';
import { isFileExists } from './existFunctions.js';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/';
const OLD_NAME = 'wrongFilename.txt';
const NEW_NAME = 'properFilename.md';

const rename = async () => {
    try {
        if (await isFileExists(`${_dirname}${PATH}${NEW_NAME}`)
            || !(await isFileExists(`${_dirname}${PATH}${OLD_NAME}`))) {
            throw new Error('FS operation failed');
        }

        await prRename(`${_dirname}${PATH}${OLD_NAME}`, `${_dirname}${PATH}${NEW_NAME}`);
    } catch(error) {
        console.error(error);
    }
};

await rename();