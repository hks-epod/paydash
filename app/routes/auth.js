'use strict';

exports.register = function(plugin, options, next) {
    const Controllers = {
        auth: {
            login: require('../controllers/auth/login'),
            logout: require('../controllers/auth/logout'),
            forgotPassword: require('../controllers/auth/password-forgot'),
            resetPassword: require('../controllers/auth/password-reset')
        }
    };

    plugin.route([
        // Auth Routes
        {
            method: 'GET',
            path: '/login',
            config: Controllers.auth.login.showForm
        },
        {
            method: 'POST',
            path: '/login',
            config: Controllers.auth.login.postForm
        },
        {
            method: '*',
            path: '/logout',
            config: Controllers.auth.logout
        },
        {
            method: 'GET',
            path: '/forgot-password',
            config: Controllers.auth.forgotPassword.showRecoveryForm
        },
        {
            method: 'POST',
            path: '/forgot-password',
            config: Controllers.auth.forgotPassword.postRecoveryForm
        },
        {
            method: 'GET',
            path: '/reset-password/{token}',
            config: Controllers.auth.resetPassword.showResetForm
        },
        {
            method: 'POST',
            path: '/reset-password/{token}',
            config: Controllers.auth.resetPassword.postResetForm
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'auth_routes',
    version: require('../../package.json').version
};
