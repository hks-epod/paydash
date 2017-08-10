'use strict';

const Lab = require('lab');
const Code = require('code');
const Manifest = require('../../config/manifest');

let lab = (exports.lab = Lab.script());

lab.experiment('Manifest', function() {
    lab.test('It gets manifest data', function(done) {
        Code.expect(Manifest.get('/')).to.be.an.object();

        done();
    });

    lab.test('It gets manifest meta data', function(done) {
        Code.expect(Manifest.meta('/')).to.match(/App manifest/i);

        done();
    });
});
