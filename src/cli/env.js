import { env } from 'process';

const PREFIX = 'RSS_';

const parseEnv = () => {
    const rssEnvironment = Object.entries(env)
        .reduce((acc, environment) => environment[0].includes(PREFIX) ? [...acc, environment.join('=')] : acc, [])
        .join('; ')

    console.log(rssEnvironment);
};

parseEnv();