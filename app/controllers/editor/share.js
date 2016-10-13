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

        Crypto.randomBytes(8, function(err, buffer) {

            var newUser = {
                email: request.payload.name_email.toLowerCase(),
                password: Crypto.createHash('md5').update('123456').digest('hex')
            };

            var User = request.server.plugins.sequelize.db.User;

            User.create(newUser).success(function(user) {

                var data = {
                    from: 'epodindianrega@gmail.com',
                    to: user.email,
                    subject: 'Invitation for data entry - PayDash',
                    path: 'emails/editor-share',
                    context: {
                        name: request.auth.credentials.first_name + request.auth.credentials.last_name,
                        url: request.connection.info.protocol + '://' + request.info.host + '/login'
                    }
                };
                //  Send Email
                var Mailer = request.server.plugins.mailer;
                Mailer.sendMail(data, function(err, info) {
                    //  Email Sent 
                });
                request.yar.flash('success', 'An email has sent to this email id with login instructions');
                return reply.redirect('/editor/info');

            });

            
        });

    }
};
