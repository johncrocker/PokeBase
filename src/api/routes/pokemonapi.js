var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');

router.get('/pokemon/:name', function (req, res, next) {
    log.debug(req.params);
    pokemonDb.getPokemon(req.params.name)
      .then(function (pokemon) {
        res.status(200)
          .send(pokemon);
      }).catch(function (e) {
        log.info('Error in Get Pokemon', e);
      });  
});

module.exports = router;