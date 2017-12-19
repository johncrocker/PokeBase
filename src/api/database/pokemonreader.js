var Promise = require('bluebird');
var views = require('./views');
var _ = require('underscore');
var db = require('./db');
var log = require('../log');
var config = require('../config');
var lib = {};


lib.getPokemon = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (p:Pokemon {pogo: "true"})-[:HAS_SPECIES]->(s:Species)-[:HAS_GENERATION]->(g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'WHERE p.name = {name} OR p.id = {name}' +
            'WITH p, s, g, r MATCH (p)-[:IS_TYPE]->(t:Type) ' +
            'RETURN p.id AS id, p.name AS name, p.weight AS weight, p.base_xp AS base_xp, p.is_default AS is_default, p.height AS height, p.pogo AS isPogo, p.CPPerLevel AS CPPerLevel, s.name AS species, g.id AS generationNumber, g.name AS generation, r.name AS region, COLLECT(t.name) AS types, ' +
            'p.statAtk AS statAtk, p.statDef AS statDef, p.statSta AS statSta, p.candyToEvolve AS candyToEvolve, p.captureRate AS captureRate, p.fleeRate AS fleeRate, p.buddyDistance AS buddyDistance, p.isLegendary AS isLegendary, p.maxCP AS maxCP, p.raidBossCP AS raidBossCP', {
                name: pokemon
            }).then(function (result) {

            if (views.hasResults(result)) {
                resolve(_.first(views.getPokemon(result)));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.getPokemonMoves = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (p:Pokemon {pogo: "true"})-[:HAS_MOVE]->(m:Move) WHERE p.name = {name} OR p.id = {name} ' +
            'RETURN m.id AS id, m.name AS name, m.pp AS pp, m.accuracy AS accuracy, m.power AS power ' +
            'ORDER BY m.name ASC', {
                name: pokemon
            }).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.getPokemonMoves(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.listRegions = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (r:Region)<-[:HAS_REGION]-(g:Generation) ' +
            'RETURN r.id AS id, r.name AS name, COLLECT(g.id) AS generationNumber', {}).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.listRegions(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.listEvolutionTriggers = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (t:Trigger) ' +
            'RETURN t.id AS id, t.name AS name ' +
            'ORDER BY t.id', {}).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.listEvolutionTriggers(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.getEvolutionTrigger = function (evolution_trigger_id, trigger_item_id) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (t:Trigger), (i:Item)-[:HAS_CATEGORY]-(c:Category) ' +
            'WHERE t.id = {triggerId} AND i.id = {itemId} ' +
            'RETURN t.id as triggerId, t.name as triggerName, i.id AS itemId, i.name AS itemName, c.id AS categoryId, c.name AS categoryName', {
                triggerId: evolution_trigger_id,
                itemId: trigger_item_id
            }).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.getEvolutionTrigger(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.listItems = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (i:Item)-[:HAS_CATEGORY]-(c:Category) ' +
            'RETURN i.id AS id, i.name AS name, c.id AS categoryId, c.name as categoryName', {}).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.listItems(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.getRegion = function (id) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (r:Region)<-[:HAS_REGION]-(g:Generation) ' +
            'WHERE r.id = {name} OR r.id = {name} ' +
            'RETURN r.id AS id, r.name AS name, COLLECT(g.id) AS generationNumber', {
                name: id
            }).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.getRegion(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.getRegionSpecies = function (id) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (r:Region)<-[:HAS_REGION]-(g:Generation)<-[:HAS_GENERATION]-(s:Species) ' +
            'WHERE r.name = {name} OR r.id = {name} ' +
            'RETURN s.id AS id, s.name AS name, g.id AS generationNumber ORDER BY s.id', {
                name: id
            }).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.getRegionSpecies(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.getEvolutions = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (efg:Generation)-[:HAS_GENERATION]-(ef:Species)<-[:EVOLVES_FROM]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WHERE ((p.name = {name} OR p.id = {name}) ' +
            'OR (ef.name = {name} OR ef.id = {name}) ' +
            'OR (ev.name = {name} OR ev.id = {name})) ' +
            'WITH efg, ef, p, ev, evg, path ' +
            'MATCH (pfg:Generation)<-[:HAS_GENERATION]-(p) ' +
            'RETURN pfg.id as thisGen, ef.id AS fromId, ef.name AS fromName, efg.id AS fromGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                name: pokemon
            }).then(function (data) {

            if (views.hasResults(data)) {
                resolve(views.getEvolutions(data));
            } else {
                db.run('MATCH (eff:Generation)-[:HAS_GENERATION]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
                    'WHERE ((p.name = {name} OR p.id = {name}) ' +
                    'OR (ev.name = {name} OR ev.id = {name})) ' +
                    'RETURN eff.id AS thisGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                        name: pokemon
                    }).then(function (data) {

                    if (views.hasResults(data)) {
                        resolve(views.getEvolutions(data));
                    } else {
                        reject(views.createError());
                    }
                }).catch(function (error) {
                    reject(views.createError(error));
                });
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });

};

lib.getGenerationEvolutions = function (genNumber) {
    return new Promise(function (resolve, reject) {
        var promises = [];

        promises.push(db.run('MATCH (efg:Generation)-[:HAS_GENERATION]-(ef:Species)<-[:EVOLVES_FROM]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WITH efg, ef, p, ev, evg, path ' +
            'MATCH (pfg:Generation)<-[:HAS_GENERATION]-(p) ' +
            'WHERE (pfg.id = {gen} OR efg.id = {gen} OR evg.id = {gen}) '+
            'RETURN pfg.id as thisGen, ef.id AS fromId, ef.name AS fromName, efg.id AS fromGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                gen: genNumber
            }));

        promises.push(db.run('MATCH (eff:Generation)-[:HAS_GENERATION]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WHERE (eff.id = {gen}) ' +
            'RETURN eff.id AS thisGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                gen: genNumber
            }));

        Promise.all(promises.map(function (promise) {
            return promise.reflect();
        })).then(function (promiseResults) {
            var result = [];

            _.each(promiseResults, function (promise) {
                if (promise.isFulfilled()) {
                    var data = promise.value();

                    if (views.hasResults(data)) {
                        result = result.concat(views.getEvolutions(data));
                    }
                }
            });

            if (result.length == 0) {
                reject(views.createError());
            } else {
                resolve(result);
            }
        }).catch().catch(function (error) {
            reject(views.createError(error));
        });
    });

};

