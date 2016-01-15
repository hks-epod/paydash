'use strict';

var path = require('path');
var readline = require('readline');
var fs = require('fs');

exports.showPage = {
    handler: function(request, reply) {
        return reply.view('monitor/server', null, {
            layout: 'monitor'
        });
    }
};

exports.getData = {
    handler: function(request, reply) {

        var stats = [];
        var statPath = path.resolve(__dirname + '/../../../logs/stats/stats.log');
        var lineReader = readline.createInterface({
            input: fs.createReadStream(statPath)
        });

        lineReader.on('line', function(line) {
            stats.push(JSON.parse(line));
        });

        lineReader.on('close', function() {
            reply(stats);
        });

    }
};
