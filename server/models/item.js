module.exports = function (sequelize, DataTypes) {
    const item = sequelize.define('Item', {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        details: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        creator: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return item
}