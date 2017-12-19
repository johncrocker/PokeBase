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
      res.status(e.status).send(e);
    });
});

router.get('/:number/species', function (req, res, next) {

  pokemonDb.getGenerationSpecies(req.params.number)
    .then(function (generation) {
      res.status(200)
        .send(generation);
    }).catch(function (e) {
      log.info('Error in Get Generation Species', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/evolutions', function (req, res, next) {

  pokemonDb.getGenerationEvolutions(req.params.number)
    .then(function (evolutions) {
      res.status(200).send(evolutions);
    }).catch(function (e) {
      log.info('Error in Get Generation Evolutions', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/evolutions/outside', function (req, res, next) {

  pokemonDb.getEvolutionsOutsideGeneration(req.params.number)
    .then(function (evolutions) {
      res.status(200).send(evolutions);
    }).catch(function (e) {
      log.info('Error in Get Evolutions Outside Generation', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/evolutions/inside', function (req, res, next) {

  pokemonDb.getEvolutionsInsideGeneration(req.params.number)
    .then(function (evolutions) {
      res.status(200).send(evolutions);
    }).catch(function (e) {
      log.info('Error in Get Evolutions Inside Generation', e);
      res.status(e.status).send(e);
    });
});

module.exports = router;