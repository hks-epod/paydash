'use strict';

exports.regions = function(performance, config) {
    var regions = {};
    if (config.role === 'block') {
        performance['block'].forEach(function(val) {
            regions[val.block_code] = {
                value: val.block_code,
                label: val.block_name
            };
        });
        performance['panchayat'].forEach(function(val){
            
        });

    }
};
