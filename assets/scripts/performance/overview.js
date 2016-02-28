'use strict';

var D3 = require('d3');
var Cookie = require('../lib/cookie');
var Parser = require('../lib/parser');
var Chart = require('../lib/chart');



function loadTemplate(internals) {
    if (internals.role === 'block') {
        internals.stepwise_compare_lines = ['block', 'state', 'district'];
    }
    var template = '';
    internals.stepwise_compare_lines.forEach(function(stepwise_compare_line, index) {
        template = template +
            '<div class="pure-u pure-u-24-24 pure-u-md-3-24">' +
            '<label for="option-' + index + 1 + '" class="pure-checkbox" style="text-transform: capitalize">' +
            stepwise_compare_line + ' mean  ' + ' <input class="regionSelector" id="option-' + index + 1 + '" type="checkbox" value="' + stepwise_compare_line + '" checked>' +
            '</label>' +
            '</div>';
    });
    return template;
}



function drawRegionComparison(val, internals) {
    var c_data = [];
    internals.stepwise_compare_lines.forEach(function(stepwise_compare_line, index) {
        var line_data = Parser.lines({
            data: internals.data[stepwise_compare_line].data,
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
        title: internals.labels[val - 1],
        target: '#region_comparison',
        legend_target: '.comparison_legend',
        labels: internals.labels,
        legend_labels: 'stepwise_compare_lines',
        area: false,
    }, internals);
}

function drawRegionPerformance(internals) {
    var b_data = Parser.lines({
        data: internals.data[internals.role].data,
        past_n_days: internals.past_n_days,
        col: internals.stepCols,
        isCumulative: true
    });
    Chart.flash({
        data: b_data,
        title: 'Region Performance',
        target: '#region_performance',
        legend_target: '.region_legend',
        labels: internals.labels,
        legend_labels: 'labels',
        area: true
    }, internals);
}

function bindEvents(internals) {
    // Time period Selection
    D3.selectAll('#modify-time-period-controls').on('change', function() {
        internals.past_n_days = D3.event.target.value;
        drawRegionPerformance(internals);
        drawRegionComparison(1, internals);
    });


    //Stepwise charts step selection
    D3.selectAll('.regionSelector').on('click', function() {
        internals.stepwise_compare_lines = [];
        D3.selectAll('.regionSelector').each(function() {
            if (this.checked === true) {
                internals.stepwise_compare_lines.push(this.value);
            }
        });
        drawRegionComparison(1, internals);
    });

    // Step Selection
    D3.selectAll('#modify-step-controls').on('change', function() {
        internals.stepwise_compare_step = D3.event.target.value;
        drawRegionComparison(internals.stepwise_compare_step, internals);
    });
}

// Load JSON
exports.init = function() {
    var internals = {
        past_n_days: '',
        stepwise_compare_step: 1,
        stepwise_compare_lines: ['state', 'district'],
        labels: [
            'Muster roll closure to muster roll entry',
            'Muster roll entry to wage list generation',
            'Wage list generation to wage list signing',
            'Wage list signing to FTO generation',
            'FTO generation to first signature',
            'First signature to second signature',
            'Second signature to processed by bank',
        ],
        stepCols: [1, 2, 3, 4, 5, 6, 7]
    };

    D3.json('/performance/overview/data?region_code=' + Cookie.read('active_region'))
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {
            // Set Canvas 
            D3.select('#loading').remove();
            D3.select('#dashboard').classed('u-hidden', false);
            D3.select('#region_name').text(data.region_name);
            internals.data = data;
            internals.role = data.config.role;
            D3.select('#compareRegion').html(loadTemplate(internals));
            drawRegionPerformance(internals);
            drawRegionComparison(1, internals);
            bindEvents(internals);
        });
};
