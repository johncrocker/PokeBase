var Promise = require('bluebird');
var db = require('./db');
var log = require('../log');
var lib = {}

lib.getPokemon = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (p:Pokemon)-[:HAS_SPECIES]->(s:Species)-[:HAS_GENERATION]->(g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'WHERE p.name = {name} ' +
            'RETURN p.id AS id, p.name AS name, p.weight AS weight, p.base_xp AS base_xp, p.is_default AS is_default, p.height AS height, s.name AS species, g.name AS generation, r.name AS region', {
                name: pokemon
            }).then(function (result) {
            resolve(mapRecords(result));
        }).catch(function (error) {
            reject(error);
        });
    });
};

function mapRecords(result) {
    var mappedResult = [];

    if (result == null) {
        return mappedResult;
    }

    result.records.forEach(function (record) {
        var mappedRecord = {};
        record.keys.forEach(function (key) {
            mappedRecord[key] = record.get(key);
        });
        mappedResult.push(mappedRecord);
    });

    return mappedResult;
}

module.exports = lib;