const express = require("express");
const { paymentController } = require("../../controllers/payment/payment");
const paymentRouter = express.Router();

paymentRouter.route("/order").post(paymentController);

module.exports = paymentRouter;