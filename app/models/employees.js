'use strict';

module.exports = function(sequelize, DataTypes) {

    var Employees = sequelize.define('Employees', {

        staff_id: DataTypes.STRING,
        name: DataTypes.STRING,
        designation: DataTypes.STRING,
        step: {
            type: DataTypes.STRING,
            unique: 'compositeIndex'
        },
        mobile_no: DataTypes.STRING,
        block_code: {
            type: DataTypes.STRING,
            unique: 'compositeIndex'
        },
        panchayat_code: {
            type: DataTypes.STRING,
            unique: 'compositeIndex'
        },
        edited_by: DataTypes.INTEGER

    }, {
        tableName: 'employees_master',
        underscored: true,
        timestamps: false
    });

    return Employees;
};
