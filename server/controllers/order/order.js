const {Order, Product} = require("../../models");

//new order
const newOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user.id,
        })

        if (order) {
            res.status(201).json({ message: "Order Created Successfully", order })
        }
        else {
            res.status(500).json({ message: "Order not created" })
        }
    }
    catch (error) {
        console.log('Error in creating new order:', error);
        res.status(500).json({ error: "Internal Server Error" })

    }
}

//single order
const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: `Order not found with id ${id}.` })
        }

        res.status(200).json({ success: true, order });
    }
    catch (error) {
        console.log('Error in fetching order details:', error);
        res.status(500).json({ error: "Internal Server Error" })

    }
}

//multiple order
const myOrderDetails = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { user: req.user.id } });


        if (!orders) {
            return res.status(404).json({ message: `Order not found with this user.` })
        }

        res.status(200).json({ success: true, orders });

    }
    catch (error) {
        console.log('Error in fetching order details:', error);
        res.status(500).json({ error: "Internal server Error" })
    }
}

//get all order --admin
const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll();
        if (!orders) {
            return res.status(404).json({ message: `No order has been placed` })
        }

        const totalAmount = orders.reduce((totalprice, curr) => {
            return totalprice = totalprice + curr.totalPrice;
        }, 0);

        res.status(200).json({ success: true, orders, totalAmount });
    }
    catch (error) {
        console.log('Error in fetching order details:', error);
        res.status(500).json({ error: "Internal Server Error" })

    }
}

//update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        let isOutOfStock = false;

        if (!order) {
            return res.status(404).json({ message: `No order found with this id ${id}` })
        }
        else if (order.orderStatus == "Delivered") {
            
            return res.status(403).json({ message: "You have has already delivered this order" })
        }
        else {
            if(order.orderStatus == "Processing")
            for (const item of order.orderItems) {
                const product = await Product.findByPk(item.productid);
                if (!product || product.stock <= 0) {
                    isOutOfStock = true;
                    return res.status(403).json({ message: `Product ${item.name} is out of stock` });
                }
                await updateStock(item.productid, item.quantity);
            }

            if (!isOutOfStock) {
                order.orderStatus = req.body.status;

                if (req.body.status === "Delivered") {
                    order.deliveredAt = Date.now();
                }

                await order.save();
                return res.status(200).json({ success: true, message: `Order has been ${order.orderStatus} successfully` });
            }

        }


    }
    catch (error) {
        console.log('Error in updaating order details:', error);
        res.status(500).json({ error: "Internal Server Error" })

    }
}


const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ where: { id: req.params.id } });


        if (!order) {
            return res.status(404).json({ message: `Order not found with this id ${req.params.id}.` })
        }

        // Delete the order
        await order.destroy();

        res.status(200).json({ message: `Order with ID ${req.params.id} deleted successfully` });

    }
    catch (error) {
        console.log('Error in fetching order details:', error);
        res.status(500).json({ error: "Internal server Error" })
    }
}

async function updateStock(id, quantity) {
    const product = await Product.findByPk(id);

    product.stock = Number(product.stock) - Number(quantity);

    await product.save()
}

module.exports = {
    newOrder,
    getSingleOrder,
    myOrderDetails,
    getAllOrder,
    updateOrderStatus,
    deleteOrder,

};