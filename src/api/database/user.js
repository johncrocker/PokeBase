var Promise = require('bluebird');
var config = require('../config');
var log = require('../log');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var lib = {
    findOrCreate: function (accessToken, refreshToken, profile) {
        return new Promise(function (resolve, reject) {
            lib.isAllowed(profile).then(function () {
                lib.find(profile).then(function (user) {
                    resolve(user);
                }).catch(function (err) {

                    lib.create(profile)
                        .then(function (user) {
                            resolve(user);
                        }).catch(function (err) {
                            reject(err);
                        });
                });
            }).catch(function () {
                reject();
            });
        });
    },
    findOrCreateByEmail: function (accessToken, refreshToken, profile) {
        return new Promise(function (resolve, reject) {
            var email = determineEmail(profile);

            if (email == '') {
                reject();
                return;
            }

            lib.isAllowed(profile).then(function () {
                lib.findByEmail(profile).then(function (user) {
                    resolve(user);
                }).catch(function (err) {
                    lib.create(profile)
                        .then(function (user) {
                            resolve(user);
                        }).catch(function (err) {
                            reject(err);
                        });
                });
            }).catch(function () {
                resolve();
            });
        });
    },
    isAllowed: function (profile) {
        return new Promise(function (resolve, reject) {
            var filename = process.env.POKEDEX_USER_DATABASE;
            var db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
            var email = determineEmail(profile);

            if (email == '') {
                reject();
                return;
            }

            db.get("SELECT email FROM allowedusers WHERE email = ?", email, function (err, row) {
                if (row != null) {
                    resolve();
                } else {
                    reject();
                }
            });

            db.close();
        });
    },
    findById: function (id) {
        return new Promise(function (resolve, reject) {
            var filename = process.env.POKEDEX_USER_DATABASE;
            var db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
            var user = null;

            db.get("SELECT id, fullName, provider, email FROM users WHERE id = ?", id, function (err, row) {
                if (row != null) {
                    user = {
                        id: row.id,
                        fullname: row.fullName,
                        provider: row.provider,
                        email: row.email
                    };
                    resolve(user);
                } else {
                    reject();
                }
            });

            db.close();
        });
    },
    find: function (profile) {
        return new Promise(function (resolve, reject) {
            var filename = process.env.POKEDEX_USER_DATABASE;
            var db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
            var user = null;

            db.get("SELECT id, fullName, provider, email FROM users WHERE id = ?", profile.id, function (err, row) {
                if (row != null) {
                    user = {
                        id: row.id,
                        fullname: row.fullName,
                        provider: row.provider,
                        email: row.email
                    };
                    resolve(user);
                } else {
                    reject();
                }
            });

            db.close();
        });
    },
    findByEmail: function (profile) {
        return new Promise(function (resolve, reject) {
            var filename = process.env.POKEDEX_USER_DATABASE;
            var db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
            var user = null;
            var email = determineEmail(profile);

            db.get("SELECT id, fullName, provider, email FROM users WHERE email = ?", email, function (err, row) {
                if (row != null) {
                    user = {
                        id: row.id,
                        fullname: row.fullName,
                        provider: row.provider,
                        email: row.email
                    };
                    resolve(user);
                } else {
                    reject();
                }
            });

            db.close();
        });
    },
    create: function (profile) {
        return new Promise(function (resolve, reject) {
            var filename = process.env.POKEDEX_USER_DATABASE;
            var db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
            var user = {
                id: profile.id,
                fullname: profile.fullName,
                provider: profile.provider
            };
            var email = determineEmail(profile);

            db.run("INSERT INTO users (id, fullName, provider, email) VALUES (?, ?, ?, ?)", profile.id, profile.displayName, profile.provider, email);
            resolve(user);
        });
    },
    ensureDatabase: function () {
        var filename = process.env.POKEDEX_USER_DATABASE;
        if (!fs.existsSync(filename)) {
            lib.createSchema();
        }
    },
    createSchema: function () {
        var filename = process.env.POKEDEX_USER_DATABASE;
        var db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

        db.serialize(function () {
            db.run("CREATE TABLE users (id TEXT, fullName TEXT, email TEXT, provider TEXT)");
            db.run("CREATE TABLE allowedusers (email TEXT)");
        });

        db.close();
    }
};

function determineEmail(profile) {
    var email = '';

    for (var i = 0; i < profile.emails.length; i++) {
        if (profile.emails[i].type == 'account') {
            email = profile.emails[i].value;
        }
    }

    if ((email == '') && (profile.emails.length > 0)) {
        email = profile.emails[0].value;
    }

    return email;
}

module.exports = lib;