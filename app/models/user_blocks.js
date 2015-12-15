'use strict';

module.exports = function(sequelize, DataTypes) {
    var user_blocks = sequelize.define('user_blocks', {
        block_code: DataTypes.STRING,
        block_name: DataTypes.STRING
    }, {
        timestamps: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                user_blocks.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: 'user_id'
                });
            }
        }
    });
    return user_blocks;
};
