module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        ratings: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        image: {
            type: DataTypes.JSON,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.STRING,
            allowNull: false
        },

        numOfReviews: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                max: 10000000
            }
        },

        // reviews: [
        //     {
        //         name: {
        //             type: DataTypes.STRING,
        //             allowNull: false
        //         },
        //         ratings: {
        //             type: DataTypes.INTEGER,
        //             allowNull: false
        //         },
        //         comment: {
        //             type: DataTypes.STRING,
        //             allowNull: false
        //         }
        //     }
        // ]

        reviews: {
            type: DataTypes.JSON,
            allowNull: false
        },

        user:{
            type:DataTypes.INTEGER,
            allowNull:false
        }


    })

    return Product
}