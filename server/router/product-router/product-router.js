const express = require("express");
const productController = require("../../controllers/product/product");
const validate = require("../../middleware/validate-middleware");
const { productSchema } = require("../../validator/product-validator");
const { isAuthenticated, authorizeRole } = require("../../middleware/auth");
const productRouter = express.Router();

productRouter.route('/createproduct').post(validate(productSchema), isAuthenticated, authorizeRole("admin"), productController.createProduct);
productRouter.route('/updateproduct/:id').put(isAuthenticated, authorizeRole("admin"), productController.updateProduct);
productRouter.route('/deleteproduct/:id').delete(isAuthenticated, authorizeRole("admin"), productController.deleteProduct);
productRouter.route('/allproducts').get(productController.getAllProduct);
productRouter.route('/product/:id').get(productController.getProductDetails);
productRouter.route('/review').put(isAuthenticated, productController.createReviewProduct);
productRouter.route('/review/delete').delete(isAuthenticated, productController.deleteReviewProduct);


 
 
module.exports = productRouter;