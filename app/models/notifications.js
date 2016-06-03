'use strict';

module.exports = function(sequelize, DataTypes) {
    var notifications = sequelize.define('notifications', {
        msg: DataTypes.STRING,
        region_code: DataTypes.STRING,
        notification_type: DataTypes.INTEGER,
        viewed: DataTypes.BOOLEAN,
        batch_id: DataTypes.INTEGER,
        region_name: DataTypes.STRING,
        total_transactions: DataTypes.INTEGER,
        days_to_payment: DataTypes.INTEGER,
        batch_date: DataTypes.DATE
    }, {
        timestamps: true,
        underscored: true,
        classMethods: {
            
            associate: function(models) {
                // associations can be defined here
                notifications.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: 'user_id',
                });
            }
        }
    });
    return notifications;
};
