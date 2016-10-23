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
        },
         //  T + 2
        {
            method: 'GET',
            path: '/editor/t2',
            config: Controllers.editor.steps.showT2
        },
        //  T + 5
        {
            method: 'GET',
            path: '/editor/t5',
            config: Controllers.editor.steps.showT5
        },
        //  T + 6
        {
            method: 'GET',
            path: '/editor/t6',
            config: Controllers.editor.steps.showT6
        },
        //  T + 7
        {
            method: 'GET',
            path: '/editor/t7',
            config: Controllers.editor.steps.showT2
        },
        //  T + 8
        {
            method: 'POST',
            path: '/editor/t8',
            config: Controllers.editor.steps.showT8
        },
    ]);

    next();
};

exports.register.attributes = {
    name: 'editor_routes',
    version: require('../../package.json').version
};
