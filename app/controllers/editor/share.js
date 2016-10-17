'use strict';

const Translate = require('../../templates/helpers/t');
const Crypto = require('crypto');
const Joi = require('joi');

exports.show = {
    auth: {
      scope : 'block'
    },
    handler: function(request, reply) {
        var share = Translate('/web/editor/share', request.auth.credentials, null);
        reply.view('editor/share', { data: share });

    }
};

exports.postShareForm = {
    auth: {
        mode: 'try',
        strategy: 'standard',
        scope : 'block'
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

        var tempPass = Math.random().toString(36).substr(2, 7);
        var tempUsername = Math.random().toString(36).substr(2, 4);
        Crypto.randomBytes(8, function(err, buffer) {

            var newUser = {
                email: request.payload.name_email.toLowerCase(),
                username: tempUsername,
                password: Crypto.createHash('md5').update(tempPass).digest('hex')
            };

            var User = request.server.plugins.sequelize.db.User;
            User.create(newUser).then(function(user) {

                var data = {
                    from: 'epodindianrega@gmail.com',
                    to: user.email,
                    subject: 'Invitation for data entry - PayDash',
                    path: 'emails/editor-share',
                    context: {
                        name: request.auth.credentials.firstname + request.auth.credentials.lastname,
                        url: request.connection.info.protocol + '://' + request.info.host + '/login',
                        username: tempUsername,
                        password: tempPass
                    }
                };
                //  Send Email
                var Mailer = request.server.plugins.mailer;
                Mailer.sendMail(data, function(err, info) {
                    console.log(err);
                });
                request.yar.flash('success', 'An email has sent to this email id with login instructions');
                return reply.redirect('/editor/info');

            }).catch(function(err) {
                request.yar.flash('success', 'User with this email is already registered.');
                return reply.redirect('/editor/info');
            });

        });

    }
};
