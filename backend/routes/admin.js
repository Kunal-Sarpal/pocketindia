const express = require('express');
const { productModel, orderModel } = require('../db');
const jwt = require('jsonwebtoken');
const { checkIfAdmin, checkToken } = require('../middleware');


const   Adminrouter = express.Router();
Adminrouter.get('/', (req, res) => {
    res.send("Healthy");
});
Adminrouter.post('/register', async (req, res) => {
    console.log(" Register");

    try {
        const { email, password } = req.body;


        if (email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email:email, role:"Admin" }, process.env.ADMIN_SECRET, { expiresIn: '24h' });
            return res.status(200).json({ token, msg: "Registered" });
        } else {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }
    } catch (err) {
        console.log("In err")
        res.status(500).json({ msg: err.message + " - server error" });
    }
});

Adminrouter.post('/create/product', checkToken,checkIfAdmin, async (req, res) => {
    console.log('/create request');
    try {
        const { title, price, stock, image, unit, duration } = req.body;

        if (!title || !price || !stock || !image || !unit || !duration) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }

        // Convert numeric values to numbers
        const productData = {
            title,
            price: Number(price),
            stock: Number(stock),
            image,
            unit,
            duration: Number(duration)
        };

        const product = await productModel.create(productData);

        res.status(200).json({ msg: "Product created successfully", product });

    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ msg: err.message + " - server error" });
    }
});

Adminrouter.post('/delete/product', checkToken,checkIfAdmin, async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ msg: "ID is required" });

        }
        await productModel.findByIdAndDelete(id);

        return res.json({ msg: "Deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message + " - server error" });
    }
});
Adminrouter.get('/get/orders', async (req, res) => {
    console.log("get/orders")
    try{
        const orders = await orderModel.find().populate("productId");
        console.log(orders)
        return res.status(200).json({msg:"orders",orders});
    }
    catch(err){
        res.status(500).json({msg:err._message});
    }
});
Adminrouter.post('/update/product', checkToken, async (req, res) => {
    try {
        const { id } = req.query;
        const { title, price, stock,unit, image, duration } = req.body;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ msg: "ID is required" });
        }

        // Build the update object dynamically
        let updateFields = {};
        if (title) updateFields.title = title;
        if (price) updateFields.price = price;
        if (stock) updateFields.stock = stock;
        if (image) updateFields.image = image;
        if (duration) updateFields.duration = duration;
        if (unit) updateFields.unit = unit;

        // If no fields to update, return a message
        if (Object.keys(updateFields).length === 0) {
            return res.status(200).json({ msg: "Everything is up-to-date" });
        }

        // Perform the update
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true } // Returns the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        return res.status(200).json({ msg: "Product updated successfully", updatedProduct });
    } catch (err) {
        res.status(500).json({ msg: `${err.message} - server error` });
    }
});
Adminrouter.post('/assign/agent', checkToken,checkIfAdmin, async (req, res) => {
    try {
        const { orderId, agentId } = req.body;

        if (!orderId || !agentId) {
            return res.status(400).json({ message: "Order ID and Agent ID are required" });
        }

        // Get the order and customer
        const order = await orderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        const customer = await customerModel.findById(order.userId);
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        const agent = await deliveryAgentModel.findById(agentId);
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        // Create assignment entry
        const assignment = await agentAssignmentModel.create({
            orderId: order._id,
            userId: customer._id,
            agentId: agent._id,
            assignedAt: new Date()
        });

        // Update agent's assignedOrders
        agent.assignedOrders.push({
            orderId,
            status: 'assigned'
        });
        await agent.save();

        // Optional: Create tracking entry
        await trackModel.create({
            userId: customer._id,
            orderId: order._id,
            agent: agent._id,
            productsList: [
                {
                    productId: order.productId,
                    status: 'ordered',
                    locationReached: 'Warehouse',
                    lastUpdated: new Date()
                }
            ]
        });

        res.status(200).json({
            message: "Agent manually assigned successfully",
            assignment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




module.exports = Adminrouter;
