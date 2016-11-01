'use strict';

module.exports = function(sequelize, DataTypes) {

    var EmployeesHistory = sequelize.define('EmployeesHistory', {

        action: DataTypes.STRING,
        edited_at: DataTypes.DATE,
        staff_id: DataTypes.STRING,
        name: DataTypes.STRING,
        designation: DataTypes.STRING,
        step: DataTypes.STRING,
        mobile_no: DataTypes.STRING,
        block_code: DataTypes.STRING,
        panchayat_code: DataTypes.STRING,
        edited_by: DataTypes.INTEGER

    }, {
        tableName: 'employees_master_history',
        underscored: true,
        timestamps: false
    });

    EmployeesHistory.removeAttribute('id');
    return EmployeesHistory;
};

