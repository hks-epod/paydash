'use strict';

module.exports = function(sequelize, DataTypes) {
    var notifications = sequelize.define('notifications', {
        msg: DataTypes.STRING,
        block_code: DataTypes.STRING,
        notification_type: DataTypes.INTEGER,
        viewed: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                notifications.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: 'UserId'
                });
            }
        }
    });
    return notifications;
};
