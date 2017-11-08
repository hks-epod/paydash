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
    if (role === 'district') {
        performance['block'].forEach(function(district, district_index) {
            regions.push({
                value: district.district_code,
                label: district.district_name,
                region_type: 'district',
                class: 'select_parent',
                district_index: district_index
            });
            district.data.forEach(function(block, block_index) {
                regions.push({
                    value: block.block_code,
                    label: block.block_name,
                    region_type: 'block',
                    class: 'select_child',
                    block_index: block_index,
                    district_index: district_index
                });
            });
        });
    }
    return regions;
};

exports.find = function(role, activeRegion, performance, comparison_line) {
    var region;
    if (role === 'block') {
        if (activeRegion.region_type === 'block' && comparison_line === 'block') {
            return (region = performance[activeRegion.region_type][activeRegion.block_index]);
        } else if (activeRegion.region_type === 'panchayat' && comparison_line === 'panchayat') {
            return (region =
                performance[activeRegion.region_type][activeRegion.block_index].data[
                    activeRegion.panchayat_index
                ]);
        } else if (activeRegion.region_type === 'panchayat' && comparison_line === 'block') {
            return (region = performance[comparison_line][activeRegion.block_index]);
        } else {
            return (region = performance[comparison_line]);
        }
    } else if (role === 'district') {
        if (activeRegion.region_type === 'district' && comparison_line === 'district') {
            return (region = performance[activeRegion.region_type][activeRegion.district_index]);
        } else if (activeRegion.region_type === 'block' && comparison_line === 'block') {
            return (region =
                performance[activeRegion.region_type][activeRegion.block_index].data[
                    activeRegion.block_index
                ]);
        } else if (activeRegion.region_type === 'block' && comparison_line === 'district') {
            return (region = performance[comparison_line][activeRegion.block_index]);
        } else {
            return (region = performance[comparison_line]);
        }
    }
};

exports.overview_data = function(role, activeRegion, performance) {
    var data;
    if (role === 'block') {
        if (activeRegion && activeRegion.region_type === 'block') {
            data = performance[activeRegion.region_type][activeRegion.block_index].data;
        } else if (activeRegion && activeRegion.region_type === 'panchayat') {
            data =
                performance[activeRegion.region_type][activeRegion.block_index].data[
                    activeRegion.panchayat_index
                ].data;
        } else {
            return;
        }
    } else if (role === 'district') {
        if (activeRegion && activeRegion.region_type === 'district') {
            data = performance[activeRegion.region_type][activeRegion.district_index].data;
        } else if (activeRegion && activeRegion.region_type === 'block') {
            data =
                performance[activeRegion.region_type][activeRegion.district_index].data[
                    activeRegion.block_index
                ].data;
        } else {
            return;
        }
    }
    return data;
};
