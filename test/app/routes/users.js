'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var users = require('../../../app/routes/users');

var lab = exports.lab = Lab.script();

lab.experiment('Users plugin', function() {

    var server = new Hapi.Server();
    server.connection();

    lab.test('Plugins successfully loads', function(done) {

        server.register(users, function(err) {

            Code.expect(err).to.not.exist();
            done();
        });

    });

});
