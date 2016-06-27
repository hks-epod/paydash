'use strict';

var $ = require('jquery');
var dynatable = require('../vendor/dynatable');
var Cookie = require('../lib/cookie');
var Util = require('../lib/util');

exports.init = function() {
    $.ajax({
        url: '/musters/current/data?active_region=' + Cookie.read('active_region'),
        success: function(data) {
            $('#loader').hide();
            $('.table-holder').removeClass('u-hidden');

            Util.loadMappingMessage(data.mapping);

            $('#current-musters').dynatable({
                dataset: {
                    records: data.musters,
                    sorts: { msr_no: 1 }
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
