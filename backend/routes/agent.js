const express = require('express');
const AgentRouter = express.Router();
const { orderModel, trackModel, AssignAgent } = require('../db');
const { checkToken } = require('../middleware');

// Get assigned orders for agent
AgentRouter.get('/orders', checkToken, async (req, res) => {
    try {
        const { role, id } = req.user;

        if (role !== 'Agent') {
            return res.status(403).json({ message: 'Access denied: Only agents allowed' });
        }

        // Find assignments for this agent and populate order, product and user info
        const assignments = await AssignAgent.find({ agentId: id })
            .populate({
                path: 'orderId',
                populate: [
                    {
                        path: 'productId',
                        model: 'product',
                        select: 'title price image'
                    },
                    {
                        path: 'userId',
                        model: 'customers',
                        select: 'city state pincode'
                    }
                ]
            });

        // Extract populated orders
        const assignedOrders = assignments.map(assign => assign.orderId);

        res.json({
            message: 'Assigned orders fetched successfully',
            assignedOrders
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Agent updates status with current location and pincode
AgentRouter.post('/update-status', checkToken, async (req, res) => {
    try {
        const { role, id } = req.user;
        const { orderId, location, pincode } = req.body;

        if (role !== 'agent') {
            return res.status(403).json({ message: 'Only agents can update status' });
        }

        const order = await orderModel.findOne({ _id: orderId, assignedAgent: id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found or not assigned to you' });
        }

        const expectedPincode = order.deliveryPincode; // assuming stored in DB

        let chargesDeducted = false;
        if (pincode !== expectedPincode) {
            // deduct charges, log mismatch, etc.
            chargesDeducted = true;
        }

        // Save to tracking history
        const update = {
            orderId,
            location,
            timestamp: new Date(),
            pincode,
            chargesDeducted,
        };

        const trackUpdate = new trackModel(update);
        await trackUpdate.save();

        res.json({
            message: 'Status updated',
            update,
            chargesDeducted: chargesDeducted ? 'Charges deducted due to pincode mismatch' : 'No charge deducted'
        });

    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
    }
});

module.exports = AgentRouter;
