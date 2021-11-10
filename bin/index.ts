#! /usr/bin/env node

/**
 * <author> Pasecinic Nichita
 * */

import * as yargs from 'yargs';
import {CommandsCli} from './enums';
import Commands from './commands';

const usage = `Usage: so <command> <args?>`;
const options = yargs
    .usage(usage)
    .option('c', {alias: 'commands', describe: 'List all the supported commands', type: 'boolean', demandOption: false})
    .help(true)
    .argv;


if ((yargs.argv as any).c == true || (yargs.argv as any).commands == true) {
    console.log('\nAvailable commands: ');
    console.log(`${CommandsCli.LDIR} - list the content of current working directory ( :> so ${CommandsCli.LDIR} )`);
    console.log(`${CommandsCli.NDIR} - create new folder in current working directory ( :> so ${CommandsCli.NDIR} folder/otherFolder )`);
    console.log(`${CommandsCli.NFILE} - create new file in current working directory ( :> so ${CommandsCli.NFILE} index.ts ) \n`);
}


const main = async () => {

    if ((yargs.argv as any)._.length !== 0) {

        const command: CommandsCli = (yargs.argv as any)._[0];
        const controller: Commands = Commands.getInstance();

        if (!Object.values(CommandsCli).includes(command)) {
            console.log(`Invalid command - ${command} , please use - so --commands to see all available commands!`);
        } else {
            switch (command) {
                case CommandsCli.LDIR: {
                    return await controller.ldir();
                }
                case CommandsCli.NDIR: {
                    return await controller.ndir((yargs.argv as any));
                }
                case CommandsCli.NFILE: {
                    return await controller.nfile((yargs.argv as any));
                }
                default: {
                    return false;
                }
            }
        }

    }

};


main();
