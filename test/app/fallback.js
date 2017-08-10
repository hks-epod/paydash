'use strict';

const Core = require('../../app/routes/core');
const Auth = require('../../lib/auth');
const Code = require('code');
const Config = require('../../config/config');
const Hapi = require('hapi');
const Lab = require('lab');
const Path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const HapiAuthCookie = require('hapi-auth-cookie');

const lab = (exports.lab = Lab.script());
let request;
let server;

lab.beforeEach(done => {
    const plugins = [
        { register: Inert },
        { register: Vision },
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

        server.views({
            engines: { hbs: require('handlebars') },
            path: './app/templates',
            relativeTo: Path.join(__dirname, '..', '..')
        });

        done();
    });
});

lab.experiment('Fallback page View', () => {
    lab.beforeEach(done => {
        request = {
            method: 'GET',
            url: '/404'
        };

        done();
    });

    lab.test('404 renders properly', done => {
        server.inject(request, response => {
            Code.expect(response.statusCode).to.equal(404);
            done();
        });
    });
});
