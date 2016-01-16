'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var alerts = require('../../../app/routes/alerts');

var lab = exports.lab = Lab.script();

lab.experiment('Alert plugin', function() {

    var server = new Hapi.Server();

    lab.test('Plugins successfully loads', function(done) {

        server.register(alerts, function(err) {
            Code.expect(err).to.not.exist();
            done();
        });

    });

});
