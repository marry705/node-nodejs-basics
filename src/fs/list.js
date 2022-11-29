import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files';

const list = async () => {
    return await fsPromises.stat(`${_dirname}${PATH}`)
        .then((stat) => {
            if (stat.isDirectory()) {
                return fsPromises.readdir(`${_dirname}${PATH}`);
            }

            throw new Error('FS operation failed');
        })
        .then((files) => {
            if (files.length) {
                return console.log(files);
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

await list();