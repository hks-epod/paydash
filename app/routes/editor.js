'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        editor: {
            info : require('../controllers/editor/info'),
            share : require('../controllers/editor/share'),
            editor : require('../controllers/editor/editor')
        }
    };

    plugin.route([

        //  Editor info
        {
            method: 'GET',
            path: '/editor/info',
            config: Controllers.editor.info.show
        },
        //  Editor data
        {
            method: 'GET',
            path: '/editor/data',
            config: Controllers.editor.editor.getData
        },
        //  Share 
        {
            method: 'GET',
            path: '/editor/share',
            config: Controllers.editor.share.show
        },
        //  Share 
        {
            method: 'POST',
            path: '/editor/share',
            config: Controllers.editor.share.postShareForm
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'editor_routes',
    version: require('../../package.json').version
};
