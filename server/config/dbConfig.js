require("dotenv").config();

module.exports = {
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
  port: process.env.DBPORT,
  dialect: process.env.DIALECT,
  logging: parseBoolean(process.env.LOGGING),
  ssl: parseBoolean(process.env.SSL),
  dialectOptions: {
    ssl: {
      require: parseBoolean(process.env.SSLREQUIRE),
      rejectUnauthorized: parseBoolean(process.env.SSLREJECTUNAUTHORIZED),
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

function parseBoolean(value) {
  return value === "true"; // Convert string 'true' to boolean true, everything else to false
}
