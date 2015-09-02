'use strict';

var ApiModel = require('../../models/api');

module.exports = function(router) {

  router.get('/', function(req, res) {

    ApiModel.blocks(function(data) {
      res.json(data);
    });

  });

};
