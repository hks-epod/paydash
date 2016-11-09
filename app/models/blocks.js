'use strict';

module.exports = function(sequelize, DataTypes) {
    var Blocks = sequelize.define('blocks', {
        state_code: DataTypes.STRING,
        state_name: DataTypes.STRING
        district_code: DataTypes.STRING,
        district_name: DataTypes.STRING
        block_code: DataTypes.STRING,
        block_name: DataTypes.STRING
    }, {
        timestamps: false,
        underscored: true,
    });
    return Blocks;
};
