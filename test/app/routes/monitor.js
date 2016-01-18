'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var monitor = require('../../../app/routes/monitor');

var lab = exports.lab = Lab.script();

lab.experiment('Monitor plugin', function() {

    var server = new Hapi.Server();
    server.connection();

    lab.test('Plugins successfully loads', function(done) {
        
        server.register(monitor, function(err) {

            Code.expect(err).to.not.exist();
            done();
        });

    });

});
