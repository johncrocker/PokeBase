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

LOAD CSV WITH HEADERS FROM "file:///pokemon.csv" AS value
MERGE (pokemon:Pokemon {id: value.id}) 
ON CREATE SET pokemon.name = value.identifier, pokemon.weight = value.weight, pokemon.is_default = value.is_default, pokemon.height = value.height, pokemon.base_xp = value.base_experience, pokemon.id = value.id, pokemon.species_id = value.species_id;

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
ON CREATE SET move.name = value.identifier, move.id = value.id;

LOAD CSV WITH HEADERS FROM "file:///moves.csv" AS value 
MATCH (move:Move {id: value.id}) , (generation:Generation {id: value.generation_id})
CREATE(move)-[:HAS_GENERATION]->(generation);

LOAD CSV WITH HEADERS FROM "file:///pokemon_moves.csv" AS value 
MATCH (pokemon:Pokemon {id: value.pokemon_id}), (move:Move {id: value.move_id}) 
MERGE(pokemon)-[:HAS_MOVE]->(move);

