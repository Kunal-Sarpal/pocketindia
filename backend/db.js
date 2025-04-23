const mongoose = require('mongoose');

// Product Schema
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must be less than 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Stock must be an integer',
        },
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: v => /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i.test(v),
            message: 'Invalid image URL',
        },
    },
    unit: {
        type: String,
        enum: ['days', 'months', 'years'],
        required: [true, 'Unit is required'],
    },
    likes: {
        type: Number,
        default: 0
    }
});

// Order Schema
const manageOrderSchema = mongoose.Schema({
    upiTransactionId: {
        type: String,
        required: [true, 'UPI Transaction ID is required'],
        trim: true,
        validate: {
            validator: v => /^[A-Za-z0-9]{12}$/.test(v),
            message: 'Invalid UPI Transaction ID',
        },
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Product Id is required'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: [true, 'User Id is required'],
    }
});

// Delivery Agent Schema
const deliveryAgentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Agent name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v),
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: v => /^[0-9]{10}$/.test(v),
            message: 'Invalid phone number',
        },
    },
    area: {
        type: String,
        default: 'Nawanshahr'
    },
    assignedOrders: [
        {
            status: {
                type: String,
                enum: ['assigned', 'in-progress', 'delivered','not-assigned'],
                default: ''
            },
           
        }
    ]
});

// Customer Schema
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v),
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: v => /^[0-9]{10}$/.test(v),
            message: 'Invalid phone number',
        },
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        validate: {
            validator: v => /^[0-9]{6}$/.test(v),
            message: 'Invalid pincode format',
        },
        default: '144205',
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        default: 'Nawanshahr', 
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        default: 'Punjab', 
    },
    buyProducts: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            buyDate: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ['ordered', 'cancelled', 'delivered'],
                default: 'ordered'
            }
        }
    ]
});

// Tracking Schema
const trackSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'deliveryAgents',
    },
    productsList: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            status: {
                type: String,
                enum: ['ordered', 'shipped', 'out-for-delivery', 'delivered', 'cancelled'],
                default: 'ordered'
            },
            locationReached: {
                type: String,
                default: 'Warehouse'
            },
            lastUpdated: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

// Agent-order Relation Schema
const listProductoneSingleAgentSchema = mongoose.Schema({
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'orders',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customers',
            required: true
        },
        agentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'deliveryAgents',
            default: null  // Agent can be null initially (not yet assigned)
        },
        assignedAt: {
            type: Date,
            default: null
        }
});

// Models
const productModel = mongoose.model('product', productSchema);
const orderModel = mongoose.model('orders', manageOrderSchema);
const deliveryAgentModel = mongoose.model('deliveryAgents', deliveryAgentSchema);
const customerModel = mongoose.model('customers', customerSchema);
const trackModel = mongoose.model('trackings', trackSchema);
const AssignAgent = mongoose.model('singleAgentCustomerMap', listProductoneSingleAgentSchema);

// Export all models
module.exports = {
    productModel,
    orderModel,
    deliveryAgentModel,
    customerModel,
    trackModel,
    AssignAgent
};