lib.getEvolutionsOutsideGeneration = function (genNumber) {
    return new Promise(function (resolve, reject) {
        var promises = [];

        promises.push(db.run('MATCH (efg:Generation)-[:HAS_GENERATION]-(ef:Species)<-[:EVOLVES_FROM]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WHERE (efg.id = {gen} AND evg.id <> {gen}) ' +
            'WITH efg, ef, p, ev, evg, path ' +
            'MATCH (pfg:Generation)<-[:HAS_GENERATION]-(p) ' +
            'WHERE (pfg.id = {gen}) '+
            'RETURN pfg.id as thisGen, ef.id AS fromId, ef.name AS fromName, efg.id AS fromGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                gen: genNumber
            }));

        promises.push(db.run('MATCH (eff:Generation)-[:HAS_GENERATION]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WHERE (eff.id = {gen} AND evg.id <> {gen}) ' +
            'RETURN eff.id AS thisGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                gen: genNumber
            }));

        Promise.all(promises.map(function (promise) {
            return promise.reflect();
        })).then(function (promiseResults) {
            var result = [];

            _.each(promiseResults, function (promise) {
                if (promise.isFulfilled()) {
                    var data = promise.value();

                    if (views.hasResults(data)) {
                        result = result.concat(views.getEvolutions(data));
                    }
                }
            });

            if (result.length == 0) {
                reject(views.createError());
            } else {
                resolve(result);
            }
        }).catch().catch(function (error) {
            reject(views.createError(error));
        });
    });

};


