import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

import { fileURLToPath } from 'url';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToCompress.txt';
const ZIP_PATH = '/files/archive.gz';

const compress = async () => {
    const inputFile = createReadStream(`${_dirname}${PATH}`);
    const outputFile = createWriteStream(`${_dirname}${ZIP_PATH}`);

    inputFile.pipe(createGzip()).pipe(outputFile); 
};

await compress();