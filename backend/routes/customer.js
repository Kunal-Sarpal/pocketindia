const express = require('express');
const jwt = require('jsonwebtoken');
const { productModel, trackModel, orderModel } = require('../db');
const { checkToken } = require('../middleware');

const CustomerRouter = express.Router();



CustomerRouter.get('/', (req, res) => {
    res.send("Healthy");
});

// Get all products route
CustomerRouter.get('/products', async (req, res) => {
    console.log('GET /products');
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Failed to retrieve products', error: err.message });
    }
});
// User purchase route
CustomerRouter.post('/order',checkToken, async (req, res) => {
    console.log('POST /user/buy');
    const {id} = req.query
    const { upiTransactionId, email, phone } = req.body;

    if (!upiTransactionId || !email || !phone) {
        return res.status(400).json({ message: 'Missing required fields (UPI Transaction ID, email, phone)' });
    }

    try {
        // Check if the product exists
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const order = await orderModel.create({
            productId: id,
            upiTransactionId,
            email,
            phone
        });

        if (!order) {
            return res.status(500).json({ message: 'Failed to create order' });
        }

        res.status(201).json({ message: 'Order successfully created', order });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Server error during order creation', error: err.message });
    }
});

// customer purchased products
CustomerRouter.get('/order/products',checkToken, async (req, res) => {
    const { email, role } = req.user;
    console.log('GET /user/buy/products', email, role);


    if (role !== "Customer") {
        return res.status(403).json({ message: "Only customers can view purchased products" });
    }

    try {
        const orders = await orderModel.find({ email }).populate('productId');

        const products = orders.map(order => order.productId);

        res.status(200).json({ message: "Products bought by customer", products });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// when user buy products then create a tracking Device
CustomerRouter.post('/track/product', async (req, res) => {
    const { userId, orderId, products } = req.body;

    try {
        const newTracking = new trackModel({
            userId,
            orderId,
            productsList: products.map(prod => ({
                productId: prod.productId,
                status: 'ordered',
                locationReached: 'Warehouse'
            }))
        });

        await newTracking.save();
        res.status(201).json({ message: 'Tracking created', tracking: newTracking });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create tracking', err });
    }
});

// when user click on track button then get the tracking details
CustomerRouter.put('/update-status', async (req, res) => {
    const { orderId, productId, status, locationReached } = req.body;

    try {
        const tracking = await trackModel.findOneAndUpdate(
            {
                orderId,
                'productsList.productId': productId
            },
            {
                $set: {
                    'productsList.$.status': status,
                    'productsList.$.locationReached': locationReached,
                    'productsList.$.lastUpdated': new Date()
                }
            },
            { new: true }
        );

        if (!tracking) {
            return res.status(404).json({ message: 'Tracking entry not found' });
        }

        res.json({ message: 'Tracking updated', tracking });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update status', err });
    }
});

module.exports = CustomerRouter;
