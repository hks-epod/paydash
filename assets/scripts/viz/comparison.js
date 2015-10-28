'use strict';

var d3 = require('d3');
var chart = require('./chart');
var parser = require('./parser');

// Global state
var panchayatDash = {
    past_n_days: '',
    panchyat_compare_lines: '',
    panchayatGroupBy: 'Sub-Engineer',
    labels: [
        'Muster roll closure to muster roll entry',
        'Muster roll entry to wage list generation',
        'Wage list generation to wage list sign',
        'Wage list sign to FTO generation',
        'FTO generation to first signature',
        'First signature to second signature',
        'Second signature to processed by bank',
    ],
    stepCols: [1, 2, 3, 4, 5, 6, 7]
};

//  Prepare panchayat chart templates
function chartTemplate(data) {
    d3.select('.panchayat_charts-container').selectAll('div')
        .data(data)
        .enter().append('div')
        .classed('pure-u-6-24', true)
        .html(function(d, index) {
            return '<div class="chart-holder small_chart">' +
                '<div id="p_' + d.panchayat_code + '"></div>' +
                '<div class="p_' + d.panchayat_code + '_legend"></div>' +
                '</div>';
        });
}

// Panchayat sorting template
function panchayatSortingTemplate(data) {
    d3.select('.panchayat_charts-container').selectAll('div').remove();

    if (panchayatDash.panchayatGroupBy === 'no') {
        chartTemplate(panchayatDash.data.panchayats);
    } else {
        d3.select('.panchayat_charts-container').selectAll('div')
            .data(data)
            .enter().append('div')
            .classed('heading', true)
            .html(function(d, index) {
                var htmlString = '<h3>' + d.name + '</h3>' +
                    '<div class="pure-g">';

                d.panchayats.forEach(function(panchayat, index) {
                    htmlString = htmlString +
                        '<div class="pure-u-24-24 pure-u-md-8-24">' +
                        '<div class="chart-holder small_chart">' +
                        '<div id="p_' + panchayat.panchayat_code + '"></div>' +
                        '<div class="p_' + panchayat.panchayat_code + '_legend"></div>' +
                        '</div>' +
                        '</div>';
                });
                htmlString = htmlString + '</div>';
                return htmlString;
            });
    }
}




//  Parse the "20140412" string to date object
function parseDate(string) {
    var y = string.substring(0, 4);
    var m = string.substring(4, 6);
    var d = string.substring(6, 8);
    return new Date(y, m, d);
}


function getMaxofPanchayats() {
    if (panchayatDash.past_n_days !== '') {
        var past_n_date = new Date();
        past_n_date.setDate(past_n_date.getDate() - panchayatDash.past_n_days);
    }
    var max = 10;
    panchayatDash.data.panchayats.forEach(function(panchayat, index) {
        panchayat.data.forEach(function(arr) {
            panchayatDash.stepCols.forEach(function(val) {
                if (!past_n_date || parseDate(arr[0]) >= past_n_date) {
                    if (arr[val] > max) {
                        max = arr[val];
                    }
                }
            });
        });
    });
    return max;
}

//  Specific Charts
function drawPanchayatPerformance() {
    var max_y = getMaxofPanchayats();
    panchayatDash.data.panchayats.forEach(function(panchayat, p_index) {
        var p_step_lines = (panchayatDash.panchyat_compare_lines !== '') ? [panchayatDash.panchyat_compare_lines] : panchayatDash.stepCols;
        var isCumu = (panchayatDash.panchyat_compare_lines === '') ? true : false;
        var p_data = parser.lines(panchayat.data, panchayatDash.past_n_days, p_step_lines, isCumu);
        chart.small({
            data: p_data,
            title: panchayat.panchayat_name,
            target: '#p_' + panchayat.panchayat_code,
            legend_target: '.p_' + panchayat.panchayat_code + '_legend',
            labels: panchayatDash.labels,
            max_y: max_y,
        }, panchayatDash);
    });
}

// Load JSON
function panchayatInit() {
    d3.json('/dashboard/panchayat/data')
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {
            panchayatDash.data = data;
            panchayatSortingTemplate(panchayatDash.data.employees[panchayatDash.panchayatGroupBy]);
            drawPanchayatPerformance();
        });
}
if (window.location.pathname === '/dashboard/panchayat') {
    panchayatInit();
}


// Time period Selection
d3.selectAll('#p_modify-time-period-controls').on('change', function() {
    panchayatDash.past_n_days = d3.event.target.value;
    drawPanchayatPerformance();
});
