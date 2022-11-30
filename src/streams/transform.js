import { stdin, stdout } from 'process';
import { Transform } from 'stream';

const transform = async () => {
    const revers = new Transform({
        transform(chunk, _, callback) {
            callback(null, chunk.toString().split('').reverse().join(''))
        },
    });

    stdin.pipe(revers).pipe(stdout);
};

await transform();