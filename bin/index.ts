#! /usr/bin/env node

import yargs from 'yargs';
import {CommandsCli} from './enums';
import Commands from './commands';

const usage = `Usage: so <command> <args?>`;
const options = yargs
    .usage(usage)
    .option('c', {alias: 'commands', describe: 'List all the supported commands', type: 'boolean', demandOption: false})
    .help(true)
    .argv;


// @ts-ignore
if (yargs.argv.c == true || yargs.argv.commands == true) {
    console.log('\nAvailable commands: ');
    console.log(`${CommandsCli.LDIR} - list the content of current working directory ( :> so ${CommandsCli.LDIR} )`);
    console.log(`${CommandsCli.NDIR} - create new folder in current working directory ( :> so ${CommandsCli.NDIR} folder/otherFolder )`);
    console.log(`${CommandsCli.NFILE} - create new file in current working directory ( :> so ${CommandsCli.NFILE} index.ts ) \n`);
}


const main = async () => {

    // @ts-ignore
    const command: CommandsCli = yargs.argv._[0];

    const controller: Commands = Commands.getInstance();

    switch (command) {
        case CommandsCli.LDIR: {
            return await controller.ldir();
        }
        case CommandsCli.NDIR: {
            // @ts-ignore
            return await controller.ndir(yargs.argv._);
        }
        case CommandsCli.NFILE: {
            // @ts-ignore
            return await controller.nfile(yargs.argv._);
        }
    }

};


main();
