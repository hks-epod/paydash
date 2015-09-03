'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('lodash');

module.exports = function(router) {

  router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('edit-profile');
    } else {
      res.redirect('/login');
    }

  });

  router.post('/', function(req, res) {

    var user = req.user;
    delete req.body.role;

    if (user) {
      user = _.extend(user, req.body);
      user.updated = Date.now();
      user.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: 'err'
          });
        } else {
          req.login(user, function(err) {
            if (err) {
              res.status(400).send(err);
            } else {
               res.render('edit-profile');
            }
          });
        }
      });
    } else {
      res.status(400).send({
        message: 'User is not signed in'
      });
    }


  });

};
