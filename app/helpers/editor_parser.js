'use strict';

const Utils = require('./utils');
const D3 = require('d3');

exports.parser = function(rows) {
    var employeesResponse = D3.values(rows[0]);
    var configResponse = D3.values(rows[1]);
    var level = configResponse[0].level;

    var tableData;

    if (level === 'block') {
        tableData = employeesResponse.map(function(d) {
            return {
                staff_id: d.staff_id,
                name: Utils.toProperCase(d.name),
                mobile_no: d.mobile_no,
                designation: d.designation
            };
        });
    } else if (level === 'panchayat') {
        tableData = employeesResponse
            .map(function(d) {
                return {
                    staff_id: d.staff_id,
                    name: Utils.toProperCase(d.name),
                    mobile_no: d.mobile_no,
                    panchayat_code: d.panchayat_code,
                    panchayat_name: d.panchayat_name.toUpperCase(),
                    designation: d.designation
                };
            })
            .sort(function(a, b) {
                if (a.panchayat_name.toLowerCase() < b.panchayat_name.toLowerCase()) return -1;
                else if (a.panchayat_name.toLowerCase() > b.panchayat_name.toLowerCase()) return 1;
                else return 0;
            });
    }

    var designations = Utils.getDesignationArray(
        configResponse[0].designation,
        configResponse[0].alternative_designation
    );

    var data = {
        level: level,
        table: tableData,
        designations: designations
    };

    return data;
};
