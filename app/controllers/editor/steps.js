'use strict';

const Queries = require('../../helpers/queries');
const Translate = require('../../templates/helpers/t');

exports.showT2 = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/t2');
    }
};

exports.showT5 = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/t5');
    }
};

exports.showT6 = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/t6');
    }
};

exports.showT7 = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/t7');
    }
};

exports.showT8 = {
    auth: {
      scope : ['block', 'editor']
    },
    handler: function(request, reply) {
        return reply.view('editor/t8');
    }
};