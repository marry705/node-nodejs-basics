import { mkdir, readdir, copyFile } from 'fs/promises';

import { fileURLToPath } from 'url';
import { isDirExists } from './existFunctions.js';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const DIR = '/files';
const COPY_DIR = '/files_copy';

const copy = async () => {
    try {
        if (await isDirExists(`${_dirname}${COPY_DIR}`)
            || !(await isDirExists(`${_dirname}${DIR}`))) {
            throw new Error('FS operation failed');
        }

        await mkdir(`${_dirname}${COPY_DIR}`);
        const fileNames = await readdir(`${_dirname}${DIR}`);

        await Promise.allSettled(
            fileNames.map((file) => copyFile(`${_dirname}${DIR}/${file}`, `${_dirname}${COPY_DIR}/${file}`))
        );
    } catch (error) {
        console.error(error);
    }
};

copy();