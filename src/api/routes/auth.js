var passport = require('passport');
var config = require('../config');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var express = require('express');
var router = express.Router({
    mergeParams: true
});


passport.use(new GoogleStrategy({
        clientID: config.get('clientId'),
        clientSecret: config.get('secret'),
        callbackURL: config.get('callbackUrl')
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }));


router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;