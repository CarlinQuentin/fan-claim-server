module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        userName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        day: {
            type: DataTypes.ENUM('day', 'night'),
            defaultValue: 'day',
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return User
}