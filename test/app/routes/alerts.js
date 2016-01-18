'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var alerts = require('../../../app/routes/alerts');
var auth = require('../../../lib/auth');

var lab = exports.lab = Lab.script();

lab.experiment('Alert plugin', function() {

    var server = new Hapi.Server();
    server.connection();

    lab.test('Plugins successfully loads', function(done) {
        
        server.register([auth, alerts], function(err) {

            Code.expect(err).to.not.exist();
            
        });

    });

});
