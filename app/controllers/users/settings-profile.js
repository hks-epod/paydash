'use strict';

var Joi = require('joi');

exports.showEditProfile = {
    description: 'Show Edit profile settings',
    handler: function(request, reply) {
        console.log(request.auth.credentials);
        var ctx = {
            user: request.auth.credentials
        };
        reply.view('users/settings-profile', ctx);

    }
};

exports.postEditProfile = {
    description: 'Post Edit profile settings',
    validate: {
        payload: {
            firstName: Joi.string().min(2).max(20).required(),
            lastName: Joi.string().min(2).max(20).required(),
            role: Joi.string().min(2).max(100).required(),
            gender: Joi.string().min(2).max(100).required(),
            dob: Joi.string().min(2).max(100).required(),
            mobile: Joi.string().min(2).max(100).required(),
            email: Joi.string().min(2).max(100).required(),
            sas: Joi.string().min(2).max(100).required(),
            sas_years: Joi.string().min(2).max(100).required(),
            ias: Joi.string().min(2).max(100).required(),
            ias_years: Joi.string().min(2).max(100).required(),
            title: Joi.string().min(2).max(100).required(),
            region_type: Joi.string().min(2).max(100).required(),
            region_name: Joi.string().min(2).max(100).required(),
            work_email: Joi.string().min(2).max(100).required(),
            work_years: Joi.string().min(2).max(100).required(),
            time_on_nrega: Joi.string().min(2).max(100).required()
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

        var User = request.server.plugins.sequelize.db.User;
        // User.findOne({
        //     where: {
        //         id: id
        //     }
        // }).on('success', function(project) {
        //     if (project) { // if the record exists in the db
        //         project.updateAttributes(request.payload).success(function() {

        //         });
        //     }
        // });

        // User.findByIdAndUpdate(id, update, options, function(err, user) {
        //     if (err) {
        //         request.session.flash('error', 'An internal server error occurred');
        //         return reply.redirect('/me/settings/profile');
        //     }
        //     // Reset the session
        //     request.auth.session.clear();
        //     request.auth.session.set(user);
        //     request.session.flash('success', 'Profile successfully saved');
        //     return reply.redirect('/me/settings/profile');
        // });


    }
};
