import { createWriteStream } from 'fs';

import { fileURLToPath } from 'url';
import { stdin } from 'process';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToWrite.txt';

const write = async () => {
    const writeStream = createWriteStream(`${_dirname}${PATH}`);
    stdin.pipe(writeStream);
};

await write();