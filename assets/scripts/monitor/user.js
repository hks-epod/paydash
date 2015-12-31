'use strict';

var d3 = require('d3');
var chart = require('../charts/chart');
var parser = require('../parsers/ga_data_parser');

var userMonitor = {
    past_n_days: ''
};

function loadLineCharts() {
    var user_session_data = parser.lines(userMonitor.data.rows, userMonitor.past_n_days, [1], true);
    console.log(user_session_data);
    chart.ga_chart({
        data: user_session_data,
        title: 'User Sessions',
        target: '#user_session_chart',
        legend_target: '.block_legend',
        labels: ['User sessions'],
        legend_labels: 'labels',
        area: true
    });

    var session_duration_data = parser.lines(userMonitor.data.rows, userMonitor.past_n_days, [2], true);
    chart.ga_chart({
        data: session_duration_data,
        title: 'Session duration',
        target: '#session_duration_chart',
        legend_target: '.block_legend',
        labels: ['Session duration'],
        legend_labels: 'labels',
        area: true
    });

    var time_spent_data = parser.lines(userMonitor.data.rows, userMonitor.past_n_days, [3], true);
    chart.ga_chart({
        data: time_spent_data,
        title: 'Time Spent',
        target: '#time_spent_chart',
        legend_target: '.block_legend',
        labels: ['Time spent'],
        legend_labels: 'labels',
        area: true
    });

}

function userMonInit() {
    d3.json('/monitor/user/data')
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {
            userMonitor.data = data;
            loadLineCharts();
        });
}

if (window.location.pathname === '/monitor/user') {
    // Laod User monitoring dashboard
    userMonInit();
}
