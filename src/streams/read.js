import * as fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { stdout } from 'process';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files/fileToRead.txt';

const read = async () => {
    const readStream = fs.createReadStream(`${_dirname}${PATH}`);
    readStream.pipe(stdout);
    readStream.on('end', () => {
        stdout.end('\n');
    });
};

await read();