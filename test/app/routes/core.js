'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var core = require('../../../app/routes/core');

var lab = exports.lab = Lab.script();

lab.experiment('Auth plugin', function() {

    var server = new Hapi.Server();
    server.connection();

    lab.test('Plugins successfully loads', function(done) {
        
        server.register(core, function(err) {

            Code.expect(err).to.not.exist();
            done();
        });

    });

});
