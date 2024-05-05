const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    // ssl:dbConfig.ssl, //for ssl true case uncomment
    // dialectOptions : dbConfig.dialectOptions, //for sslrequire true case uncomment
    

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)

// Define an async function to authenticate the database connection
// sequelize.authenticate()
// .then(()=>{
//     console.log('Sequelize Database connected successfully.');
// })
// .catch(()=>{
//     console.error('Unable to connect to the database:', error);
// })

// Call the async function to authenticate the database connection

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require("./authmodel.js")(sequelize, DataTypes);
db.Product = require("./productmodel.js")(sequelize, DataTypes);
db.Order = require('./ordermodel.js')(sequelize, DataTypes);

// Define associations if any
db.User.hasMany(db.Order);
db.Order.belongsTo(db.User);

// db.sequelize.sync({force: false})
// .then(()=>{
//     console.log('Database sync Successfully!')
// })

module.exports = db;



