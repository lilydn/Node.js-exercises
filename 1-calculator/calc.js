const yargs = require('yargs');

// node calc add --num1=1 --num2=2 
// should be: node calc –add 1 2

// add operation
yargs.command({
    command: 'add',
    describe: 'Add two numbers',
    builder: {
        num1: {
            describe: 'first number',
            demandOption: true,
            type: 'number'
        },
        num2: {
            describe: 'second number',
            demandOption: true,
            type: 'number'
        }
    },
    handler(argv) {
        console.log(argv.num1 + argv.num2);
    }
});

// substract operation
yargs.command({
    command: 'substract',
    describe: 'Substract two numbers',
    builder: {
        num1: {
            describe: 'first number',
            demandOption: true,
            type: 'number'
        },
        num2: {
            describe: 'second number',
            demandOption: true,
            type: 'number'
        }
    },
    handler(argv) {
        console.log(argv.num1 - argv.num2);
    }
});

// multiply operation
yargs.command({
    command: 'multiply',
    describe: 'Multiply two numbers',
    builder: {
        num1: {
            describe: 'first number',
            demandOption: true,
            type: 'number'
        },
        num2: {
            describe: 'second number',
            demandOption: true,
            type: 'number'
        }
    },
    handler(argv) {
        console.log(argv.num1 * argv.num2);
    }
});

// pow operation
yargs.command({
    command: 'pow',
    describe: 'Number squared',
    builder: {
        num: {
            describe: 'number',
            demandOption: true,
            type: 'number'
        },
    },
    handler(argv) {
        console.log(Math.pow(argv.num,2));
    }
});

yargs.parse();