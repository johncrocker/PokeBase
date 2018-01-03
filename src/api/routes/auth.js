var passport = require('passport');
var config = require('../config');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var express = require('express');
var router = express.Router({
    mergeParams: true
});
var user = require('../database/user');

passport.use(new GoogleStrategy({
        clientID: process.env.POKEDEX_CLIENT_ID,
        clientSecret: process.env.POKEDEX_SECRET,
        callbackURL: process.env.POKEDEX_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, cb) {
        user.findOrCreateByEmail(accessToken, refreshToken, profile)
            .then(function (user) {
                cb(null, user);                
            }).catch(function () {
                cb({}, null);                
            });
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    user.findById(id).then(function (user) {
        cb(null, user);
    }).catch(function () {
        cb({}, null);
    });
});

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/accessdenied.html'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;