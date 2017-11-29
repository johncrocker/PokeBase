var express = require('express');
var router = express.Router();
var pokemonDb = require('../database/pokemon');
var log = require('../log');

router.get('/:triggerId/:itemId', function (req, res, next) {

    pokemonDb.getEvolutionTrigger(req.params.triggerId, req.params.itemId)
        .then(function (items) {
            res.status(200)
                .send(items);
        }).catch(function (e) {
            log.info('Error in List items', e);
            res.status(e.status).send(e);
        });
});

router.get('/items', function (req, res, next) {

    pokemonDb.listItems()
        .then(function (items) {
            res.status(200)
                .send(items);
        }).catch(function (e) {
            log.info('Error in List items', e);
            res.status(e.status).send(e);
        });
});

router.get('/triggers', function (req, res, next) {

    pokemonDb.listEvolutionTriggers()
        .then(function (triggers) {
            res.status(200)
                .send(triggers);
        }).catch(function (e) {
            log.info('Error in List Evolution Triggers', e);
            res.status(e.status).send(e);
        });
});

module.exports = router;