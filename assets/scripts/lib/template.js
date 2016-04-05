'use strict';

var D3 = require('d3');
var Chart = require('./chart');

exports.discrete = function(data) {
    D3.select('#region_charts-container').selectAll('div').remove();
    D3.select('#region_charts-container')
        .append('div')
        .classed(' pure-g', true)
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .classed(' pure-u pure-u-8-24', true)
        .html(function(d, index) {
            return '<div class="chart-holder small_chart">' +
                '<div id="d_' + d.region_code + '"></div>' +
                '<div class="d_' + d.region_code + '_legend"></div>' +
                '</div>';
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
            var htmlString = '<div class="u-region-divider"></div><h3>' + d.name + '</h3>' +
                '<div class="employee-stats">' +
                '<ul>' +
                '<li> Mobile no : ' + d.mobile + '</li>' +
                '<li>Step 1 average : <span id="p_stat_step_avg' + d.mobile + '">' + d['step1_avg_' + p_past_n_days] + '</span></li>' +
                '<li>Step 1 total transactions : <span id="p_stat_tot_trans' + d.mobile + '"> ' + d['tot_trans_' + p_past_n_days] + '</span></li>' +
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

exports.discreteGroupBy = function() {
    var string = '<div class="panchayat-sort">' +
        '<div id="discrete-groupby-controls" class="paydash-controls">' +
        '<button class="button" data-groupby="no">No Grouping</button>' +
        '<button class="button selected" data-groupby="TA">Group by TA</button>' +
        '<button class="button" data-groupby="GRS">Group by Gram Rozgar Sahayak</button>' +
        '</div>' +
        '</div>';
    D3.select('#panchayat_selectors').html(string);
};
