'use strict';

var DashboardModel = require('../models/dashboard');

module.exports = function(router) {

  var dashboardmodel = new DashboardModel();

  router.get('/', function(req, res) {
    res.render('dashboard', dashboardmodel);
  });



};
