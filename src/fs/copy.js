import { stat as prStat, mkdir, readdir, copyFile } from 'fs/promises';

import { fileURLToPath } from 'url';
import { join } from 'path';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const DIR = '/files';
const COPY_DIR = '/files_copy';

const isDirExists = async (path) => {
    try {
        const stat = await prStat(path);

        return stat.isDirectory();
    } catch {
        return false;
    }
}

const copy = async () => {
    try {
        if (await isDirExists(`${_dirname}${COPY_DIR}`)
            || !(await isDirExists(`${_dirname}${DIR}`))) {
            throw new Error('FS operation failed');
        }

        await mkdir(`${_dirname}${COPY_DIR}`);
        const files = await readdir(`${_dirname}${DIR}`);

        await Promise.allSettled(
            files.map((file) => {
                const source = join(`${_dirname}${DIR}`, file);
                const destination = join(`${_dirname}${COPY_DIR}`, file);
                copyFile(source, destination);
            })
        );
    } catch (error) {
        console.error(error);
    }
};

copy();