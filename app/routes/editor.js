'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        editor: {
            info : require('../controllers/editor/info'),
            share : require('../controllers/editor/share')
        }
    };

    plugin.route([

        //  Editor info
        {
            method: 'GET',
            path: '/editor/info',
            config: Controllers.editor.info.show
        },
        //  Share 
        {
            method: 'GET',
            path: '/editor/share',
            config: Controllers.editor.share.show
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'editor_routes',
    version: require('../../package.json').version
};
