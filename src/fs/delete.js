import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fileToRemove.txt';

const remove = async () => {
    return await fsPromises.stat(`${_dirname}${PATH}`)
        .then((stat) => {
            if (stat.isFile()) {
                return fsPromises.rm(`${_dirname}${PATH}`);
            }

            throw new Error('FS operation failed');
        })
        .catch((error) => {
            if (error.code === 'ENOENT') {
                throw new Error('FS operation failed');
            }

            console.error(error);
        });
};

await remove();