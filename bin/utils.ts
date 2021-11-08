import {promisify} from 'util';
import fastFolderSize from 'fast-folder-size';

// https://stackoverflow.com/a/39906526
const niceBytes = (x: string) => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let l = 0, n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
};

const getFolderSize = async (path: string) => {
    const fastFolderSizeAsync = promisify(fastFolderSize);
    const bytes = await fastFolderSizeAsync(path);
    return niceBytes(bytes!.toString());
};

export {
    niceBytes,
    getFolderSize
};