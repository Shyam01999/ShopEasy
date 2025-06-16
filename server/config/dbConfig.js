require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "Shopeasy_DB",
  port: process.env.DB_PORT || "5432",
  dialect: process.env.DB_DIALECT || "postgresql",
  logging: parseBoolean(process.env.DB_LOGGING || false),
  // ssl: parseBoolean(process.env.SSL),
  // dialectOptions: {
  //   ssl: {
  //     require: parseBoolean(process.env.SSLREQUIRE),
  //     rejectUnauthorized: parseBoolean(process.env.SSLREJECTUNAUTHORIZED),
  //   },
  // },
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
