'use strict';

var D3 = require('d3');
var Cookie = require('../lib/cookie');
var Parser = require('../lib/parser');
var Chart = require('../lib/chart');

// Load JSON
exports.init = function() {
    var internals = {
        past_n_days: '',
        stepwise_compare_step: 1,
        stepCols: [1, 2, 3, 4, 5, 6, 7]
    };

    D3.json('/performance/overview/data?region_code=' + Cookie.read('active_region'))
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {

            // Set Canvas 
            D3.select('#loader').remove();
            D3.select('#dashboard').classed('u-hidden', false);

            D3.select('#region-name').text(data.region_name);
            internals.data = data;
            D3.select('#compareRegion').html(loadTemplate(internals));
            drawRegionPerformance(internals);
            drawRegionComparison(1, internals);
            bindEvents(internals);
        });
};

function drawRegionPerformance(internals) {
    var b_data = Parser.lines({
        data: internals.data.datewise[internals.data.config.role].data,
        past_n_days: internals.past_n_days,
        col: internals.stepCols,
        isCumulative: true
    });
    Chart.flash({
        data: b_data,
        title: 'Region Performance',
        target: '#region_performance',
        legend_target: '.region_legend',
        labels: internals.data.config.labels,
        area: true
    });
}

function loadTemplate(internals) {
    var template = '';
    internals.active_compare_lines = internals.data.config.comparison_lines;
    internals.data.config.comparison_lines.forEach(function(comparison_line, index) {
        template = template +
            '<div>' +
            '<label for="option-' + index + 1 + '" class="pure-checkbox" style="text-transform: capitalize">' +
            '<input class="regionSelector" id="option-' + index + 1 + '" type="checkbox" value="' + comparison_line + '" checked> ' +
            internals.data.monthwise[comparison_line][comparison_line + '_name'].toLowerCase() + ' ' + comparison_line + ' average  ' +
            '</label>' +
            '</div>';
    });
    return template;
}



function drawRegionComparison(val, internals) {
    var c_data = [];

    internals.active_compare_lines.forEach(function(comparison_line, index) {

        line_data = Parser.lines({
            data: internals.data.monthwise[comparison_line].data,
            past_n_days: internals.past_n_days,
            col: [val],
            isCumulative: false
        });

        if (line_data[0]) {
            c_data.push(line_data[0]); // Workaround to append region data
        }

    });
    Chart.singular({
        data: c_data,
        target: '#region_comparison',
        legend_target: '.comparison_legend',
        labels: internals.active_compare_lines,
        area: false,
    });
}

function bindEvents(internals) {
    // Time period Selection
    D3.selectAll('#modify-time-period-controls').on('change', function() {
        internals.past_n_days = D3.event.target.value;
        drawRegionPerformance(internals);
        drawRegionComparison(internals.stepwise_compare_step, internals);
    });


    //Stepwise charts step selection
    D3.selectAll('.regionSelector').on('click', function() {
        internals.active_compare_lines = [];
        D3.selectAll('.regionSelector').each(function() {
            if (this.checked === true) {
                internals.active_compare_lines.push(this.value);
            }
        });
        drawRegionComparison(internals.stepwise_compare_step, internals);
    });

    // Step Selection
    D3.selectAll('#modify-step-controls').on('change', function() {
        internals.stepwise_compare_step = D3.event.target.value;
        drawRegionComparison(internals.stepwise_compare_step, internals);
    });
}
