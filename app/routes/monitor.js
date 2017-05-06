'use strict';

exports.register = function(plugin, options, next) {
    const Controllers = {
        monitor: {
            usage: require('../controllers/monitor/usage'),
            outcome: require('../controllers/monitor/outcome'),
            system: require('../controllers/monitor/system')
        }
    };

    plugin.route([
        // User monitoring dashbaord
        {
            method: 'GET',
            path: '/monitor/usage',
            config: Controllers.monitor.usage.showPage
        },
        // usgae monitoring metric data
        {
            method: 'GET',
            path: '/monitor/usage/metric',
            config: Controllers.monitor.usage.metric
        },
        // usgae monitoring data
        {
            method: 'POST',
            path: '/monitor/usage/data',
            config: Controllers.monitor.usage.data
        },
        // Outcome monitoring dashbaord
        {
            method: 'GET',
            path: '/monitor/outcome',
            config: Controllers.monitor.outcome.showPage
        },
        // Outcome monitoring data
        {
            method: 'GET',
            path: '/monitor/outcome/data',
            config: Controllers.monitor.outcome.getData
        },
        // System monitoring dashbaord
        {
            method: 'GET',
            path: '/monitor/system',
            config: Controllers.monitor.system.showPage
        },
        // System monitoring data
        {
            method: 'GET',
            path: '/monitor/system/data',
            config: Controllers.monitor.system.getData
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'monitor_routes',
    version: require('../../package.json').version
};
