'use strict';

var Joi = require('joi');
var Nodemailer = require('nodemailer');
var Sgtransport = require('nodemailer-sendgrid-transport');
var NodemailerPluginInlineBase64 = require('nodemailer-plugin-inline-base64');
var Juice = require('juice');

// Declare internals
var internals = {};
internals.config = {
    inlineImages: true,
    inlineStyles: true
};

internals.schema = Joi.object({
    sendgrid: Joi.object()
});

exports.register = function(server, options, next) {
    Joi.assert(options, internals.schema);
    internals.config.transport = options.sendgrid;

    var client = Nodemailer.createTransport(Sgtransport(internals.config.transport));

    if (internals.config.inlineImages) {
        client.use('compile', NodemailerPluginInlineBase64);
    }

    server.expose('sendMail', function(data, callback) {
        internals.renderOptions = {
            layout: false
        };
        server.render(data.path, data.context, internals.renderOptions, function(err, rendered) {
            if (err) {
                return callback(err);
            }
            if (internals.config.inlineStyles) {
                rendered = Juice(rendered);
            }
            data.html = rendered;
            delete data.context;

            client.sendMail(data, callback);
        });
    });

    return next();
};

exports.register.attributes = {
    name: 'mailer'
};
