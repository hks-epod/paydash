'use strict';

var d3 = require('d3');
var chart = require('../charts/chart');
var stat_parser = require('../parsers/server_stats_parser');
var load_parser = require('../parsers/ga_page_load_parser');

var serverMonitor = {};

function loadLineCharts() {
    var cpu_usage_data = stat_parser.lines(serverMonitor.data, 'cpu');
    chart.ga_chart({
        data: cpu_usage_data,
        title: 'CPU Usages',
        target: '#cpu_usage_chart',
        legend_target: '.block_legend',
        labels: ['CPU  usage'],
        legend_labels: 'labels',
        area: true
    });

    var mem_usage_data = stat_parser.lines(serverMonitor.data, 'mem_used');
    chart.ga_chart({
        data: mem_usage_data,
        title: 'Memory Usages',
        target: '#mem_usage_chart',
        legend_target: '.block_legend',
        labels: ['Memory  usage'],
        legend_labels: 'labels',
        area: true
    });

    var heap_usage_data = stat_parser.lines(serverMonitor.data, 'heap_used');
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
            loadLineCharts();
        });
    d3.json('/monitor/server/pageloaddata')
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {
            var page_timing_data = load_parser.lines(data.rows);
            var labels = [];
            var page_timing_lines = [];
            for (var page in page_timing_data) {
                labels.push(page);
                page_timing_lines.push(page_timing_data[page]);
            }
            chart.ga_chart({
                data: page_timing_lines,
                title: 'Page Timings',
                target: '#page_load_chart',
                legend_target: '.block_legend',
                labels: labels,
                legend_labels: 'labels',
                area: true
            });


        });
}

if (window.location.pathname === '/monitor/server') {
    // Laod User monitoring dashboard
    serverMonInit();
}
