import { access, constants, rename as prRename } from 'fs/promises';

import { fileURLToPath } from 'url';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/';
const OLD_NAME = 'wrongFilename.txt';
const NEW_NAME = 'properFilename.md';

const isFileExists = async (path) => {
    try {
        await access(path, constants.F_OK);

        return true;
    } catch {
        return false;
    }
}

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