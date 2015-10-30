'use strict';

var dynatable = require('../components/dynatable');
var $ = require('jquery');

var tim = [2, 5, 6, 7, 8];

function dealyedTableInit() {

    $.ajax({
        url: '/musters/delayed/data',
        success: function(data) {

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

}

if (window.location.pathname === '/musters/delayed') {

    dealyedTableInit();
}
