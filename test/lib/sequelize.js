'use strict';

const Sequelize = require('../../lib/sequelize');
const Code = require('code');
const Config = require('../../config/config');
const Hapi = require('hapi');
const Lab = require('lab');
const Path = require('path');

const lab = (exports.lab = Lab.script());
let request;
let server;

lab.beforeEach(done => {
    const plugins = [
        {
            register: Sequelize,
            options: Config.get('/sequelize')
        }
    ];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, err => {
        if (err) {
            return done(err);
        }
        done();
    });
});

lab.experiment('Sequelize', () => {
    lab.test('It should have sequelize instance', done => {
        let sequelize = server.plugins.sequelize;
        Code.expect(sequelize).to.be.an.object();
        done();
    });
});
