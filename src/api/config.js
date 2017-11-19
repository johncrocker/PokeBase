var nconf = require('nconf');

nconf.argv()
    .env()
    .file({
        file: './configurations/local.json'
    });

module.exports = nconf;