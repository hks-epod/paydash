'use strict';

exports.register = function(plugin, options, next) {

    var Controllers = {
        api: {
            login: require('../controllers/api/login'),
            logout: require('../controllers/api/logout'),
            cards: require('../controllers/api/cards'),
            profile: require('../controllers/api/profile'),
            translate: require('../controllers/api/translate'),
            notifications: require('../controllers/api/notifications')
        }
    };

    plugin.route([

        // Api routes
        {
            method: 'POST',
            path: '/api/login',
            config: Controllers.api.login.postForm
        }, {
            method: 'POST',
            path: '/api/profile',
            config: Controllers.api.profile.postEditProfile
        }, {
            method: '*',
            path: '/api/logout',
            config: Controllers.api.logout.postForm
        }, {
            method: 'GET',
            path: '/api/cards',
            config: Controllers.api.cards.getData
        }, {
            method: 'GET',
            path: '/api/translate',
            config: Controllers.api.translate.getData
        }, {
            method: 'GET',
            path: '/api/notifications/unread',
            config: Controllers.api.notifications.showUnreadNotifications
        }, {
            method: 'GET',
            path: '/api/notifications/read',
            config: Controllers.api.notifications.showReadNotifications
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api_routes',
    version: require('../../package.json').version
};
