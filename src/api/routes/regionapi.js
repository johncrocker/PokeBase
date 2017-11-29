var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');
 
router.get('/:number', function (req, res, next) {
  
  pokemonDb.getRegion(req.params.number)
    .then(function (generation) {
      res.status(200)
        .send(generation);
    }).catch(function (e) {
      log.info('Error in Get Region', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/species', function (req, res, next) {
  
  pokemonDb.getRegionSpecies(req.params.number)
    .then(function (generation) {
      res.status(200)
        .send(generation);
    }).catch(function (e) {
      log.info('Error in Get Region Species', e);
      res.status(e.status).send(e);
    });
});

module.exports = router;