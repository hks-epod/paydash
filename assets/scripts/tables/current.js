'use strict';

var dynatable = require('../components/dynatable');
var $ = require('jquery');



function currentTableInit() {

    $('#my-final-table').dynatable({
        dataset: {
            ajax: true,
            ajaxUrl: '/musters/current/data',
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
