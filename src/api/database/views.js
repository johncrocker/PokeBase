var lib = {};
var _ = require('underscore');


lib.createError = function (e) {
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
};

lib.getPokemon = function (data) {
    return mapRecords(data, function (item) {
        return {
            id: item.id,
            name: item.name,
            weight: item.weight,
            base_xp: item.base_xp,
            is_default: item.is_default,
            height: item.height,
            isPogo: item.isPogo,
            CPPerLevel: JSON.parse(item.CPPerLevel),
            species: item.species,
            generationNumber: item.generationNumber,
            region: item.region,
            types: item.types,
            statAtk: item.statAtk,
            statDef: item.statDef,
            statSta: item.statSta,
            candyToEvolve: item.candyToEvolve,
            captureRate: item.captureRate,
            fleeRate: item.fleeRate,
            buddyDistance: item.buddyDistance,
            isLegendary: item.isLegendary,
            maxCP: item.maxCP,
            raidBossCP: item.raidBossCP
        };
    });
};

lib.getPokemonMoves = function (data) {
    return mapRecords(data);
};

lib.listRegions = function (data) {
    return mapRecords(data);
};

lib.listEvolutionTriggers = function (data) {
    return mapRecords(data);
};

lib.getEvolutionTrigger = function (data) {
    return mapRecords(data);
};

lib.listItems = function (data) {
    return mapRecords(data);
};

lib.getRegion = function (data) {
    return mapRecords(data);
};

lib.getRegionSpecies = function (data) {
    return mapRecords(data);
};

lib.getEvolutions = function (data) {
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
};

lib.getEffectivePokemon = function (data) {
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
};

lib.getTypeEfficacy = function (data) {
    return mapRecords(data);
};

lib.getPokemonTypeEfficacy = function (data) {
    return mapRecords(data);
};

lib.getGeneration = function (data) {
    return mapRecords(data);
};

lib.listGenerations = function (data) {
    return mapRecords(data);
};

lib.listSpecies = function (data) {
    return mapRecords(data);
};

lib.getSpecies = function (data) {
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
            types: element.types,
            statAtk: element.statAtk,
            statDef: element.statDef,
            statSta: element.statSta,
            candyToEvolve: element.candyToEvolve,
            captureRate: element.captureRate,
            fleeRate: element.fleeRate,
            buddyDistance: element.buddyDistance,
            isLegendary: element.isLegendary,
            raidBossCP: element.raidBossCP,
            maxCP: element.maxCP
        });
    });

    return result;
};

lib.getGenerationSpecies = function (data) {

    var rows = mapRecords(data);

    var result = {
        generation: row,
        pokemon: []
    };

    _.each(rows, function (element) {
        result.pokemon.push({
            id: element.id,
            name: element.pokemon
        });
    });
    return result;
}

lib.listUniqueSpecies = function (data) {
    return mapRecords(data);
};

lib.hasResults = function (result) {
    if (result == null) {
        return false;
    }

    if ((result.records == null) || (result.records.length == 0)) {
        return false;
    }

    return true;
}

function mapRecords(result, viewCallback) {
    var mappedResult = [];

    if (result == null) {
        return null;
    }

    result.records.forEach(function (record) {
        var mappedRecord = {};
        record.keys.forEach(function (key) {
            mappedRecord[key] = record.get(key);
        });

        if (viewCallback) {
            mappedRecord = viewCallback(mappedRecord);
        }

        mappedResult.push(mappedRecord);
    });

    if (mappedResult.length == 0) {
        return null;
    }
    return mappedResult;
}

module.exports = lib;