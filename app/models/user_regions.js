'use strict';

module.exports = function(sequelize, DataTypes) {
    var user_blocks = sequelize.define('user_regions', {
        region_code: DataTypes.STRING,
        region_name: DataTypes.STRING
    }, {
        timestamps: true,
        underscored: true,
        classMethods: {
            associate: function(models) {

                user_blocks.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: 'user_id'
                });
            }
        }
    });
    return user_blocks;
};
