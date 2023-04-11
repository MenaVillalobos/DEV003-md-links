// Aquí va --stats, --validate
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { mdLinks } from './index.js';
import colors from 'colors';

const yarg = yargs(hideBin(process.argv))
yarg
        .option('filename', { type: 'string'})
        .alias('f', 'filename')

        .option('v', {
            alias: 'validate',
            type: 'boolean'
        })
        .check((argvv, options) => {
            return true;
        })

        .option('s', {
            alias: 'stats',
            type: 'boolean'
        })
        .check((argvv, options) => {
            return true;
        })
        .argv;

        // console.log(yarg.argv);
        // console.log('validate: yargs', argv.v);
        const options = {
            validate: false,
            stats: false,
        }
        if (yarg.argv.v) {
            options.validate = true;
        } 
        if (yarg.argv.s) {
            options.stats = true;
        }
        mdLinks(yarg.argv._[0], options).then(
            (linksObject) => {
                console.log(linksObject);
            }
        ).catch(
            (error) =>{
                console.log(error.red);
            }
        );

// Crear objeto options 
// Caso 1: ambos valores false
    // sobran else
    // Checa file sin -v ni -s
// Caso 2: checa file con -v o -s
    // sobran else


