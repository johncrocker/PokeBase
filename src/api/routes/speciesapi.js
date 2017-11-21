var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');

router.get('/', function (req, res, next) {
  
  pokemonDb.listSpecies()
    .then(function (species) {
      res.status(200)
        .send(species);
    }).catch(function (e) {
      log.info('Error in List Species', e);
      res.status(e.statusCode).send(e);
    });
});

router.get('/:species', function (req, res, next) {
  
  pokemonDb.getSpecies(req.params.species)
    .then(function (species) {
      res.status(200)
        .send(species);
    }).catch(function (e) {
      log.info('Error in Get Species', e);
      res.status(e.statusCode).send(e);
    });
});

module.exports = router;