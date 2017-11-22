var _ = require('underscore');
var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');

router.get('/all', function (req, res, next) {

  pokemonDb.listSpecies()
    .then(function (species) {
      res.status(200)
        .send(species);
    }).catch(function (e) {
      log.info('Error in List Species', e);
      res.status(e.status).send(e);
    });
});

router.get('/list', function (req, res, next) {

  pokemonDb.listUniqueSpecies()
    .then(function (species) {
      var result = [];
      _.each(species, function (element) {
        result.push({
          id: element.id,
          name: element.name
        });
      })
      res.status(200).send(result);
    }).catch(function (e) {
      log.info('Error in List Species', e);
      res.status(e.status).send(e);
    });
});

router.get('/:species', function (req, res, next) {

  pokemonDb.getSpecies(req.params.species)
    .then(function (species) {
      res.status(200)
        .send(species);
    }).catch(function (e) {
      log.info('Error in Get Species', e);
      res.status(e.status).send(e);
    });
});

module.exports = router;