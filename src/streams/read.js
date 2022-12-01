import { createReadStream } from 'fs';

import { fileURLToPath } from 'url';
import { stdout } from 'process';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const PATH = '/files/fileToRead.txt';

const read = async () => {
    const readStream = createReadStream(`${_dirname}${PATH}`);
    readStream.pipe(stdout);

    readStream.on('end', () => {
        stdout.end('\n');
    });
    
    readStream.on('error', (error)=>{
        throw new Error(error);
    });
};

await read();