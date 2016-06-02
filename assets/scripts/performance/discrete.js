'use strict';

var D3 = require('d3');
var $ = require('jquery');
var Cookie = require('../lib/cookie');
var Template = require('../lib/template');
var Parser = require('../lib/parser');
var Chart = require('../lib/chart');
var Util = require('../lib/util');

// Load JSON
exports.init = function() {
    var internals = {
        past_n_days: '',
        discrete_compare_lines: '',
        groupBy: 'TA',
        stepCols: [1, 2, 3, 4, 5, 6, 7]
    };
    D3.json('/performance/discrete/data?region_code=' + Cookie.read('active_region'))
        .on('progress', function() {
            console.info('progress', D3.event.loaded);
        })
        .get(function(error, data) {
            // Set Canvas 
            D3.select('#loader').remove();
            D3.select('#dashboard').classed('u-hidden', false);
            D3.select('#region-name').text(data.region_name);

            internals.data = data;
            internals.role = data.config.role;

            if (internals.role === 'district') {

                Template.groupedDistrict(internals.data.discrete, internals);
                districtChartBinding(internals);

            } else if (internals.role === 'block') {

                Util.loadMappingMessageGrouping(internals.data.mapping, internals.groupBy);

                D3.select('#panchayat_selectors').classed('u-hidden', false);

                //  Bind event for groupby
                D3.selectAll('#discrete-groupby-controls button').on('click', function() {
                    var target = D3.select(D3.event.target); // Define target
                    D3.selectAll('#discrete-groupby-controls button').classed('selected', false); // change button state
                    target.classed('selected', true);
                    internals.groupBy = target.attr('data-groupby');
                    
                    // Delete chart here
                    D3.select('#d_chart_placeholder').classed('u-hidden', false);
                    D3.select('.legend-discrete').html('');
                    D3.select('#d_chart').html('');
                    D3.select('#heading_region_name').html('');
                    D3.select('#d_chart_total').classed('u-hidden', true);
                    Util.loadMappingMessageGrouping(internals.data.mapping, internals.groupBy);

                    if (internals.groupBy === 'no') {
                        Template.ungrouped(internals.data.discrete);
                    } else {
                        Template.grouped(internals.data.employees[internals.groupBy], internals);
                    }      
                    blockChartBinding(internals);
                });

                Template.grouped(internals.data.employees[internals.groupBy], internals);
                blockChartBinding(internals);
            }

        });

    // Time period Selection
    D3.selectAll('#modify-time-period-controls').on('change', function() {
        internals.past_n_days = D3.event.target.value;

        drawDiscreteChart(internals, internals.active_chart_index);

        // Update employee stats based on time controls
        if (internals.role === 'block') {
            var p_past_n_days;
            if (internals.past_n_days === '') {
                p_past_n_days = 'all';
            } else {
                p_past_n_days = internals.past_n_days - 1;
            }
            internals.data.employees[internals.groupBy].forEach(function(d) {
                D3.select('#p_stat_step_avg' + d.mobile).text(d['step1_avg_' + p_past_n_days] || '');
                D3.select('#p_stat_tot_trans' + d.mobile).text(d['tot_trans_' + p_past_n_days] || '');
            });
        }
    });
};

function blockChartBinding(internals) {
    // Bind event for discrete chart
    D3.selectAll('.js-group-entity').on('click', function() {
        var target = D3.select(D3.event.target); // Define target
        D3.selectAll('.js-group-entity').classed('selected', false); // change button state
        target.classed('selected', true);
        internals.active_chart_index = Util.indexBykey(internals.data.discrete, 'region_code', target.attr('data-code'));
        drawDiscreteChart(internals, internals.active_chart_index);
        D3.select('#heading_region_name').html(target.attr('data-name'));

    });
}


function districtChartBinding(internals) {
    // Bind event for disctrict discrete chart
    D3.selectAll('.js-group-head').on('click', function() {
        var target = D3.select(D3.event.target); // Define target
        D3.selectAll('.js-group-head').classed('selected', false); // change button state
        target.classed('selected', true);
        internals.active_chart_index = Util.indexBykey(internals.data.discrete, 'block_code', target.attr('data-code'));
        drawDiscreteChart(internals, internals.active_chart_index);
        D3.select('#heading_region_name').html(target.attr('data-name'));
    });

    D3.selectAll('.js-group-entity').on('click', function() {

        var target = D3.select(D3.event.target); // Define target
        D3.selectAll('.js-group-entity').classed('selected', false); // change button state
        target.classed('selected', true);

        D3.json('/performance/panchayat/data?panchayat_code=' + target.attr('data-code'))
            .on('progress', function() {
                console.info('progress', D3.event.loaded);
            })
            .get(function(error, data) {

                // internals.active_chart_index = Util.indexBykey(internals.data.discrete, 'block_code', target.attr('data-code'));
                drawPanchayatChart(internals, data.panchayat);
                D3.select('#heading_region_name').html(target.attr('data-name'));
            });
    });
}


function drawPanchayatChart(internals, data) {
    var region = data;
    var d_step_lines = (internals.discrete_compare_lines !== '') ? [internals.discrete_compare_lines] : internals.stepCols;
    var isCumu = (internals.discrete_compare_lines === '') ? true : false;
    var d_data = Parser.lines({
        data: region.data,
        past_n_days: internals.past_n_days,
        col: d_step_lines,
        isCumulative: isCumu
    });
    D3.select('#d_chart_placeholder').classed('u-hidden', true);
    D3.select('#d_chart_total').classed('u-hidden', false);
    Chart.flash({
        data: d_data,
        title: region.panchayat_name,
        target: '#d_chart',
        legend_target: '.region_legend',
        area: true,
        labels: internals.data.config.labels,
        min_x: Util.overviewLimits(internals).min_x,
        y_axis_label: internals.data.config.y_axis_label
    });
}
function drawDiscreteChart(internals, p_index) {

    var region = internals.data.discrete[p_index];
    var d_step_lines = (internals.discrete_compare_lines !== '') ? [internals.discrete_compare_lines] : internals.stepCols;
    var isCumu = (internals.discrete_compare_lines === '') ? true : false; 
    D3.select('#d_chart_placeholder').classed('u-hidden', true);
    D3.select('#d_chart_total').classed('u-hidden', false);
    // Quickfix;
    if (!region){
        Chart.flash({
            data: [],
            target: '#d_chart',
            legend_target: '.region_legend',
            area: true,
            labels: internals.data.config.labels,
            min_x: Util.overviewLimits(internals).min_x,
            y_axis_label: internals.data.config.y_axis_label
        });
        return;
    }
    var d_data = Parser.lines({
        data: region.data,
        past_n_days: internals.past_n_days,
        col: d_step_lines,
        isCumulative: isCumu
    });
    Chart.flash({
        data: d_data,
        title: region.region_name,
        target: '#d_chart',
        legend_target: '.region_legend',
        area: true,
        labels: internals.data.config.labels,
        min_x: Util.overviewLimits(internals).min_x,
        y_axis_label: internals.data.config.y_axis_label
    });
}
