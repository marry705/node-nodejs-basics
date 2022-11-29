import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/';
const OLD_NAME = 'wrongFilename.txt';
const NEW_NAME = 'properFilename.md';

const rename = async () => {
    return await fsPromises.access(`${_dirname}${PATH}${NEW_NAME}`, fsPromises.constants.F_OK)
        .then(() => {
                throw new Error('FS operation failed');
            }, (error) => {
                if (error.code === 'ENOENT') {
                    return fsPromises.access(`${_dirname}${PATH}${OLD_NAME}`, fsPromises.constants.F_OK);
                }

                return error;
            })
        .then(() => fsPromises.rename(`${_dirname}${PATH}${OLD_NAME}`, `${_dirname}${PATH}${NEW_NAME}`))
        .catch((error) => console.error(error))
};

await rename();