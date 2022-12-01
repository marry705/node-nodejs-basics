import { access, constants, readFile } from 'fs/promises';

import { fileURLToPath } from 'url';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToRead.txt';

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

const read = async () => {
    try {
        if (await isFileNotExists(`${_dirname}${PATH}`)
            || await isFileNotReadable(`${_dirname}${PATH}`)) { 
            throw new Error('FS operation failed');
        }

        const text = await readFile(`${_dirname}${PATH}`, 'utf-8');
        console.log(text);
    } catch(error) {
        console.error(error);
    }
};

await read();