var express = require('express');
var router = express.Router({
    mergeParams: true
});

router.use('/generation', require('./generationapi'));
router.use('/generations', require('./generationsapi'));
router.use('/pokemon', require('./pokemonapi'));
router.use('/species', require('./speciesapi'));

module.exports = router;