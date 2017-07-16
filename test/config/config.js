'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../config/config');

let lab = (exports.lab = Lab.script());

lab.experiment('Config', function() {
    lab.test('It gets config data', function(done) {
        Code.expect(Config.get('/')).to.be.an.object();
        done();
    });

    lab.test('It gets config meta data', function(done) {
        Code.expect(Config.meta('/')).to.match(/App configuration/i);
        done();
    });
});
