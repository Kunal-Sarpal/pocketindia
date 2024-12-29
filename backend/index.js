const express = require('express');
const app = express();
const Adminrouter = require('./routes/admin');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const ProductRouter = require('./routes/product');
const checkToken = require('./middleware');
const { productModel, orderModel } = require('./db');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes for admin and product
app.use('/api/v1/admin/pocket', Adminrouter);
app.use('/api/v1/admin/pocket/product', checkToken, ProductRouter);

app.get('/',(req, res) => {res.send('Hello World')});
// Get all products route
app.get('/products', async (req, res) => {
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
app.post('/user/buy/:id', async (req, res) => {
    const { id } = req.params;
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



// Connect to MongoDB and start the server
app.listen(3000, async () => {
    try {
        await mongoose.connect('mongodb+srv://sarpalkunal7:kunal1234@cluster1.pc6dcst.mongodb.net/tstvps_server1');
        console.log('Connected to MongoDB');
        console.log('Server is running on port 3000');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit the process if the connection fails
    }
});
