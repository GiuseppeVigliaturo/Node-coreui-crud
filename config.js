const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
    throw result.error;
}

const {parsed: envs} = result;
console.debug(envs);

module.exports = envs;