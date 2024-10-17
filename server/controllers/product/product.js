const { Product } = require("../../models");
const ApiFeatures = require("../../utils/apifeatures");

//create product -- Admin
const createProduct = async (req, res) => {
    try {
        req.body.user = req.user.id;
        let { name, description, price, ratings, image, category, stock, numOfReviews, reviews, user } = req.body;
        const newProduct = await Product.create({ name, description, price, ratings, image, category, stock, numOfReviews, reviews, user });
        if (newProduct) {
            res.status(201).json({ message: "Product added Successfully" })
        }
        else {
            res.status(500).json({ message: "Product not added" })
        }
    }
    catch (error) {
        console.log('Error in creating product:', error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

//getallproduct
const getAllProduct = async (req, res) => {
    try {
        const resultPerPage = 5;
        const productCount = await Product.count();
        const apiFeature = new ApiFeatures(Product.findAll(), req.query).search().filter().pagination(resultPerPage);
        const allproducts = await apiFeature.query;
        if (allproducts.length > 0) {
            res.status(200).json({ message: "All products", data: allproducts, productCount })
        }
        else {
            res.status(404).json({ message: "No product Found", data: [], productCount })
        }
    }
    catch (error) {
        console.log('Error in fetching product data:', error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

//update product -- Admin
const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, ratings, image, category, stock, numOfReviews, reviews } = req.body;
        let findProduct = await Product.findByPk(id);

        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        //Update products properties
        findProduct.name = name || findProduct.name;
        findProduct.description = description || findProduct.description;
        findProduct.price = price || findProduct.price
        findProduct.ratings = ratings || findProduct.ratings
        findProduct.image = image || findProduct.image
        findProduct.category = category || findProduct.category
        findProduct.stock = stock || findProduct.stock
        findProduct.numOfReviews = numOfReviews || findProduct.numOfReviews
        findProduct.reviews = reviews || findProduct.reviews

        //update product properties
        findProduct = await findProduct.save(); // Reassign findProduct

        res.status(200).json({ message: 'Product updated successfully', data: findProduct });
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//delete product -- Admin
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: `Product with ID ${id} not found` });
        }

        // Delete the user
        await product.destroy();

        res.status(200).json({ message: `Product with ID ${id} deleted successfully` });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//getproduct detail
const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        let productDetails = await Product.findByPk(id);
        if (!productDetails) {
            return res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: "Product:", data: productDetails });
        }
    }
    catch (error) {
        console.error('Error in fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//create review product
const createReviewProduct = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user.id,
            name: req.user.username,
            rating: Number(rating),
            comment: comment
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(400).json({ message: `No Product found with id ${productId}.` });
        }

        const existingReviewIndex = product.reviews.findIndex(rev => rev.user.toString() === req.user.id.toString());

        if (existingReviewIndex !== -1) {
            // If user has already reviewed, update the existing review
            product.reviews[existingReviewIndex].rating = rating;
            product.reviews[existingReviewIndex].comment = comment;
        } else {
            // Otherwise, add a new review
            product.reviews.push(review);
        }

        // Mark the 'reviews' field as modified
        product.changed('reviews', true);

        // Update number of reviews
        product.numOfReviews = product.reviews.length;

        // Update average rating
        const totalRating = product.reviews.reduce((acc, curr) => acc + Number(curr.rating), 0);
        product.ratings = totalRating / product.reviews.length;

        // Save the changes to the product instance
        await product.save();

        res.status(201).json({ success: true, message: "Product Review added Successfully" });
    } catch (error) {
        console.log('Error in Review product:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteReviewProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const reviewId = req.user.id;
        // Find the product by ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: `Product with id ${productId} not found.` });
        }

        // Find the index of the review to delete
        const reviewIndex = product.reviews.findIndex(review => review.user === parseInt(reviewId));

        if (reviewIndex === -1) {
            return res.status(404).json({ message: `Review with id ${reviewId} not found for product ${productId}.` });
        }

        // Remove the review from the product's reviews array
        product.reviews.splice(reviewIndex, 1);
        // product.reviews = product.reviews.filter((rev) => rev.user != parseInt(reviewId))

        // Mark the 'reviews' field as modified
        product.changed('reviews', true);

        // Update the number of reviews
        product.numOfReviews = product.reviews.length;

        // Calculate the new average rating
        const totalRating = product.reviews.reduce((acc, curr) => acc + Number(curr.rating), 0);
        product.ratings = totalRating / product.reviews.length || 0;

        // Save the changes to the product
        await product.save();

        res.status(200).json({ success: true, message: "Review deleted successfully." });
    } catch (error) {
        console.log('Error deleting review:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};







module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createReviewProduct,
    deleteReviewProduct
}