import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fileToRead.txt';

const read = async () => {
    return await fsPromises.access(`${_dirname}${PATH}`, fsPromises.constants.R_OK)
        .then(() => fsPromises.readFile(`${_dirname}${PATH}`, 'utf-8'))
        .then((text) => console.log(text))
        .catch((error) => {
            if (error.code === 'ENOENT') {
                console.error('FS operation failed');
            }

            console.error(error);
        }); 
};

await read();