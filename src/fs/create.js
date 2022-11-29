import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fresh.txt';
const TEXT = 'I am fresh and young';

const create = async () => {
    return await fsPromises.access(`${_dirname}${PATH}`, fsPromises.constants.F_OK)
        .then(() => {
            throw new Error('FS operation failed');
        })
        .catch((error) => {
            if (error.code === 'ENOENT') {
                return fsPromises.writeFile(`${_dirname}${PATH}`, TEXT);
            }

            console.error(error);
        });
};

await create();