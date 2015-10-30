'use strict';

var dynatable = require('../components/dynatable');
var $ = require('jquery');

function dealyedTableInit() {

    $.ajax({
        url: '/musters/delayed/data',
        success: function(data) {

            $('#delayed-table-2').dynatable({
                dataset: {
                    records: data.ds_t2
                },
                table: {
                    defaultColumnIdStyle: 'underscore'
                },
                features: {
                    paginate: false,
                    recordCount: true
                }
            });

            $('#delayed-table-5').dynatable({
                dataset: {
                    records: data.ds_t5
                },
                table: {
                    defaultColumnIdStyle: 'underscore'
                },
                features: {
                    paginate: false,
                    recordCount: true
                }
            });

            $('#delayed-table-6').dynatable({
                dataset: {
                    records: data.ds_t6
                },
                table: {
                    defaultColumnIdStyle: 'underscore'
                },
                features: {
                    paginate: false,
                    recordCount: true
                }
            });

            $('#delayed-table-7').dynatable({
                dataset: {
                    records: data.ds_t7
                },
                table: {
                    defaultColumnIdStyle: 'underscore'
                },
                features: {
                    paginate: false,
                    recordCount: true
                }
            });

            $('#delayed-table-8').dynatable({
                dataset: {
                    records: data.ds_t8
                },
                table: {
                    defaultColumnIdStyle: 'underscore'
                },
                features: {
                    paginate: false,
                    recordCount: true
                }
            });

        }
    });

}

if (window.location.pathname === '/musters/delayed') {

    dealyedTableInit();
}
