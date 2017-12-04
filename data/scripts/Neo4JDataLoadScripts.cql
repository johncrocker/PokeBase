LOAD CSV WITH HEADERS FROM "file:///item_categories.csv" AS value
MERGE (category:Category {id: value.id})
ON CREATE SET category.name = value.identifier, category.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///items.csv" AS value
MERGE (item:Item {id: value.id})
ON CREATE SET item.name = value.identifier, item.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///items.csv" AS value
MATCH (item:Item {id: value.id}), (category:Category {id: value.category_id}) 
CREATE (item)-[:HAS_CATEGORY]->(category);

LOAD CSV WITH HEADERS FROM "file:///evolution_triggers.csv" AS value
MERGE (trigger:Trigger {id: value.id}) 
ON CREATE SET trigger.name = value.identifier, trigger.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///regions.csv" AS value
MERGE (region:Region {id: value.id}) 
ON CREATE SET region.name = value.identifier, region.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///generations.csv" AS value
MERGE (generation:Generation {id: value.id}) 
ON CREATE SET generation.name = value.identifier, generation.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///generations.csv" AS value
MATCH (generation:Generation {id: value.id}), (region:Region {id: value.main_region_id})
CREATE(generation)-[:HAS_REGION]->(region);

LOAD CSV WITH HEADERS FROM "file:///pokemon_species.csv" AS value
MERGE (species:Species {id: value.id}) 
ON CREATE SET species.name = value.identifier, species.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///pokemon_species.csv" AS value
MATCH (species:Species {id: value.id}), (generation:Generation {id: value.generation_id})
CREATE(species)-[:HAS_GENERATION]->(generation);

LOAD CSV WITH HEADERS FROM "file:///pokemon_species.csv" AS value
MATCH (species:Species {id: value.id}), (evolvesfrom:Species {id: value.evolves_from_species_id})
CREATE(evolvesfrom)-[:EVOLVES_TO]->(species);

LOAD CSV WITH HEADERS FROM "file:///pokemon_species.csv" AS value
MATCH (species:Species {id: value.id}), (evolvesfrom:Species {id: value.evolves_from_species_id})
CREATE(species)-[:EVOLVES_FROM]->(evolvesfrom);

LOAD CSV WITH HEADERS FROM "file:///pokemon_evolution.csv" AS value
MATCH (evolvesfrom:Species)-[evolution:EVOLVES_TO]->(species:Species {id: value.evolved_species_id})
SET evolution.evolution_trigger_id = value.evolution_trigger_id, evolution.trigger_item_id =  value.trigger_item_id, evolution.minimum_level = value.minimum_level, evolution.time_of_day = value.time_of_day;

LOAD CSV WITH HEADERS FROM "file:///pokemon.csv" AS value
MERGE (pokemon:Pokemon {id: value.id}) 
ON CREATE SET pokemon.name = value.identifier, pokemon.weight = value.weight, pokemon.is_default = value.is_default, pokemon.height = value.height, pokemon.base_xp = value.base_experience, pokemon.id = value.id, pokemon.species_id = value.species_id;

LOAD CSV WITH HEADERS FROM "file:///pokemongo_stats.csv" AS value
MERGE (p:Pokemon {id: value.id})
ON MATCH SET p.maxCP = value.maxcp, p.statAtk = value.statatk, p.statDef = value.statdef, p.statSta = value.statsta, p.buddyDistance = value.buddydistance, p.candyToEvolve = value.candytoevolve, p.captureRate = value.captureRate, p.fleeRate = value.fleeRate, p.isLegendary = value.legendary, p.raidBossCP  = ["0", value.tier1, value.tier2, value.tier3, value.tier4, value.tier5];

LOAD CSV WITH HEADERS FROM "file:///pokemon.csv" AS value
MATCH (pokemon:Pokemon {id: value.id}), (species:Species {id: value.species_id})
CREATE(pokemon)-[:HAS_SPECIES]->(species);

LOAD CSV WITH HEADERS FROM "file:///abilities.csv" AS value 
MERGE (ability:Ability {id: value.id}) 
ON CREATE SET ability.name = value.identifier, ability.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///abilities.csv" AS value
MATCH (ability:Ability {id: value.id}), (region:Region {id: value.region_id}) 
CREATE(ability)-[:HAS_REGION]->(region);

LOAD CSV WITH HEADERS FROM "file:///pokemon_abilities.csv" AS value 
MATCH (pokemon:Pokemon {id: value.pokemon_id}), (ability:Ability {id: value.ability_id}) 
CREATE(pokemon)-[:HAS_ABILITY {slot: value.slot, hidden: value.hidden}]->(ability);

LOAD CSV WITH HEADERS FROM "file:///moves.csv" AS value 
MERGE (move:Move {id: value.id}) 
ON CREATE SET move.name = value.identifier, move.id = value.id, move.power = value.power, move.pp = value.pp, move.accuracy = value.accuracy;

LOAD CSV WITH HEADERS FROM "file:///types.csv" AS value 
MERGE (type:Type {id: value.id}) 
ON CREATE SET type.name = value.identifier, type.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///types.csv" AS value 
MATCH (type:Type {id: value.id}), (generation:Generation {id: value.generation_id})
CREATE(type)-[:HAS_GENERATION]->(generation);

LOAD CSV WITH HEADERS FROM "file:///pokemon_types.csv" AS value 
MATCH (type:Type {id: value.type_id}) , (pokemon:Pokemon{id: value.pokemon_id})
CREATE(pokemon)-[:IS_TYPE{slot: value.slot}]->(type);

LOAD CSV WITH HEADERS FROM "file:///type_strengthweakness.csv" AS value 
MATCH (defend:Type {id: value.defend_type_id}) , (attack:Type{id: value.attack_type_id})
CREATE(attack)-[:EFFICACY{effectiveness: value.effectiveness}]->(defend);

LOAD CSV WITH HEADERS FROM "file:///moves.csv" AS value 
MATCH (move:Move {id: value.id}) , (generation:Generation {id: value.generation_id})
CREATE(move)-[:HAS_GENERATION]->(generation);

LOAD CSV WITH HEADERS FROM "file:///pokemon_moves.csv" AS value 
MATCH (pokemon:Pokemon {id: value.pokemon_id}), (move:Move {id: value.move_id}) 
MERGE(pokemon)-[:HAS_MOVE]->(move);

MATCH(p:Pokemon) WHERE toInt(p.id) <= 900 SET p.pogo = "true"