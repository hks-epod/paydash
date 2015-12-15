'use strict';

var d3 = require('d3');
var chart = require('./chart');
var parser = require('./parser');
var $ = require('jquery');
var read_cookie = require('../components/read_cookie');

// Global state
var panchayatDash = {
    past_n_days: '',
    panchyat_compare_lines: '',
    panchayatGroupBy: 'TA',
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
    d3.select('.panchayat_charts-container')
        .append('div')
        .classed(' pure-g', true)
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .classed(' pure-u pure-u-8-24', true)
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
                var p_past_n_days;
                if (panchayatDash.past_n_days === '') {
                    p_past_n_days = 'all';
                } else {
                    p_past_n_days = panchayatDash.past_n_days;
                }
                var htmlString = '<div class="u-block-divider"></div><h3>' + d.name + '</h3>' +
                    '<div class="employee-stats">' +
                    '<ul>' +
                    '<li> Mobile no.' + d.mobile + '</li>' +
                    '<li>Step 1 average: <span id="p_stat_step_avg' + d.mobile + '">' + d['step1_avg_' + p_past_n_days] + '</span></li>' +
                    '<li>Step 1 total transactions: <span id="p_stat_tot_trans' + d.mobile + '"> ' + d['tot_trans_' + p_past_n_days] + '</span></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="pure-g">';
                d.panchayats.forEach(function(panchayat, index) {
                    htmlString = htmlString +
                        '<div class="pure-u pure-u-24-24 pure-u-md-8-24">' +
                        '<div class="chart-holder small_chart">' +
                        '<div id="p_' + panchayat.panchayat_code + '"></div>' +
                        '<div class="p_' + panchayat.panchayat_code + '_legend"></div>' +
                        '</div>' +
                        '</div>';
                });
                htmlString = htmlString + '</div>';
                return htmlString;
            });

        d3.select('.panchayat_charts_unmapped-container')
            .append('div')
            .classed('heading', true)
            .html(function(d, index) {
                var htmlString = '<div class="u-block-divider"></div><h3>Unmapped Panchayats</h3>' +
                    '<div class="pure-g">';

                panchayatDash.data.panchayats.forEach(function(panchayat, index) {
                    if (!panchayat['mapped' + panchayatDash.panchayatGroupBy.toLowerCase()]) {

                        htmlString = htmlString +
                            '<div class="pure-u pure-u-24-24 pure-u-md-8-24">' +
                            '<div class="chart-holder small_chart">' +
                            '<div id="p_' + panchayat.panchayat_code + '"></div>' +
                            '<div class="p_' + panchayat.panchayat_code + '_legend"></div>' +
                            '</div>' +
                            '</div>';
                    }

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
    var limit = {
        max_y: 10,
        max_x: new Date(),
        min_x: new Date()
    };
    panchayatDash.data.panchayats.forEach(function(panchayat, index) {
        panchayat.data.forEach(function(arr) {
            panchayatDash.stepCols.forEach(function(val) {
                if (!past_n_date || parseDate(arr[0]) >= past_n_date) {
                    if (parseDate(arr[0]) > limit.max_x) {
                        limit.max_x = parseDate(arr[0]);
                    }
                    if (parseDate(arr[0]) < limit.max_x) {
                        limit.min_x = parseDate(arr[0]);
                    }
                    //  calculate max y 
                    if (arr[val] > limit.max_y) {
                        limit.max_y = arr[val];
                    }
                }
            });
        });
    });
    return limit;
}

//  Specific Charts
function drawPanchayatPerformance() {
    var limit = getMaxofPanchayats();
    panchayatDash.data.panchayats.forEach(function(panchayat, p_index) {
        if ($('#p_' + panchayat.panchayat_code).length !== 0) {
            var p_step_lines = (panchayatDash.panchyat_compare_lines !== '') ? [panchayatDash.panchyat_compare_lines] : panchayatDash.stepCols;
            var isCumu = (panchayatDash.panchyat_compare_lines === '') ? true : false;
            var p_data = parser.lines(panchayat.data, panchayatDash.past_n_days, p_step_lines, isCumu);
            chart.small({
                data: p_data,
                title: panchayat.panchayat_name,
                target: '#p_' + panchayat.panchayat_code,
                // legend_target: '.p_' + panchayat.panchayat_code + '_legend',
                legend_target: '.panchayat_legend',
                labels: panchayatDash.labels,
                max_y: limit.max_y,
                min_x: limit.min_x,
                max_x: limit.max_x,
            }, panchayatDash);
        }
    });
}

// Load JSON
function panchayatInit() {
    d3.json('/dashboard/panchayat/data?selected_block_id=' + read_cookie('selected_block_id'))
        .on('progress', function() {
            console.info('progress', d3.event.loaded);
        })
        .get(function(error, data) {
            panchayatDash.data = data;
            d3.select('#block_name').text(panchayatDash.data.block_name);
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

    // Update employee stats based on time controls
    var p_past_n_days;
    if (panchayatDash.past_n_days === '') {
        p_past_n_days = 'all';
    } else {
        p_past_n_days = panchayatDash.past_n_days -1;
    }
    panchayatDash.data.employees[panchayatDash.panchayatGroupBy].forEach(function(d) {
        d3.select('#p_stat_step_avg' + d.mobile).text(d['step1_avg_' + p_past_n_days] || '');
        d3.select('#p_stat_tot_trans' + d.mobile).text(d['tot_trans_' + p_past_n_days] || '');
    });

});

// Panchayat group by control
d3.selectAll('#panchayat-groupby-controls button').on('click', function() {
    var target = d3.select(d3.event.target); // Define target
    d3.selectAll('#panchayat-groupby-controls button').classed('selected', false); // change button state
    target.classed('selected', true);
    panchayatDash.panchayatGroupBy = target.attr('data-groupby');
    panchayatSortingTemplate(panchayatDash.data.employees[panchayatDash.panchayatGroupBy]);
    drawPanchayatPerformance();
});
