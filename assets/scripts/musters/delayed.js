'use strict';

var $ = require('jquery');
var dynatable = require('../vendor/dynatable');
var Cookie = require('../lib/cookie');
var Util = require('../lib/util');

var tim = [2, 5, 6, 7, 8];

exports.init = function() {

    $.ajax({
        url: '/musters/delayed/data?active_region=' + Cookie.read('active_region'),
        success: function(data) {

            $('#loader').hide();
            $('.table-holder').removeClass('u-hidden');


            Util.loadMappingMessage(data.mapping);

            tim.forEach(function(val, index) {

                $('#delayed-table-' + val).dynatable({
                    dataset: {
                        records: data.musters['ds_t' + val],
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

            });

        }
    });

};
