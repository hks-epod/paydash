'use strict';

var $ = require('jquery');
var dynatable = require('../components/dynatable');
var read_cookie = require('../helpers/read_cookie');

function currentTableInit() {
    $.ajax({
        url: '/musters/delayed/data?selected_block_id=' + read_cookie('selected_block_id'),
        success: function(data) {
            $('#loading_message').hide();

            $('#my-final-table').dynatable({
                dataset: {
                    records: data
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
}

if (window.location.pathname === '/musters/current') {
    currentTableInit();
}
