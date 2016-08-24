'use strict';

exports.list = function(performance, role) {
    var regions = [];
    if (role === 'block') {

        performance['panchayat'].forEach(function(block, index){
            regions.push({
                value: block.block_code,
                label: block.block_name,
                region_type: 'block',
                class: 'select_parent',
                index: index
            });     
            block.data.forEach(function(panchayat, index){
                regions.push({
                    value: panchayat.panchayat_code,
                    label: panchayat.panchayat_name,
                    region_type: 'panchayat',
                    class: 'select_child',
                    index: index
                });
            });
        });

    }
    return regions;
};
