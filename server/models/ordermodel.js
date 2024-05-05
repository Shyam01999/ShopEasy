module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        shippingInfo: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {}
        },
        orderItems: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER, // Adjusted the type to INTEGER
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        paymentInfo: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        paidAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        itemPrice: { // Adjusted field name to follow camelCase convention
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        taxPrice: { // Adjusted field name to follow camelCase convention
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        shippingPrice: { // Adjusted field name to follow camelCase convention
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        totalPrice: { // Adjusted field name to follow camelCase convention
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        orderStatus: { // Adjusted field name to follow camelCase convention
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Processing"
        },
        deliveredAt: { // Adjusted field name
            type: DataTypes.DATE
        },
    })
    return Order;
}
