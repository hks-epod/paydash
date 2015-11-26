'use strict';

module.exports = function(sequelize, DataTypes) {
    var user_blocks = sequelize.define('user_blocks', {
        block_code: DataTypes.STRING,
        block_name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                user_blocks.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: 'UserId'
                });
            }
        }
    });
    return user_blocks;
};
