var express = require('express');
var router = express.Router();
var pokemonDbReader = require('../database/pokemonreader');
var log = require('../log');

router.get('/:number', function (req, res, next) {

  pokemonDbReader.getGeneration(req.params.number)
    .then(function (generation) {
      res.status(200)
        .send(generation);
    }).catch(function (e) {
      log.info('Error in Get Generation', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/species', function (req, res, next) {

  pokemonDbReader.getGenerationSpecies(req.params.number)
    .then(function (generation) {
      res.status(200)
        .send(generation);
    }).catch(function (e) {
      log.info('Error in Get Generation Species', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/evolutions', function (req, res, next) {

  pokemonDbReader.getGenerationEvolutions(req.params.number)
    .then(function (evolutions) {
      res.status(200).send(evolutions);
    }).catch(function (e) {
      log.info('Error in Get Generation Evolutions', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/evolutions/outside', function (req, res, next) {

  pokemonDbReader.getEvolutionsOutsideGeneration(req.params.number)
    .then(function (evolutions) {
      res.status(200).send(evolutions);
    }).catch(function (e) {
      log.info('Error in Get Evolutions Outside Generation', e);
      res.status(e.status).send(e);
    });
});

router.get('/:number/evolutions/inside', function (req, res, next) {

  pokemonDbReader.getEvolutionsInsideGeneration(req.params.number)
    .then(function (evolutions) {
      res.status(200).send(evolutions);
    }).catch(function (e) {
      log.info('Error in Get Evolutions Inside Generation', e);
      res.status(e.status).send(e);
    });
});

module.exports = router;