'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            settings: {
                profile: require('../controllers/users/settings-profile'),
                account: require('../controllers/users/settings-account'),
                notifications: require('../controllers/users/settings-notifications'),
            }
        };

        plugin.route([

            // Settings - Show Edit profile
            {
                method: 'GET',
                path: '/me/settings/profile',
                config: Controllers.settings.profile.showEditProfile
            },
            // Settings - Post Edit profile
            {
                method: 'POST',
                path: '/me/settings/profile',
                config: Controllers.settings.profile.postEditProfile
            },
            // Settings - Show Edit account
            {
                method: 'GET',
                path: '/me/settings/account',
                config: Controllers.settings.account.showEditAccount
            },
            // Settings - Post Edit account for change password
            {
                method: 'POST',
                path: '/me/settings/account/change-password',
                config: Controllers.settings.account.postChangePassword
            },
            // Settings - Show notifications form
            {
                method: 'GET',
                path: '/me/settings/notifications',
                config: Controllers.settings.notifications.showNotificationForm
            }
        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'user_routes',
    version: require('../../package.json').version
};
