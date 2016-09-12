'use strict';

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('User', {

        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        title: DataTypes.STRING,
        work_email: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        lang: DataTypes.STRING,
        designation: DataTypes.STRING,
        phone_alternate : DataTypes.STRING,
        middlename : DataTypes.STRING,
        google_account: DataTypes.STRING,
        type :  DataTypes.STRING,
        colorblind: DataTypes.BOOLEAN,
        deactivated: DataTypes.BOOLEAN
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
                User.hasMany(models.user_regions);
            }
        }
    });

    return User;
};
