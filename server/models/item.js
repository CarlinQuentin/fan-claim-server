module.exports = function (sequelize, DataTypes) {
    const item = sequelize.define('setting', {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        details: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })
    return item
}