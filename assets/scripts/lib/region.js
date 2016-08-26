'use strict';

exports.list = function(performance, role) {
    var regions = [];
    if (role === 'block') {

        performance['panchayat'].forEach(function(block, block_index) {
            regions.push({
                value: block.block_code,
                label: block.block_name,
                region_type: 'block',
                class: 'select_parent',
                block_index: block_index
            });
            block.data.forEach(function(panchayat, panchayat_index) {
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

exports.find = function(activeRegion, performance, comparison_line) {
    var region;
    if (activeRegion.region_type === 'block' && comparison_line === 'block') {
        return region = performance[activeRegion.region_type][activeRegion.block_index];
    } else if (activeRegion.region_type === 'panchayat' && comparison_line === 'panchayat') {
        return region = performance[activeRegion.region_type][activeRegion.block_index].data[activeRegion.panchayat_index];
    } else {
        return region = performance[comparison_line];
    }
};
