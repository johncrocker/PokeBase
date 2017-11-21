var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');
var config = require('../config');
var path = require('path');
var fs = require('fs');

router.get('/:name', function (req, res, next) {

  pokemonDb.getPokemon(req.params.name)
    .then(function (pokemon) {
      res.status(200).send(pokemon);
    }).catch(function (e) {
      log.info('Error in Get Pokemon', e);
      res.status(e.statusCode).send(e);
    });
});

router.get('/:name/attacks', function (req, res, next) {

  pokemonDb.getPokemonTypeEfficacy(req.params.name)
    .then(function (pokemon) {
      res.status(200).send(pokemon);
    }).catch(function (e) {
      log.info('Error in Get Pokemon Type Efficacy', e);
      res.status(e.statusCode).send(e);
    });
});

router.get('/:name/image', function (req, res, next) {
  var imagePath = '';

  pokemonDb.getPokemon(req.params.name)
    .then(function (pokemon) {
      downloadImage(pad(pokemon.id, 3) + '.jpg', res);
    }).catch(function (e) {
      downloadImage('empty.jpg', res);
    });
});

function downloadImage(filename, res) {
  var file = path.join(path.resolve(config.get('imagePath')), filename);
  if (!fs.existsSync(file)) {
    file = path.join(path.resolve(config.get('imagePath')), 'empty.jpg');
  }

  var s = fs.createReadStream(file);
  s.on('open', function () {
    res.set('Content-Disposition', 'inline; filename="' + filename + '"');
    res.set('Content-Type', 'image/jpeg');
    s.pipe(res);
  });
  s.on('error', function (err) {
    res.set('Content-Type', 'text/plain');
    res.status(404).send(err);
  });
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

module.exports = router;