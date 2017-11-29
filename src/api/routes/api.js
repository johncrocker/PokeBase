var express = require('express');
var router = express.Router({
    mergeParams: true
});

router.use('/evolution', require('./evolutionapi'));
router.use('/generation', require('./generationapi'));
router.use('/generations', require('./generationsapi'));
router.use('/region', require('./regionapi'));
router.use('/regions', require('./regionsapi'));
router.use('/pokemon', require('./pokemonapi'));
router.use('/species', require('./speciesapi'));

module.exports = router;