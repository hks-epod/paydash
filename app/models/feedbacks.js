'use strict';

module.exports = function(sequelize, DataTypes) {
    var feedbacks = sequelize.define('feedbacks', {
        msg: DataTypes.STRING,
        region_code: DataTypes.STRING
    }, {
        timestamps: true,
        underscored: true,
        classMethods: {
            
            associate: function(models) {
                // associations can be defined here
                feedbacks.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: 'user_id',

                });
            }
        }
    });
    return feedbacks;
};
