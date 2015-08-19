'use strict';

var express = require('express'),
  passport = require('passport'),
  auth = require('../lib/auth'),
  userLib = require('./user')(),
  db = require('../lib/database'),
  crypto = require('../lib/crypto');

module.exports = function spec(app) {
  app.on('middleware:after:session', function configPassport(eventargs) {
    passport.use(auth.localStrategy());
    passport.serializeUser(userLib.serialize);
    passport.deserializeUser(userLib.deserialize);
    app.use(passport.initialize());
    app.use(passport.session());
  });
  return {
    onconfig: function(config, next) {

      var dbConfig = config.get('databaseConfig'),
        cryptConfig = config.get('bcrypt');

      crypto.setCryptLevel(cryptConfig.difficulty);
      db.config(dbConfig);
      next(null, config);
    }
  };

};
