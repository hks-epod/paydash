'use strict';
const D3 = require('d3');

exports.parser = function(rows) {
    
    var employeesResponse = D3.values(rows[0]);
    var configResponse = D3.values(rows[1]);
    
    var tableData = employeesResponse.map(function(d) {
        return {
            'staff_id': d.staff_id,
            'name': d.name,
            'mobile_no': d.mobile_no,
            'panchayat_code': d.panchayat_code,
            'panchayat_name': d.panchayat_name,
            'designation': d.designation
        };
    });

    var data = {
        level: configResponse[0].level,
        table: tableData,
        designations: [configResponse[0].designation]
    };

    return data;

};