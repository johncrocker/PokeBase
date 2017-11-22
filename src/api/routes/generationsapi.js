var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');

router.get('/', function (req, res, next) {
  
  pokemonDb.listGenerations()
    .then(function (generations) {
      res.status(200)
        .send(generations);
    }).catch(function (e) {
      log.info('Error in List Generations', e);
      res.status(e.status).send(e);
    });
});

module.exports = router;