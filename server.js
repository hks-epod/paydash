'use strict';

const Composer = require('./index');
const Hoek = require('hoek');

Composer((err, server) => {

    Hoek.assert(!err, err);
    server.start(() => {
        console.log(`Server started @ ${server.info.uri}`);
    });
    
});
