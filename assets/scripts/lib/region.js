'use strict';

exports.list = function(performance, config) {
    var regions = [];
    if (config.role === 'block') {

        performance['panchayat'].forEach(function(block){
            regions.push({
                value: block.block_code,
                label: block.block_name,
                region_type: 'block',
                class: 'select_parent'
            });     
            block.data.forEach(function(panchayat){
                regions.push({
                    value: panchayat.panchayat_code,
                    label: panchayat.panchayat_name,
                    region_type: 'panchayat',
                    class: 'select_child'
                });
            });
        });

    }
    return regions;
};
