const express = require('express');
const AgentRouter = express.Router();
const { orderModel, trackModel, AssignAgent, deliveryAgentModel, orderStatusModel } = require('../db');
const { checkToken } = require('../middleware');
const mongoose = require('mongoose');


// Get assigned orders for agent
AgentRouter.get('/orders', checkToken, async (req, res) => {
    try {
        const { role, id } = req.user;

        if (role !== 'Agent') {
            return res.status(403).json({ message: 'Access denied: Only agents allowed' });
        }

        // Fetch the agent’s own info
        const agent = await deliveryAgentModel.findById(id);
        if(agent.assignedOrders.length === 0 || agent.assignedOrders[0]._id === undefined  || agent.assignedOrders[0]._id === null){
            return res.status(404).json({ message: 'No orders assigned to this agent' }); 
        }
        // Fetch assigned orders
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

        const assignedOrders = assignments
            .map(assign => assign.orderId)
            .filter(order => order !== null);

        // If agent not found or no orders assigned
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.json({
            message: 'Assigned orders fetched successfully',
            agentId: id,
            agentCity: agent.city || "No city assigned",  // send agent’s saved city
            agentPincode: agent.pincode || "No pincode assigned",       // send agent’s saved pincode
            assignedAt: new Date().toISOString(),                       // current time when you fetched orders
            assignedOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});


// Agent updates status with current location and pincode
AgentRouter.post('/update-location', checkToken,async (req, res) => {
    try {
        const { agentId } = req.query;  // agent's ID from URL
        const { location, pincode } = req.body;  // new pincode and city from body

        // Validate input
        if (!pincode || !location) {
            return res.status(400).json({ message: 'Pincode and city are required to update location.' });
        }
        const city = location.split(',')[0].trim(); 
        // Find agent by ID and update
        const updatedAgent = await deliveryAgentModel.findByIdAndUpdate(
            agentId,
            { pincode, city },  // fields to update
            { new: true, runValidators: true } // return updated doc and apply validation rules
        );

        if (!updatedAgent) {
            return res.status(404).json({ message: 'Agent not found.' });
        }

        res.status(200).json({
            message: 'Agent location updated successfully!',
            agent: updatedAgent
        });
    } catch (error) {
        console.error('Error updating agent location:', error);
        res.status(500).json({ message: 'Server error while updating agent location.', error });
    }
});


AgentRouter.post('/delivery',checkToken, async (req, res) => {
    console.log('POST /agent/delivery');
    try {
        const { orderId } = req.query;
        const { role, id } = req.user;

        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        let deliverySchema = await orderStatusModel.findOne({orderId});
        
        if (!deliverySchema) {
            deliverySchema = await orderStatusModel.create({
                orderId: orderId,
                statusUser: role === 'Customer' ? true : false,
                statusAgent: role === 'Agent' ? true : false,
            });
        } else {
            // Update existing delivery status
            if (role === 'Agent') {
                deliverySchema.statusAgent = true;
            } else if (role === 'Customer') {
                deliverySchema.statusUser = true;
            } else {
                return res.status(403).json({ message: 'Only Agent or Customer can update delivery status.' });
            }
            await deliverySchema.save();  // 💥 Save the changes
        }

        await deliverySchema.save(); // Save the updated status

        // Check if both confirmed
        if (deliverySchema.statusAgent && deliverySchema.statusUser) {
            const deletedOrder = await orderModel.findByIdAndDelete(orderId);

            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
    
            if (role === 'Agent') {
                await mongoose.model('deliveryAgents').updateOne(
                  { _id: id }, 
                  { $set: { assignedOrders: [] } } 
                );
            }
            await mongoose.model('trackings').deleteMany({ orderId: orderId });
            await mongoose.model('singleAgentCustomerMap').deleteMany({ orderId: orderId });
            await mongoose.model('orderStatus').deleteMany({ orderId: orderId });
                      

            return res.status(200).json({
                message: 'Delivery completed and order deleted successfully!',
                deletedOrder
            });
        } else {
            let pendingParty = '';
            if (!deliverySchema.statusAgent) pendingParty = 'Agent has not delivered yet.';
            if (!deliverySchema.statusUser) pendingParty = 'Customer has not confirmed yet.';

            return res.status(200).json({
                message: 'Waiting for both parties to confirm delivery.',
                pending: pendingParty,
                currentStatus: deliverySchema
            });
        }
    } catch (error) {
        console.error('Error in delivery process:', error);
        res.status(500).json({ message: 'Server error while processing delivery.', error });
    }
});

module.exports = AgentRouter;
