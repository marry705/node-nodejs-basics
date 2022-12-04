import { createReadStream, createWriteStream } from 'fs';
import { createUnzip } from 'zlib';

import { fileURLToPath } from 'url';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToCompress.txt';
const ZIP_PATH = '/files/archive.gz';

const decompress = async () => {
    const inputFile = createReadStream(`${_dirname}${ZIP_PATH}`);
    const outputFile = createWriteStream(`${_dirname}${PATH}`);

    inputFile.pipe(createUnzip()).pipe(outputFile);
};

await decompress();