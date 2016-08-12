'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        api: {
            login: require('../controllers/api/login'),
            logout: require('../controllers/api/logout'),
            account: require('../controllers/api/account'),
            cards: require('../controllers/api/cards'),
            profile: require('../controllers/api/profile'),
            translate: require('../controllers/api/translate')
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
        },{
            method: 'POST',
            path: '/api/password-change',
            config: Controllers.api.account.postChangePassword
        }, {
            method: 'GET',
            path: '/api/cards',
            config: Controllers.api.cards.getData
        }, {
            method: 'GET',
            path: '/api/translate',
            config: Controllers.api.translate.getData
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api_routes',
    version: require('../../package.json').version
};
