'use strict';

const Core = require('../../app/routes/core');
const Auth = require('../../lib/auth');
const Code = require('code');
const Config = require('../../config/config');
const Hapi = require('hapi');
const Lab = require('lab');
const Path = require('path');
const Inert = require('inert');
const HapiAuthCookie = require('hapi-auth-cookie');

const lab = (exports.lab = Lab.script());
let request;
let server;

lab.beforeEach(done => {
    const plugins = [
        { register: Inert },
        { register: HapiAuthCookie },
        { register: Auth, options: Config.get('/authCookie') },
        { register: Core }
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

lab.experiment('Heartbeat', () => {
    lab.beforeEach(done => {
        request = {
            method: 'GET',
            url: '/heartbeat'
        };
        done();
    });

    lab.test('It returns success on heartbeat', done => {
        server.inject(request, response => {
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.match(/OK/i);
            done();
        });
    });
});
