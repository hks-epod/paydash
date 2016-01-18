'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var musters = require('../../../app/routes/musters');

var lab = exports.lab = Lab.script();

lab.experiment('Musters plugin', function() {

    var server = new Hapi.Server();
    server.connection();

    lab.test('Plugins successfully loads', function(done) {
        
        server.register(musters, function(err) {

            Code.expect(err).to.not.exist();
            done();
        });

    });

});
