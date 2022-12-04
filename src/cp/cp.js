import { spawn } from 'child_process';
import { stdin, argv } from 'process';
import { fileURLToPath } from 'url';

const _dirname = fileURLToPath(new URL('.', import.meta.url));
const PATH = '/files/script.js';

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [`${_dirname}${PATH}`, ...args]);

    stdin.pipe(childProcess.stdin);

    childProcess.stdout.on('data', (data) => {
        console.log(`Received from child process: ${data}`);
    });

    childProcess.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    childProcess.on('close', (code) => {
        console.log(`Child process is closed with code ${code}\n`);
    });
};

spawnChildProcess(argv);