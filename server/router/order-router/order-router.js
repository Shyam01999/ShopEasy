const express = require("express");
const { isAuthenticated, authorizeRole } = require("../../middleware/auth");
const orderRouter = express.Router();
const orderController = require("../../controllers/order/order");

orderRouter.route('/new').post(isAuthenticated, orderController.newOrder);
orderRouter.route('/single/:id').get(isAuthenticated, orderController.getSingleOrder);
orderRouter.route('/myorders').get(isAuthenticated, orderController.myOrderDetails);
orderRouter.route('/delete/:id').delete(isAuthenticated, orderController.deleteOrder);
orderRouter.route('/allorders').get(isAuthenticated, authorizeRole("admin"), orderController.getAllOrder);
orderRouter.route('/update/status/:id').patch(isAuthenticated, authorizeRole('admin'), orderController.updateOrderStatus);
// productRouter.route('/updateproduct/:id').put(isAuthenticated, authorizeRole("admin"), productController.updateProduct);
// productRouter.route('/deleteproduct/:id').delete(isAuthenticated, authorizeRole("admin"), productController.deleteProduct);
// productRouter.route('/allproducts').get(productController.getAllProduct);
// productRouter.route('/product/:id').get(productController.getProductDetails);
// productRouter.route('/review').put(isAuthenticated, productController.createReviewProduct);
// productRouter.route('/review/delete').delete(isAuthenticated, productController.deleteReviewProduct);


 
 
module.exports = orderRouter;