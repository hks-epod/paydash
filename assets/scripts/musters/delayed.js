'use strict';

var $ = require('jquery');
var dynatable = require('../vendor/dynatable');
var Cookie = require('../lib/cookie');

var tim = [2, 5, 6, 7, 8];

exports.init = function() {

    $.ajax({
        url: '/musters/delayed/data?active_region=' + Cookie.read('active_region'),
        success: function(data) {
            $('#loading_message').hide();
            tim.forEach(function(val, index) {

                $('#delayed-table-' + val).dynatable({
                    dataset: {
                        records: data['ds_t' + val]
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

            });

        }
    });

};
