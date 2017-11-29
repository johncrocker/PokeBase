var Promise = require('bluebird');
var _ = require('underscore');
var db = require('./db');
var log = require('../log');
var lib = {};

lib.getPokemon = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (p:Pokemon)-[:HAS_SPECIES]->(s:Species)-[:HAS_GENERATION]->(g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'WHERE p.name = {name} OR p.id = {name}' +
            'WITH p, s, g, r MATCH (p)-[:IS_TYPE]->(t:Type) ' +
            'RETURN p.id AS id, p.name AS name, p.weight AS weight, p.base_xp AS base_xp, p.is_default AS is_default, p.height AS height, s.name AS species, g.id AS generationNumber, g.name AS generation, r.name AS region, COLLECT(t.name) AS types', {
                name: pokemon
            }).then(function (result) {

            if (hasResults(result)) {
                resolve(_.first(mapRecords(result)));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.getPokemonMoves = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (p:Pokemon)-[:HAS_MOVE]->(m:Move) WHERE p.name = {name} OR p.id = {name} ' +
            'RETURN m.id AS id, m.name AS name, m.pp AS pp, m.accuracy AS accuracy, m.power AS power ' +
            'ORDER BY m.name ASC', {
                name: pokemon
            }).then(function (result) {

            if (hasResults(result)) {
                resolve(mapRecords(result));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.getEvolutions = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (efg:Generation)-[:HAS_GENERATION]-(ef:Species)<-[:EVOLVES_FROM]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WHERE ((p.name = {name} OR p.id = {name}) ' +
            'OR (ef.name = {name} OR ef.id = {name}) ' +
            'OR (ev.name = {name} OR ev.id = {name})) ' +
            'RETURN ef.id AS fromId, ef.name AS fromName, efg.id AS fromGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                name: pokemon
            }).then(function (data) {

            if (hasResults(data)) {
                resolve(formatResults(data));
            } else {
                db.run('MATCH (p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
                    'WHERE ((p.name = {name} OR p.id = {name}) ' +
                    'OR (ev.name = {name} OR ev.id = {name})) ' +
                    'RETURN p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                        name: pokemon
                    }).then(function (data) {

                    if (hasResults(data)) {
                        resolve(formatResults(data));
                    } else {
                        reject(createError());
                    }
                }).catch(function (error) {
                    reject(createError(error));
                });
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });

    function formatResults(data) {
        var rows = mapRecords(data);
        var result = [];

        _.each(rows, function (element) {
            var value = [];

            if (element.fromId) {
                value.push({
                    id: element.fromId,
                    name: element.fromName,
                    generation: element.fromGen
                });
            }

            value.push({
                id: element.thisId,
                name: element.thisName
            });

            value.push({
                id: element.toId,
                name: element.toName,
                generation: element.toGen,
                evolution_trigger_id: element.evolution_trigger_id,
                trigger_item_id: element.trigger_item_id,
                minimum_level: element.minimum_level,
                time_of_day: element.time_of_day
            });

            result.push(value);
        });

        return result;
    }
};

lib.getPokemonTypeEfficacy = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (p:Pokemon)-[:IS_TYPE]->(defense:Type)-[efficacy:EFFICACY]->(attack:Type) ' +
            'WHERE p.name = {pokemon} OR p.id = {pokemon} ' +
            'RETURN defense.name AS defenseType, attack.name AS attackType, efficacy.effectiveness AS effectiveness ORDER BY toFloat(efficacy.effectiveness) DESC', {
                pokemon: pokemon
            }).then(function (result) {

            if (hasResults(result)) {
                resolve(mapRecords(result));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.getEffectivePokemon = function (pokemon, minEffectiveness) {
    if (minEffectiveness) {
        return new Promise(function (resolve, reject) {
            db.run('MATCH (defender:Pokemon)-[:IS_TYPE]->(defense:Type)-[efficacy:EFFICACY]->(attack:Type)<-[:IS_TYPE]-(attacker:Pokemon)-[:HAS_SPECIES]-(s:Species)-[:HAS_GENERATION]-(g:Generation) ' +
                'WHERE (defender.name = {pokemon} OR defender.id = {pokemon}) AND toFloat(efficacy.effectiveness) >= {mineffectiveness} ' +
                'RETURN DISTINCT (attacker) AS attacker, s.name AS species,COLLECT(g.id) AS generations, toFloat(efficacy.effectiveness) AS effectiveness ' +
                'ORDER BY toFloat(efficacy.effectiveness) DESC, attacker ASC', {
                    pokemon: pokemon,
                    mineffectiveness: minEffectiveness
                }).then(function (result) {

                if (hasResults(result)) {
                    resolve(formatResults(result));
                } else {
                    reject(createError());
                }
            }).catch(function (error) {
                reject(createError(error));
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            db.run('MATCH (defender:Pokemon)-[:IS_TYPE]->(defense:Type)-[efficacy:EFFICACY]->(attack:Type)<-[:IS_TYPE]-(attacker:Pokemon)-[:HAS_SPECIES]-(s:Species)-[:HAS_GENERATION]-(g:Generation) ' +
                'WHERE (defender.name = {pokemon} OR defender.id = {pokemon}) ' +
                'RETURN DISTINCT (attacker) AS attacker, s.name AS species, COLLECT(g.id) AS generations, toFloat(efficacy.effectiveness) AS effectiveness ' +
                'ORDER BY toFloat(efficacy.effectiveness) DESC, attacker ASC', {
                    pokemon: pokemon
                }).then(function (result) {

                if (hasResults(result)) {
                    resolve(formatResults(result));
                } else {
                    reject(createError());
                }
            }).catch(function (error) {
                reject(createError(error));
            });
        });
    }

    function formatResults(data) {
        var rows = mapRecords(data);
        var result = [];
        _.each(rows, function (row) {
            var record = {
                id: row.attacker.properties.id,
                name: row.attacker.properties.name,
                weight: row.attacker.properties.weight,
                base_xp: row.attacker.properties.base_xp,
                height: row.attacker.properties.height,
                species: row.species,
                generations: _.union(row.generations),
                effectiveness: row.effectiveness
            };

            result.push(record);
        });

        return result;
    }
};

lib.getTypeEfficacy = function (type) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH(defense:Type)-[efficacy:EFFICACY]->(attack:Type) ' +
            'WHERE defense.name = {type} ' +
            'RETURN defense.name AS defenseType, attack.name AS attackType, efficacy.effectiveness AS effectiveness ORDER BY toFloat(efficacy.effectiveness) DESC', {
                type: type
            }).then(function (result) {

            if (hasResults(result)) {
                resolve(mapRecords(result));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.getGeneration = function (generation) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'WHERE g.id = {id} RETURN g.id AS number, g.name AS name, r.name AS region ' +
            'ORDER BY g.id ASC', {
                id: generation
            }).then(function (result) {

            if (hasResults(result)) {
                resolve(_.first(mapRecords(result)));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.listGenerations = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'RETURN g.id AS number, g.name AS name, r.name AS region ORDER BY toInt(g.id) ASC', {}).then(function (result) {

            if (hasResults(result)) {
                resolve(mapRecords(result));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.listSpecies = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (s:Species)-[:HAS_GENERATION]->(g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'RETURN s.id AS id, s.name AS name, g.id AS generationNumber, g.name AS generation, r.name AS region ORDER BY toInt(s.id) ASC', {}).then(function (result) {

            if (hasResults(result)) {
                resolve(mapRecords(result));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.listUniqueSpecies = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (s:Species) ' +
            'RETURN s.id AS id, s.name AS name ORDER BY toInt(s.id) ASC', {}).then(function (result) {

            if (hasResults(result)) {
                resolve(mapRecords(result));
            } else {
                reject(createError());
            }
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.getSpecies = function (species) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (s:Species)-[:HAS_GENERATION]->(g:Generation)-[:HAS_REGION]->(r:Region) WHERE s.name = {species} OR s.id = {species} ' +
            'WITH s,g,r MATCH(p:Pokemon)-[:HAS_SPECIES]->(s) ' +
            'WITH s,g,r,p MATCH(p)-[:IS_TYPE]->(t:Type) ' +
            'RETURN s.id AS id, s.name AS name, g.id AS generationNumber, g.name AS generation, r.name AS region, ' +
            'p.id AS pokemon_id, p.name AS pokemon_name, p.weight AS pokemon_weight, p.base_xp AS pokemon_base_xp, p.is_default AS pokemon_is_default, p.height AS pokemon_height, COLLECT(t.name) AS types', {
                species: species
            }).then(function (data) {

            if (!hasResults(data)) {
                reject(createError());
                return;
            }
            var rows = mapRecords(data);
            var result = {
                species: {
                    id: rows[0].id,
                    name: rows[0].name,
                    generationNumber: rows[0].generationNumber,
                    generation: rows[0].generation,
                    region: rows[0].region
                },
                pokemon: []
            };

            _.each(rows, function (element) {
                result.pokemon.push({
                    id: element.pokemon_id,
                    name: element.pokemon_name,
                    weight: element.pokemon_weight,
                    base_xp: element.pokemon_base_xp,
                    is_default: element.pokemon_is_default,
                    height: element.pokemon_height,
                    types: element.types
                });
            });
            resolve(result);
        }).catch(function (error) {
            reject(createError(error));
        });
    });
};

lib.getGenerationSpecies = function (generation) {
    return new Promise(function (resolve, reject) {
        lib.getGeneration(generation)
            .then(function (generationResult) {
                db.run('MATCH (g:Generation)-[:HAS_GENERATION]-(s:Species) ' +
                    'WHERE g.id = {id} ' +
                    'RETURN s.id AS id, s.name AS pokemon ' +
                    ' ORDER BY toInt(s.id) ASC', {
                        id: generation
                    }).then(function (data) {

                    if (!hasResults(data)) {
                        reject(createError());
                        return;
                    }

                    var rows = mapRecords(data);

                    var result = {
                        generation: generationResult,
                        pokemon: []
                    };

                    _.each(rows, function (element) {
                        result.pokemon.push({
                            id: element.id,
                            name: element.pokemon
                        });
                    });
                    resolve(result);
                }).catch(function (error) {
                    reject(createError(error));
                });
            }).catch(function (error) {
                reject(createError(error));
            });
    });

};

function createError(e) {
    if (e) {
        return {
            status: 500,
            error: e
        };
    }

    return {
        status: 404,
        error: "Not found"
    };
}

function hasResults(result) {
    if (result == null) {
        return false;
    }

    if ((result.records == null) || (result.records.length == 0)) {
        return false;
    }

    return true;
}

function mapRecords(result) {
    var mappedResult = [];

    if (result == null) {
        return null;
    }

    result.records.forEach(function (record) {
        var mappedRecord = {};
        record.keys.forEach(function (key) {
            mappedRecord[key] = record.get(key);
        });
        mappedResult.push(mappedRecord);
    });

    if (mappedResult.length == 0) {
        return null;
    }
    return mappedResult;
}

module.exports = lib;