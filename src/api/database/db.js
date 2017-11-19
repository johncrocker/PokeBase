var config = require('../config');
var log = require('../log');    

if (global.database == null) {
    log.info('Starting new database instance for ', config.get('dbUrl'));
    var neo4j = require('neo4j-driver').default;
    
    global.database = new neo4j.driver(config.get('dbUrl'), neo4j.auth.basic(
        config.get('dbUsername'),
        config.get('dbPassword')
    ));
}

module.exports = global.database.session();