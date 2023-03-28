// Aquí va --stats, --validate
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { mdLinks } from './index.js';
const yargs = _yargs(hideBin(process.argv));

(async () => {
    const argv = await yargs
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

        console.log(argv._);
        // console.log('validate: yargs', argv.v);
        const options = {
            validate: false,
            stats: false,
        }
        if (argv.v) {
            console.log('Ingresó -v');
            options.validate = true;
        } 
        if (argv.s) {
            console.log('Ingresó -s');
            options.stats = true;
        }
        mdLinks(argv._[0], options);
})
();

// Crear objeto options 
// Caso 1: ambos valores false
    // sobran else
    // Checa file sin -v ni -s
// Caso 2: checa file con -v o -s
    // sobran else


