import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import { assert } from 'console';

const variables = [
    'PORT',
    'HOST',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_HOST',
    'POSTGRES_DB',
    'PGADMIN_DEFAULT_EMAIL',
    'PGADMIN_DEFAULT_PASSWORD',
];

// Setup command line options
const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    },
]);

// Set the env file
const result2 = dotenv.config({
    path: `./env/${options.env}.env`,
});

if (result2.error) {
    throw result2.error;
}
if (!result2.parsed) throw new Error('Env variables load failed.');

// Validate variables
variables.forEach((variable) => {
    assert(
        (result2.parsed as dotenv.DotenvParseOutput)[variable],
        `${variable} must be defined.`
    );
});
