'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        editor: {
            info : require('../controllers/editor/contact')
        }
    };

    plugin.route([

        //  Muster cards
        {
            method: 'GET',
            path: '/editor/summary',
            config: Controllers.editor.info.show
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'editor_routes',
    version: require('../../package.json').version
};
