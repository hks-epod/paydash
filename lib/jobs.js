'use strict';

var path = require('path');
var readline = require('readline');
var glob = require('glob');
var fs = require('fs');


var today = new Date();
var logDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
var logFilePattern = 'logs/ops/payops-' + logDate + '-*.log';

var stats = {
    date: logDate,
    // date: '2016-01-10',
    cpu: null,
    mem_total: null,
    mem_used: null,
    uptime: null,
    heap_total: null,
    heap_used: null,
    sample_count: 0
};

glob(logFilePattern, function(er, files) {
    var counter = 0;
    files.forEach(function(file) {
        var lineReader = readline.createInterface({
            input: fs.createReadStream(file)
        });
        lineReader.on('line', function(line) {
            var ops = JSON.parse(line);
            if (!stats.cpu) {
                stats.cpu = ops.os.load[2];
                stats.mem_total = ops.os.mem.total;
                stats.mem_used = ops.proc.mem.rss;
                stats.heap_total = ops.proc.mem.heapTotal;
                stats.heap_used = ops.proc.mem.heapUsed;
                stats.uptime = ops.proc.uptime;
                stats.sample_count = stats.sample_count + 1;
            } else {
                stats.cpu = (stats.cpu + ops.os.load[2]) / 2;
                stats.mem_used = (stats.mem_used + ops.proc.mem.rss) / 2;
                stats.heap_used = (stats.heap_used + ops.proc.mem.heapUsed) / 2;
                stats.uptime = ops.proc.uptime;
                stats.sample_count = stats.sample_count + 1;
            }
        });
        lineReader.on('close', function() {
            counter++;
            if (counter === files.length) {
                fs.appendFile(path.resolve(__dirname) + '/../logs/stats/stats.log', JSON.stringify(stats) + '\n', function(err) {
                    console.log('Done');
                });
            }
        });
    });
});
