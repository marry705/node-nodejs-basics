import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fileToRead.txt';

const read = async () => {
    return await fsPromises.stat(`${_dirname}${PATH}`)
        .then((stat) => {
            if (stat.isFile()) {
                return fsPromises.readFile(`${_dirname}${PATH}`, 'utf-8');
            }

            throw new Error('FS operation failed');
        })
        .then((text) => console.log(text))
        .catch((error) => {
            if (error.code === 'ENOENT') {
                throw new Error('FS operation failed');
            }

            console.error(error);
        }); 
};

await read();