import * as fsPromises from 'fs/promises';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const { createHash } = await import('crypto');

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fileToCalculateHashFor.txt';

const calculateHash = async () => {
    return await fsPromises.access(`${_dirname}${PATH}`, fsPromises.constants.R_OK)
        .then(() => fsPromises.readFile(`${_dirname}${PATH}`))
        .then((inputData) => {
            const hash = createHash('sha256').update(inputData).digest('hex');

            console.log(hash);
        })
        .catch((error) => console.error(error))
};

await calculateHash();