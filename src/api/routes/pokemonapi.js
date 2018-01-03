var _ = require('underscore');
var express = require('express');
var router = express.Router();
var pokemonDbReader = require('../database/pokemonreader');
var log = require('../log');
var config = require('../config');

router.get('/:name', function (req, res, next) {

  pokemonDbReader.getPokemon(req.params.name)
    .then(function (pokemon) {
      res.status(200).send(pokemon);
    }).catch(function (e) {
      log.info('Error in Get Pokemon', e);
      res.status(e.status).send(e);
    });
});

router.get('/:name/attacks', function (req, res, next) {

  pokemonDbReader.getPokemonTypeEfficacy(req.params.name)
    .then(function (pokemon) {
      res.status(200).send(pokemon);
    }).catch(function (e) {
      log.info('Error in Get Pokemon Type Efficacy', e);
      res.status(e.status).send(e);
    });
});

router.get('/:name/moves', function (req, res, next) {

  pokemonDbReader.getPokemonMoves(req.params.name)
    .then(function (pokemon) {
      res.status(200).send(pokemon);
    }).catch(function (e) {
      log.info('Error in Get Pokemon Moves', e);
      res.status(e.status).send(e);
    });
});

router.get('/:name/attackers', function (req, res, next) {
  var effectiveness = (req.query.effectiveness ? parseInt(req.query.effectiveness) : 0);
  var limit = (req.query.limit ? parseInt(req.query.limit) : Number.MAX_SAFE_INTEGER);

  pokemonDbReader.getEffectivePokemon(req.params.name, effectiveness)
    .then(function (pokemon) {
      res.status(200).send(pokemon.slice(0, limit));
    }).catch(function (e) {
      log.info('Error in Get Pokemon Type Efficacy', e);
      res.status(e.status).send(e);
    });
});

router.get('/:name/evolutions', function (req, res, next) {

  pokemonDbReader.getEvolutions(req.params.name)
    .then(function (evolutions) {
      res.status(200).send(evolutions);
    }).catch(function (e) {
      log.info('Error in Get Pokemon Evolutions', e);
      res.status(e.status).send(e);
    });
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

module.exports = router;