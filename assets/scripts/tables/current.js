'use strict';

var dynatable = require('../components/dynatable');
var $ = require('jquery');
var read_cookie = require('../components/read_cookie');



function currentTableInit() {

    $('#my-final-table').dynatable({
        dataset: {
            ajax: true,
            ajaxUrl: '/musters/current/data?selected_block_id=' + read_cookie('selected_block_id'),
            ajaxOnLoad: true,
            records: []
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
if (window.location.pathname === '/musters/current') {
    currentTableInit();
}

