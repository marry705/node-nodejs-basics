import { access, constants, rm } from 'fs/promises';

import { fileURLToPath } from 'url';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToRemove.txt';

const isFileExists = async (path) => {
    try {
        await access(path, constants.F_OK);

        return true;
    } catch {
        return false;
    }
}

const remove = async () => {
    try {
        if (!await isFileExists(`${_dirname}${PATH}`)) {
            throw new Error('FS operation failed');
        }

        await rm(`${_dirname}${PATH}`);
    } catch(error) {
        console.error(error);
    }
};

await remove();