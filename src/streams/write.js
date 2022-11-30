import * as fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { stdin } from 'process';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fileToWrite.txt';

const write = async () => {
    const writeStream = fs.createWriteStream(`${_dirname}${PATH}`);
    stdin.pipe(writeStream);
};

await write();