import { argv } from 'process';

const PREFIX = '--';

const parseArgs = () => {
    const args = argv.reduce((acc, arg, index, argvArray) => 
        arg.startsWith(PREFIX) ? [...acc, `${arg.slice(2)} is ${argvArray[index+1]}`] : acc, []);

    console.log(args);
};

parseArgs();