'use strict';


module.exports = function(router) {

  router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('edit-profile');
    }

  });

  router.post('/', function(req, res) {



  });

};
