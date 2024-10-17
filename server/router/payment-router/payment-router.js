const express = require("express");
const { paymentController, checkStatus } = require("../../controllers/payment/payment");
const paymentRouter = express.Router();

paymentRouter.route("/order").post(paymentController);
paymentRouter.route("/status/:id").post(checkStatus);

module.exports = paymentRouter;