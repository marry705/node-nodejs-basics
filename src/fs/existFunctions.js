import { constants, access, stat } from 'fs/promises';

export const isFileExists = async (path) => {
    try {
        await access(path, constants.F_OK);

        return true;
    } catch {
        return false;
    }
}

export const isDirExists = async (path) => {
    try {
        const pathStat = await stat(path);

        return pathStat.isDirectory();
    } catch {
        return false;
    }
}

export const isFileReadable = async (path) => {
    try {
        await access(path, constants.F_OK | constants.R_OK);

        return true;
    } catch {
        return false;
    }
}