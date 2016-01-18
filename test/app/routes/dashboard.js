'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var dashboard = require('../../../app/routes/dashboard');

var lab = exports.lab = Lab.script();

lab.experiment('Dashboard plugin', function() {

    var server = new Hapi.Server();
    server.connection();

    lab.test('Plugins successfully loads', function(done) {
        
        server.register(dashboard, function(err) {

            Code.expect(err).to.not.exist();
            done();
        });

    });

});
