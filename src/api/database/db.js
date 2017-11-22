var Promise = require('bluebird');
var config = require('../config');
var log = require('../log');
var neo4j = require('neo4j-driver').default;


module.exports = {
    run: function (cypher, args) {
        return new Promise(function (resolve, reject) {
            var driver = new neo4j.driver(config.get('dbUrl'), neo4j.auth.basic(
                config.get('dbUsername'),
                config.get('dbPassword')
            ));

            var session = driver.session();
            log.debug("Cypher : ", cypher);

            session.run(cypher, args)
                .then(function (result) {
                    log.debug("success");
                    session.close();
                    resolve(result);
                    session = null;
                    driver = null;
                })
                .catch(function (error) {
                    log.debug("error", error);
                    session.close();
                    reject(error);
                    session = null;
                    driver = null;
                });
        });
    }
};