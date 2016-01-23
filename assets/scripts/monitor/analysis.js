'use strict';

var d3 = require('d3');
var chart = require('../charts/chart');

var analysisMonitor = {};


//  Prepare panchayat chart templates
function outcome_chartTemplate(data) {
    d3.select('.analysis_charts-container')
        .append('div')
        .classed(' pure-g', true)
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .classed(' pure-u pure-u-24-24', true)
        .html(function(d, index) {
            return '<h2>'+ d.label +'</h2>'+ 
                '<div class="chart-holder small_chart">' +
                '<div id="o_' + d.name + '"></div>' +
                '<div class="p_' + d.name + '_legend"></div>' +
                '</div>';
        });
}

function loadOutcomeCharts(data) {

    function mapDate(data, accessor) {

        data = data.map(function(d) {
            d[accessor] = new Date(d[accessor]);
            return d;
        });
        return data;
    }

    data.forEach(function(outcome) {
        outcome.treatment = mapDate(outcome.treatment, 'date');
        outcome.control = mapDate(outcome.control, 'date');
        chart.outcome_chart({
            data: [outcome.treatment, outcome.control],
            title: outcome.label,
            target: '#o_' + outcome.name,
            labels: ['Treatment', 'Control']
        });
    });
}



function analysisMonInit() {
    d3.json('/monitor/analysis/data')
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {

            analysisMonitor.data = data;
            outcome_chartTemplate(data);

            loadOutcomeCharts(data);


        });
}

if (window.location.pathname === '/monitor/analysis') {
    // Laod User monitoring dashboard
    analysisMonInit();
}
