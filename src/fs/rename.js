import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/';
const OLD_NAME = 'wrongFilename.txt';
const NEW_NAME = 'properFilename.md';

const rename = async () => {
    return await fsPromises.stat(`${_dirname}${PATH}${NEW_NAME}`)
        .then((stat) => {
                if (stat.isFile()) {
                    throw new Error('FS operation failed');
                }
            }, (error) => {
                if (error.code === 'ENOENT') {
                    return fsPromises.stat(`${_dirname}${PATH}${OLD_NAME}`);
                }

                throw new Error('FS operation failed');
            })
        .then((stat) => {
            if (stat.isFile()) {
                return fsPromises.rename(`${_dirname}${PATH}${OLD_NAME}`, `${_dirname}${PATH}${NEW_NAME}`);
            }

            throw new Error('FS operation failed');
        })
        .catch((error) => {
            if (error.code === 'ENOENT') {
                throw new Error('FS operation failed');
            }

            console.error(error);
        })
};

await rename();