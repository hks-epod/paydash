'use strict';

var D3 = require('d3');
var Chart = require('./chart');

exports.grouped = function(data, internals) {
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
                '<div>' + internals.data.config.sidebar.avg_days + ' : <span id="p_stat_step_avg' + d.mobile + '">' + d['step1_avg_' + p_past_n_days] + '</span></div>' +
                '<div>' + internals.data.config.sidebar.total_trans + ': <span id="p_stat_tot_trans' + d.mobile + '"> ' + d['tot_trans_' + p_past_n_days] + '</span></div>' +
                '</div>' +
                '<div class="subgroup">';
            d.panchayats.forEach(function(region, index) {
                htmlString = htmlString +
                    '<div data-name="' + region.region_name + '" data-code="' + region.region_code + '" class="js-group-entity">' + region.region_name + '</div>';
            });
            htmlString = htmlString + '</div>';

            return htmlString;
        });
}

exports.groupedDistrict = function(data, internals) {
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
                '<div class="head">' +
                '<h4 class="js-group-head" data-code="' + d.block_code + '" data-name="' + d.block_name + '" >' + d.block_name + '</h4>' +
                '</div>' +
                '<div class="subgroup">';
            d.panchayats.forEach(function(region, index) {
                htmlString = htmlString +
                    '<div data-name="' + region.panchayat_name + '" data-code="' + region.panchayat_code + '" class="js-group-entity">' + region.panchayat_name + '</div>';
            });
            htmlString = htmlString + '</div>';

            return htmlString;
        });

}


exports.ungrouped = function(data) {
    D3.select('#grouping_container').selectAll('div').remove();
    D3.select('#grouping_container')
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .classed('subgroup', true)
        .html(function(d, index) {
            return '<div data-code="' + d.region_code + '" class="js-group-entity">' + d.region_name + '</div>';
        });
};
