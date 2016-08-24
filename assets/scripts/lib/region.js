'use strict';

exports.list = function(performance, role) {
    var regions = [];
    if (role === 'block') {

        performance['panchayat'].forEach(function(block, block_index){
            regions.push({
                value: block.block_code,
                label: block.block_name,
                region_type: 'block',
                class: 'select_parent',
                block_index: block_index
            });     
            block.data.forEach(function(panchayat, panchayat_index){
                regions.push({
                    value: panchayat.panchayat_code,
                    label: panchayat.panchayat_name,
                    region_type: 'panchayat',
                    class: 'select_child',
                    panchayat_index: panchayat_index,
                    block_index: block_index
                });
            });
        });

    }
    return regions;
};
