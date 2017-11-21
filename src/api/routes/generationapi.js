var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');
 
router.get('/:number', function (req, res, next) {
  
  pokemonDb.getGeneration(req.params.number)
    .then(function (generation) {
      res.status(200)
        .send(generation);
    }).catch(function (e) {
      log.info('Error in Get Generation', e);
      res.status(e.statusCode).send(e);
    });
});

router.get('/:number/species', function (req, res, next) {
  
  pokemonDb.getGenerationSpecies(req.params.number)
    .then(function (generation) {
      res.status(200)
        .send(generation);
    }).catch(function (e) {
      log.info('Error in Get Generation Species', e);
      res.status(e.statusCode).send(e);
    });
});

module.exports = router;