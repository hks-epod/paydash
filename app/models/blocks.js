'use strict';

module.exports = function(sequelize, DataTypes) {
    var Blocks = sequelize.define('Blocks', {
        state_code: DataTypes.STRING,
        state_name: DataTypes.STRING,
        district_code: DataTypes.STRING,
        district_name: DataTypes.STRING,
        block_code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        block_name: DataTypes.STRING
    }, {
        tableName: 'blocks',
        timestamps: false,
        underscored: true,
    });
    return Blocks;
};
