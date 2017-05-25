'use strict';

module.exports = function(sequelize, DataTypes) {
    var Employees = sequelize.define(
        'Employees',
        {
            staff_id: DataTypes.INTEGER,
            name: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            mobile_no: {
                type: DataTypes.STRING,
                primaryKey: true
            }
        },
        {
            tableName: 'employees_unique',
            underscored: true,
            timestamps: false
        }
    );

    return Employees;
};
