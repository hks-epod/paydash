var express = require('express');
var mysql = require('mysql');

var router = express.Router();
 
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'NodeJSExamples'
});
 
/* GET users listing. */
router.get('/', function(req, res) {
 
    console.log(req);
 
    pool.getConnection(function(err, connection) {
 
        if (err) {
            console.error("An error occurred: " + err);
        }
 
        connection.query('select * from Person', function(err, rows) {
            if (err) {
                throw err;
            } else {
                res.json(rows);
                res.end();
            }
 
            connection.release();
        });
    });
});
 
module.exports = router;