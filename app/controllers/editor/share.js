'use strict';

const Translate = require('../../templates/helpers/t');
const Crypto = require('crypto');
const Joi = require('joi');

exports.show = {
    handler: function(request, reply) {

        var share = Translate('/web/editor/share', request.auth.credentials, null);
        reply.view('editor/share', { data: share });

    }
};

exports.postRecoveryForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    validate: {
        payload: {
            name_email: Joi.string().min(2).max(20).required()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.session.flash('error', 'Bad request');
            return reply.redirect('/editor/share');
        }
    },
    handler: function(request, reply) {
        //  Create user and send pass info

        

    }
};
