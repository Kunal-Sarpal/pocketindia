// TESTED

const express = require('express');
const AuthRouter = express.Router();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); // ✅ Required for generating tokens

const { customerModel, deliveryAgentModel } = require('../db');

// ==========================
// Helper functions
// ==========================

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
    if (!password || !hash) throw new Error("Password and hash are required");
    return bcrypt.compare(password, hash);
}

// ==========================
// Test route
// ==========================

AuthRouter.get("/", (req, res) => {
    res.send("Auth API is working ✅");
});

// ==========================   
// CUSTOMER ROUTES
// ==========================

AuthRouter.post("/customer/signup", async (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log("Request Signup " +  name +  email + phone +  password)
    try {
        if (!email || !password || !name || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await customerModel.findOne({ email });
        if (existing) return res.status(400).json({ message: "Customer already exists" });


        const hashed = await hashPassword(password);

        const newCustomer = new customerModel({
            name,
            email,
            phone,
            password: hashed,
            buyProducts: []
        });

        await newCustomer.save();

        // Remove password before sending back
        const { password: _, ...safeCustomer } = newCustomer._doc;
        res.status(200).json({ message: "Customer registered successfully", customer: safeCustomer });
    } catch (error) {
        return res.status(500).json({ message: error._message });
    }
});

AuthRouter.post("/customer/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const customer = await customerModel.findOne({ email });
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        if (!customer.password) return res.status(500).json({ message: "Password not stored in DB" });
        const isMatch = await verifyPassword(password, customer.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign(
            { email: customer.email, id: customer._id, role: "Customer" },
            process.env.CUSTOMER_SECRET,
            { expiresIn: "24h" }
        );

        const { password: _, ...safeCustomer } = customer._doc;
        res.status(200).json({ token, message: "Login successful", customer: safeCustomer });
    } catch (error) {
        return res.status(500).json({ message: error._message });
    }
});

// ==========================
// AGENT ROUTES
// ==========================

AuthRouter.post("/agent/signup", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!email || !password || !name || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await deliveryAgentModel.findOne({ email });
        if (existing) return res.status(400).json({ message: "Agent already exists" });

        const hashed = await hashPassword(password);

        const newAgent = new deliveryAgentModel({
            name,
            email,
            phone,
            password: hashed,
            assignedOrders: []
        });

        await newAgent.save();

        const { password: _, ...safeAgent } = newAgent._doc;
        res.status(200).json({ message: "Agent registered successfully", agent: safeAgent });
    } catch (error) {
        res.status(500).json({ message: error._message });
    }
});

AuthRouter.post("/agent/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const agent = await deliveryAgentModel.findOne({ email });
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        const isMatch = await verifyPassword(password, agent.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign(
            { email: agent.email, id: agent._id, role: "Agent" },
            process.env.AGENT_SECRET,
            { expiresIn: "24h" }
        );

        const { password: _, ...safeAgent } = agent._doc;
        res.status(200).json({ token, message: "Login successful", agent: safeAgent });
    } catch (error) {
        return res.status(500).json({ message: error._message });
    }
});

// ==========================
// EXPORT
// ==========================

module.exports = AuthRouter;
