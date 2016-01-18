'use strict';
var d3 = require('d3');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/analysis', null, {
            layout: 'monitor'
        });
    }
};

exports.getData = {
    handler: function(request, reply) {

        var User = request.server.plugins.sequelize.db.User;
        // Analysis api code here.

        // Full payment duration
        // {
        //     'treatment': {
        //         'series': [

        //         ]
        //     }

        //     'control': {
        //         'series': [

        //         ]
        //     }
        //     'summary': {
        //         'treatmentMean': ,
        //         'controlMean': ,
        //         'pValue': ,
        //     }
        // }

        // // Stepwise payment duration
        // {
        //     'treatment': {
        //         'series': [

        //         ]
        //     }

        //     'control': {
        //         'series': [

        //         ]
        //     }
        //     'summary': {
        //         'treatmentMean': ,
        //         'controlMean': ,
        //         'pValue': ,
        //     }
        // }

        // // Person-days
        // {
        //     'treatment': {
        //         'series': [

        //         ]
        //     }

        //     'control': {
        //         'series': [

        //         ]
        //     }
        //     'summary': {
        //         'treatmentMean': ,
        //         'controlMean': ,
        //         'pValue': ,
        //     }
        // }

        // // Expenditures
        // {
        //     'treatment': {
        //         'series': [

        //         ]
        //     }

        //     'control': {
        //         'series': [

        //         ]
        //     }
        //     'summary': {
        //         'treatmentMean': ,
        //         'controlMean': ,
        //         'pValue': ,
        //     }
        // }



    }
};
