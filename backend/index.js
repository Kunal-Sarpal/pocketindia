const express = require('express');
const app = express();
const Adminrouter = require('./routes/admin');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const checkToken = require('./middleware');
const { productModel, orderModel, customerModel } = require('./db');
const AuthRouter = require('./routes/CustomerAndAgentAuth');
const CustomerRouter = require('./routes/customer');
require('dotenv').config();

app.use(cors({
    origin: '*'
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// Routes for admin and product
app.use('/api/v1/customer',CustomerRouter)
app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/admin', Adminrouter);


app.get('/', (req, res) => { res.send('Hello World') });

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