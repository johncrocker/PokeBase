var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');

router.get('/', function (req, res, next) {
  
  pokemonDb.listRegions()
    .then(function (regions) {
      res.status(200)
        .send(regions);
    }).catch(function (e) {
      log.info('Error in List Regions', e);
      res.status(e.status).send(e);
    });
});

module.exports = router;