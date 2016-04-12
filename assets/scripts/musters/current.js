'use strict';

var $ = require('jquery');
var dynatable = require('../vendor/dynatable');
var Cookie = require('../lib/cookie');

exports.init = function() {
    $.ajax({
        url: '/musters/current/data?active_region=' + Cookie.read('active_region'),
        success: function(data) {
            $('#loader').hide();
            $('.table-holder').removeClass('u-hidden');

            $('#current-musters').dynatable({
                dataset: {
                    records: data.musters
                },
                table: {
                    defaultColumnIdStyle: 'underscore'
                },
                features: {
                    paginate: false,
                    recordCount: true,
                    search: false,
                }
            });
        }
    });
};
