import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fileToRemove.txt';

const remove = async () => {
    return await fsPromises.access(`${_dirname}${PATH}`, fsPromises.constants.F_OK)
        .then(() => fsPromises.rm(`${_dirname}${PATH}`))
        .catch((error) => {
            if (error.code === 'ENOENT') {
                console.error('FS operation failed');
            }

            console.error(error);
        });
};

await remove();