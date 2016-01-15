'use strict';

var d3 = require('d3');
var chart = require('../charts/chart');
var parser = require('../parsers/server_stats_parser');

var serverMonitor = {};

function loadLineCharts() {
    var cpu_usage_data = parser.lines(serverMonitor.data, 'cpu');
    chart.ga_chart({
        data: cpu_usage_data,
        title: 'CPU Usages',
        target: '#cpu_usage_chart',
        legend_target: '.block_legend',
        labels: ['CPU  usage'],
        legend_labels: 'labels',
        area: true
    });

    var mem_usage_data = parser.lines(serverMonitor.data, 'mem_used');
    chart.ga_chart({
        data: mem_usage_data,
        title: 'Memory Usages',
        target: '#mem_usage_chart',
        legend_target: '.block_legend',
        labels: ['Memory  usage'],
        legend_labels: 'labels',
        area: true
    });

    var heap_usage_data = parser.lines(serverMonitor.data, 'heap_used');
    chart.ga_chart({
        data: heap_usage_data,
        title: 'Heap Usages',
        target: '#heap_usage_chart',
        legend_target: '.block_legend',
        labels: ['Heap  usage'],
        legend_labels: 'labels',
        area: true
    });

}


function serverMonInit() {
    d3.json('/monitor/server/data')
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {
            serverMonitor.data = data;
            console.log('sdsdsdsd');
            loadLineCharts();
        });
}

if (window.location.pathname === '/monitor/server') {
    // Laod User monitoring dashboard
    serverMonInit();
}
