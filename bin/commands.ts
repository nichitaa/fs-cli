import {IDir} from './interfaces';
import {getFolderSize, niceBytes} from './utils';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

class Commands {
    private static _instance: Commands;

    private constructor() {}

    public static getInstance(): Commands {
        if (!Commands._instance) {
            Commands._instance = new Commands();
        }
        return Commands._instance;
    }

    public async ldir() {
        try {
            const map: IDir[] = [];
            const dirSize = await getFolderSize(path.resolve(process.cwd()));
            map.push({name: `Current folder: ${path.basename(process.cwd())}`, size: dirSize});

            const files = fs.readdirSync(path.resolve(process.cwd()));
            for (let file of files) {
                const stats = fs.statSync(path.resolve(process.cwd(), file));

                if (stats.isFile()) {
                    map.push({name: file, size: niceBytes(stats.size.toString())});
                } else if (stats.isDirectory()) {

                    const bytes = await getFolderSize(path.resolve(process.cwd(), file));
                    map.push({name: file, size: bytes});
                }

            }
            console.table(map);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    public async ndir(args: string[]) {
        if (args.length > 1) {
            const newDirName = args[1];
            try {
                mkdirp.sync(path.join(process.cwd(), newDirName));
                console.log(`Directory - ${newDirName} was created successfully!`);
            } catch (err) {
                console.log(`Error on creating directory - ${newDirName}, err - ${err}`);
            }
        } else {
            console.log('Error: please give a name to the directory!');
        }
    }

    public async nfile(args: string[]) {
        if (args.length > 1) {
            const newFileName = args[1];
            try {
                fs.writeFileSync(path.join(process.cwd(), newFileName), '');
                console.log(`File - ${newFileName} was created successfully!`);
            } catch (err) {
                console.log(`Error on creating file- ${newFileName}, err - ${err}`);
            }
        } else {
            console.log('Error: please give a name to the file!');
        }
    }

}

export default Commands;