lib.getEvolutionsInsideGeneration = function (genNumber) {
    return new Promise(function (resolve, reject) {
        var promises = [];

        promises.push(db.run('MATCH (efg:Generation)-[:HAS_GENERATION]-(ef:Species)<-[:EVOLVES_FROM]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WHERE (efg.id = {gen} AND evg.id = {gen}) ' +
            'WITH efg, ef, p, ev, evg, path ' +
            'MATCH (pfg:Generation)<-[:HAS_GENERATION]-(p) ' +
            'WHERE (pfg.id = {gen}) '+
            'RETURN pfg.id as thisGen, ef.id AS fromId, ef.name AS fromName, efg.id AS fromGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                gen: genNumber
            }));

        promises.push(db.run('MATCH (eff:Generation)-[:HAS_GENERATION]-(p:Species)-[path:EVOLVES_TO]->(ev:Species)-[:HAS_GENERATION]-(evg:Generation) ' +
            'WHERE (eff.id = {gen} AND evg.id = {gen}) ' +
            'RETURN eff.id AS thisGen, p.id AS thisId, p.name AS thisName, ev.id AS toId, ev.name AS toName, evg.id AS toGen, path.evolution_trigger_id AS evolution_trigger_id, path.trigger_item_id AS trigger_item_id, path.minimum_level AS minimum_level, path.time_of_day AS time_of_day', {
                gen: genNumber
            }));

        Promise.all(promises.map(function (promise) {
            return promise.reflect();
        })).then(function (promiseResults) {
            var result = [];

            _.each(promiseResults, function (promise) {
                if (promise.isFulfilled()) {
                    var data = promise.value();

                    if (views.hasResults(data)) {
                        result = result.concat(views.getEvolutions(data));
                    }
                }
            });

            if (result.length == 0) {
                reject(views.createError());
            } else {
                resolve(result);
            }
        }).catch().catch(function (error) {
            reject(views.createError(error));
        });
    });

};

