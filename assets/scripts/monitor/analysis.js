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
            return '<h2>' + d.label + '</h2>' +
                '<div class="chart-holder small_chart">' +
                '<div id="o_' + d.name + '"></div>' +
                '<div class="p_' + d.name + '_legend"></div>' +
                '</div>';
        });
}

function mapDate(data, accessor) {
    data = data.map(function(d) {
        d[accessor] = new Date(d[accessor]);
        return d;
    });
    return data;
}

function loadOutcomeCharts(data, type) {

    if (type === 'treatment') {
        data.forEach(function(outcome) {

            chart.outcome_chart({
                data: [outcome.treatment, outcome.control],
                title: outcome.label,
                target: '#o_' + outcome.name,
                labels: ['Treatment', 'Control']
            });
        });
    }
    if (type === 'arms') {
        data.forEach(function(outcome) {

            chart.outcome_chart({
                data: [outcome.arm_1, outcome.arm_2, outcome.arm_3],
                title: outcome.label,
                target: '#o_' + outcome.name,
                labels: ['Arm 1', 'Arm 2', 'Arm 3']
            });
        });
    }


}



function analysisMonInit() {
    d3.json('/monitor/analysis/data')
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {
            data.forEach(function(outcome){
                outcome.treatment = mapDate(outcome.treatment, 'date');
                outcome.control = mapDate(outcome.control, 'date');
                outcome.arm_1 = mapDate(outcome.arm_1, 'date');
                outcome.arm_2 = mapDate(outcome.arm_2, 'date');
                outcome.arm_3 = mapDate(outcome.arm_3, 'date');
            });

            analysisMonitor.data = data;
            outcome_chartTemplate(data);
            loadOutcomeCharts(data, 'treatment');
        });
}

if (window.location.pathname === '/monitor/analysis') {
    // Laod User monitoring dashboard
    analysisMonInit();
}

// Time period Selection
d3.selectAll('#modify-outcome-controls').on('change', function() {
    var type = d3.event.target.value;
    loadOutcomeCharts(analysisMonitor.data, type);

});
