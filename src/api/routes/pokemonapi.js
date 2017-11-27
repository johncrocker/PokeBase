var _ = require('underscore');
var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');
var config = require('../config');
var image = require('../lib/image');

router.get('/:name', function (req, res, next) {

  pokemonDb.getPokemon(req.params.name)
    .then(function (pokemon) {
      res.status(200).send(pokemon);
    }).catch(function (e) {
      log.info('Error in Get Pokemon', e);
      res.status(e.status).send(e);
    });
});

router.get('/:name/attacks', function (req, res, next) {

  pokemonDb.getPokemonTypeEfficacy(req.params.name)
    .then(function (pokemon) {
      res.status(200).send(pokemon);
    }).catch(function (e) {
      log.info('Error in Get Pokemon Type Efficacy', e);
      res.status(e.status).send(e);
    });
});

router.get('/:name/attackers', function (req, res, next) {
  var effectiveness = (req.query.effectiveness ? parseInt(req.query.effectiveness) : 0);
  var limit = (req.query.limit ? parseInt(req.query.limit) : Number.MAX_SAFE_INTEGER);

  pokemonDb.getEffectivePokemon(req.params.name, effectiveness)
    .then(function (pokemon) {
      res.status(200).send(pokemon.slice(0, limit));
    }).catch(function (e) {
      log.info('Error in Get Pokemon Type Efficacy', e);
      res.status(e.status).send(e);
    });
});

router.get('/:name/image', function (req, res, next) {
  var size = (req.query.size ? parseInt(req.query.size) : 0);
  
  pokemonDb.getPokemon(req.params.name)
    .then(function (pokemon) {
      image.downloadImage(pad(pokemon.id, 3) + '.png', res, size);
    }).catch(function (e) {
      image.downloadImage('empty.jpg', res, size);
    });
});


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

module.exports = router;