lib.getPokemonTypeEfficacy = function (pokemon) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (p:Pokemon {pogo: "true"})-[:IS_TYPE]->(defense:Type)-[efficacy:EFFICACY]->(attack:Type) ' +
            'WHERE p.name = {pokemon} OR p.id = {pokemon} ' +
            'RETURN defense.name AS defenseType, attack.name AS attackType, efficacy.effectiveness AS effectiveness ORDER BY toFloat(efficacy.effectiveness) DESC', {
                pokemon: pokemon
            }).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.getPokemonTypeEfficacy(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.getEffectivePokemon = function (pokemon, minEffectiveness) {
    var mostRecentGeneration = (config.get("mostRecentGeneration") ? config.get("mostRecentGeneration") : "7");

    if (minEffectiveness) {
        return new Promise(function (resolve, reject) {
            db.run('MATCH (defender:Pokemon {pogo: "true"})-[:IS_TYPE]->(defense:Type)-[efficacy:EFFICACY]->(attack:Type)<-[:IS_TYPE]-(attacker:Pokemon {pogo: "true"})-[:HAS_SPECIES]-(s:Species)-[:HAS_GENERATION]-(g:Generation) ' +
                'WHERE (defender.name = {pokemon} OR defender.id = {pokemon}) AND toFloat(efficacy.effectiveness) >= {mineffectiveness} AND g.id <= {mostRecentGeneration} ' +
                'RETURN DISTINCT (attacker) AS attacker, s.name AS species,COLLECT(g.id) AS generations, toFloat(efficacy.effectiveness) AS effectiveness ' +
                'ORDER BY toFloat(efficacy.effectiveness) DESC, attacker ASC', {
                    pokemon: pokemon,
                    mineffectiveness: minEffectiveness,
                    mostRecentGeneration: mostRecentGeneration
                }).then(function (result) {

                if (views.hasResults(result)) {
                    resolve(views.getEffectivePokemon(result));
                } else {
                    reject(views.createError());
                }
            }).catch(function (error) {
                reject(views.createError(error));
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            db.run('MATCH (defender:Pokemon {pogo: "true"})-[:IS_TYPE]->(defense:Type)-[efficacy:EFFICACY]->(attack:Type)<-[:IS_TYPE]-(attacker:Pokemon {pogo: "true"})-[:HAS_SPECIES]-(s:Species)-[:HAS_GENERATION]-(g:Generation) ' +
                'WHERE (defender.name = {pokemon} OR defender.id = {pokemon}) AND g.id <= {mostRecentGeneration} ' +
                'RETURN DISTINCT (attacker) AS attacker, s.name AS species, COLLECT(g.id) AS generations, toFloat(efficacy.effectiveness) AS effectiveness ' +
                'ORDER BY toFloat(efficacy.effectiveness) DESC, attacker ASC', {
                    pokemon: pokemon,
                    mostRecentGeneration: mostRecentGeneration
                }).then(function (result) {

                if (views.hasResults(result)) {
                    resolve(views.getEffectivePokemon(result));
                } else {
                    reject(views.createError());
                }
            }).catch(function (error) {
                reject(views.createError(error));
            });
        });
    }

};

lib.getTypeEfficacy = function (type) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH(defense:Type)-[efficacy:EFFICACY]->(attack:Type) ' +
            'WHERE defense.name = {type} ' +
            'RETURN defense.name AS defenseType, attack.name AS attackType, efficacy.effectiveness AS effectiveness ORDER BY toFloat(efficacy.effectiveness) DESC', {
                type: type
            }).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.getTypeEfficacy(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
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

            if (views.hasResults(result)) {
                resolve(_.first(views.getGeneration(result)));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.listGenerations = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'RETURN g.id AS number, g.name AS name, r.name AS region ORDER BY toInt(g.id) ASC', {}).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.listGenerations(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.listSpecies = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (s:Species)-[:HAS_GENERATION]->(g:Generation)-[:HAS_REGION]->(r:Region) ' +
            'RETURN s.id AS id, s.name AS name, g.id AS generationNumber, g.name AS generation, r.name AS region ORDER BY toInt(s.id) ASC', {}).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.listSpecies(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.listUniqueSpecies = function () {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (s:Species) ' +
            'RETURN s.id AS id, s.name AS name ORDER BY toInt(s.id) ASC', {}).then(function (result) {

            if (views.hasResults(result)) {
                resolve(views.listUniqueSpecies(result));
            } else {
                reject(views.createError());
            }
        }).catch(function (error) {
            reject(views.createError(error));
        });
    });
};

lib.getSpecies = function (species) {
    return new Promise(function (resolve, reject) {
        db.run('MATCH (s:Species)-[:HAS_GENERATION]->(g:Generation)-[:HAS_REGION]->(r:Region) WHERE s.name = {species} OR s.id = {species} ' +
            'WITH s,g,r MATCH(p:Pokemon {pogo: "true"})-[:HAS_SPECIES]->(s) ' +
            'WITH s,g,r,p MATCH(p)-[:IS_TYPE]->(t:Type) ' +
            'RETURN s.id AS id, s.name AS name, g.id AS generationNumber, g.name AS generation, r.name AS region, ' +
            'p.id AS pokemon_id, p.name AS pokemon_name, p.weight AS pokemon_weight, p.base_xp AS pokemon_base_xp, p.is_default AS pokemon_is_default, p.height AS pokemon_height, p.CPPerLevel AS CPPerLevel, COLLECT(t.name) AS types, ' +
            'p.statAtk AS statAtk, p.statDef AS statDef, p.statSta AS statSta, p.candyToEvolve AS candyToEvolve, p.captureRate AS captureRate, p.fleeRate AS fleeRate, p.buddyDistance AS buddyDistance, p.isLegendary AS isLegendary, p.maxCP AS maxCP, p.raidBossCP AS raidBossCP', {
                species: species
            }).then(function (data) {

            if (!views.hasResults(data)) {
                reject(views.createError());
                return;
            }


            resolve(views.getSpecies(data));
        }).catch(function (error) {
            reject(views.createError(error));
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

                    if (!views.hasResults(data)) {
                        reject(views.createError());
                        return;
                    }

                    resolve(views.getGenerationSpecies(data));
                }).catch(function (error) {
                    reject(views.createError(error));
                });
            }).catch(function (error) {
                reject(views.createError(error));
            });
    });

};

module.exports = lib;