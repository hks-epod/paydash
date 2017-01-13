'use strict';

module.exports = function(sequelize, DataTypes) {

    var Employee_regions = sequelize.define('Employee_regions', {

        staff_id: DataTypes.STRING,
        designation: DataTypes.STRING,
        step: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        block_code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        panchayat_code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        edited_by: DataTypes.INTEGER,
        to_delete: DataTypes.INTEGER

    }, {
        tableName: 'employee_regions',
        underscored: true,
        timestamps: false
    });

    return Employees;
};
