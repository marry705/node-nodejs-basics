import { stat as prStat, readdir } from 'fs/promises';

import { fileURLToPath } from 'url';

const _dirname = fileURLToPath(new URL('.', import.meta.url));

const DIR = '/files';

const isDirExists = async (path) => {
    try {
        const stat = await prStat(path);

        return stat.isDirectory();
    } catch {
        return false;
    }
}

const list = async () => {
    try {
        if (!(await isDirExists(`${_dirname}${DIR}`))) {
            throw new Error('FS operation failed');
        }

        const files = await readdir(`${_dirname}${DIR}`);

        if (files.length) {
            console.log(files);
        }
    } catch (error) {
        console.error(error);
    }  
};

await list();