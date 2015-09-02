/**
 * A custom library to establish a database connection
 */
'use strict';
var mysql = require('mysql');

var db = function() {
  return {
    /**
     * Open a connection to the database
     * @param conf
     */
    config: function(conf) {

      var pool = mysql.createPool(conf);

      return pool;
    }
  };
};

module.exports = db();
