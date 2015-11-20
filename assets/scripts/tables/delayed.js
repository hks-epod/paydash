'use strict';

var dynatable = require('../components/dynatable');
var $ = require('jquery');
var read_cookie = require('../components/read_cookie');

var tim = [2, 5, 6, 7, 8];

function dealyedTableInit() {

    $.ajax({
        url: '/musters/delayed/data?selected_block_id=' + read_cookie('selected_block_id'),
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

}

if (window.location.pathname === '/musters/delayed') {
    console.log('executing');
    dealyedTableInit();
}
