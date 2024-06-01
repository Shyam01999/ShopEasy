const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
//const pool = require('./db');
const db = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require('./router/auth-router/auth-router');
const contactRouter = require("./router/contact-router/contact-router");
const productRouter = require("./router/product-router/product-router");
const orderRouter = require("./router/order-router/order-router");
const errorMiddleware = require("./middleware/error-middleware");


app.use(express.json()); //middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

//rest api end point
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

app.use(errorMiddleware)

db.sequelize
  .sync({force: false})
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log("Database sync successfully");
    })
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });