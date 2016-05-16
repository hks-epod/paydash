'use strict';

var D3 = require('d3');
var Chart = require('./chart');

exports.grouping = function(data, internals) {
    D3.select('#grouping_container').selectAll('div').remove();
    D3.select('#grouping_container')
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .classed('group', true)
        .html(function(d, index) {
            var p_past_n_days;
            if (internals.past_n_days === '') {
                p_past_n_days = 'all';
            } else {
                p_past_n_days = internals.past_n_days;
            }
            var htmlString =
                '<div class="head js-group-head">' +
                '<span class="u-pull-right">' + d.mobile + '</span>' +
                '<h4>' + d.name + '</h4>' +
                '<div>Avg. days from muster roll closure to entry : <span id="p_stat_step_avg' + d.mobile + '">' + d['step1_avg_' + p_past_n_days] + '</span></div>' +
                '<div>Total transactions : <span id="p_stat_tot_trans' + d.mobile + '"> ' + d['tot_trans_' + p_past_n_days] + '</span></div>' +
                '</div>' +
                '<div class="subgroup">';
            d.panchayats.forEach(function(region, index) {
                htmlString = htmlString +
                    '<div id="' + region.region_code + '" class="js-group-entity">' + region.region_name + '</div>';
            });
            htmlString = htmlString + '</div>';

            return htmlString;
        });
}


exports.discrete = function(data) {
    D3.select('#grouping_container').selectAll('div').remove();
    D3.select('#grouping_container')
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .classed('subgroup', true)
        .html(function(d, index) {
            return '<div id="' + d.region_code + '" class="js-group-entity">' + d.region_name + '</div>';
        });
};

exports.sortedDiscrete = function(data, internals) {
    D3.select('#region_charts-container').selectAll('div').remove();
    D3.select('#region_charts-container').selectAll('div')
        .data(data)
        .enter().append('div')
        .classed('heading', true)
        .html(function(d, index) {
            var p_past_n_days;
            if (internals.past_n_days === '') {
                p_past_n_days = 'all';
            } else {
                p_past_n_days = internals.past_n_days;
            }
            var htmlString =
                '<div class="employee-stats message">' +
                '<h1>' + d.name + '</h1>' +
                '<ul>' +
                '<li> Mobile: ' + d.mobile + '</li>' +
                '<li>Average days from muster roll closure to entry: <span id="p_stat_step_avg' + d.mobile + '">' + d['step1_avg_' + p_past_n_days] + '</span></li>' +
                '<li>Total transactions: <span id="p_stat_tot_trans' + d.mobile + '"> ' + d['tot_trans_' + p_past_n_days] + '</span></li>' +
                '</ul>' +
                '</div>' +
                '<div class="pure-g">';
            d.panchayats.forEach(function(region, index) {
                htmlString = htmlString +
                    '<div class="pure-u pure-u-24-24 pure-u-md-8-24">' +
                    '<div class="chart-holder small_chart">' +
                    '<div id="d_' + region.region_code + '"></div>' +
                    '<div class="d_' + region.region_code + '_legend"></div>' +
                    '</div>' +
                    '</div>';
            });
            htmlString = htmlString + '</div>';
            return htmlString;
        });

    D3.select('.region_charts_unmapped-container .heading').remove();
    D3.select('.region_charts_unmapped-container')
        .append('div')
        .classed('heading', true)
        .html(function(d, index) {
            var headingHtml = '<div class="u-block-divider"></div><h3>Unmapped Regions</h3>' +
                '<div class="pure-g">';
            var htmlString = '';
            internals.data.discrete.forEach(function(region, index) {
                if (!region['mapped_' + internals.groupBy.toLowerCase()]) {
                    htmlString = htmlString +
                        '<div class="pure-u pure-u-24-24 pure-u-md-8-24">' +
                        '<div class="chart-holder small_chart">' +
                        '<div id="p_' + region.region_code + '"></div>' +
                        '<div class="p_' + region.region_code + '_legend"></div>' +
                        '</div>' +
                        '</div>';
                }
            });
            if (htmlString === '') {
                return '';
            }
            return headingHtml + htmlString + '</div>';
        });
};
