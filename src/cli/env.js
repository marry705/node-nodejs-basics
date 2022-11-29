import { env } from 'process';

const PREFIX = 'RSS_';

const parseEnv = () => {
    const rssEnvironment = Object.entries(env)
        .filter(environment => environment[0].includes(PREFIX))
        .map((environment) => environment.join('='))
        .join('; ')

    console.log(rssEnvironment);
};

parseEnv();