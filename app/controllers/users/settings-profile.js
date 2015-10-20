'use strict';

var mongoose = require('mongoose');
var Joi = require('joi');
var User = mongoose.model('User');

exports.showEditProfile = {
    description: 'Show Edit profile settings',
    handler: function(request, reply) {
        var id = request.auth.credentials._id.toString();
        User.findById(id, function(err, user) {
            if (err) {
                request.session.flash('error', 'An internal server error occurred');
                reply.redirect('/me/settings/profile');
            }
            var ctx = {
                user: user
            };
            reply.view('users/settings-profile', ctx);
        });
    }
};

exports.postEditProfile = {
    description: 'Post Edit profile settings',
    validate: {
        payload: {
            firstName: Joi.string().min(2).max(20).required(),
            lastName: Joi.string().min(2).max(20).required(),
            location: Joi.string().min(2).max(30).empty('').optional(),
            url: Joi.string().min(2).max(30).empty('').optional(),
            company: Joi.string().min(2).max(30).empty('').optional()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.session.flash('error', 'Bad request');
            return reply.redirect('/me/settings/profile');
        }
    },
    handler: function(request, reply) {

        var id = request.auth.credentials._id.toString();
        // TODO : Move it to the joi validations
        request.payload.updated = Date.now();
        var update = {
            $set: request.payload
        };
        var options = {
            new: true
        };
        User.findByIdAndUpdate(id, update, options, function(err, user) {
            if (err) {
                request.session.flash('error', 'An internal server error occurred');
                return reply.redirect('/me/settings/profile');
            }
            // Reset the session
            request.auth.session.clear();
            request.auth.session.set(user);
            request.session.flash('success', 'Profile successfully saved');
            return reply.redirect('/me/settings/profile');
        });


    }
};
