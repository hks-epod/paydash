'use strict';

module.exports = function(router) {

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

};
