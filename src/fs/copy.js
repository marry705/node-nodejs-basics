import * as fsPromises from 'fs/promises';
import * as fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const PATH = '/files';
const COPY_PATH = '/files_copy';

const copy = async () => {
    fs.stat(`${_dirname}${COPY_PATH}`, async (error, stat) => {
        if (stat?.isDirectory()) {
            throw new Error('FS operation failed');
        }

        if (error?.code === 'ENOENT') {
            await fsPromises.stat(`${_dirname}${PATH}`)
                .then((stat) => {
                    if (stat.isDirectory()) {
                        return fsPromises.mkdir(`${_dirname}${COPY_PATH}`);
                    }

                    throw new Error('path error');
                })
                .then(() => fsPromises.readdir(`${_dirname}${PATH}`))
                .then((files) => Promise.all(
                    files.map((file) => {
                        const source = join(`${_dirname}${PATH}`, file);
                        const destination = join(`${_dirname}${COPY_PATH}`, file);
                        return fsPromises.copyFile(source, destination);
                    })
                ))
                .catch((error) => {
                    if (error.code === 'ENOENT') {
                        throw new Error('FS operation failed');
                    }

                    console.log(error);
                })
        }
    });
};

copy();