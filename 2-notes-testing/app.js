//what we learned:
//Importing Node.js core modules (like fs)
//Importing a function or an object that contains functions from another file
const notes = require('./notes.js');

const msg = notes.getNotes();

console.log(msg);

//Importing npm modules
const validator = require('validator');  

console.log(validator.isEmail('lily@gmail.com'));
console.log(validator.isURL('jdsnfjdsnf.sddsf'));

//print to the console log in green, bold, and inversed with chalk
const chalk = require('chalk');
console.log(chalk.green.bold.inverse('Success!'));

//Modules like Chalk and Validate are locally installed dependencies - we need to use require to use them and they are listed in our package files. Globally installed moduled are not listed. 
// Installing an npm Module Globally: sudo npm i nodemon -g

//get input from the user via arguments provided to the console
const command = process.argv[2]; //node app.js add
// console.log(process.argv[2]); //add

// Yargs Package - Adding Command Options
const yargs = require('yargs');

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes();
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse();