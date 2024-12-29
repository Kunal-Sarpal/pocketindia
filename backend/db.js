const mongoose = require('mongoose');

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
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i.test(v);
            },
            message: 'Invalid image URL',
        },
    },
    unit: {
        type: String,
        enum: {
            values: ['days', 'months', 'years'],
            message: 'Unit must be one of [days, months, years]',
        },
        required: [true, 'Unit is required'],
    },
    likes: {
        type: Number,
        default: 0
    }
});


const manageOrderSchema = mongoose.Schema({
    upiTransactionId: {
        type: String,
        required: [true, 'UPI Transaction ID is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9]{12}$/.test(v); // Example pattern for UPI ID
            },
            message: 'Invalid UPI Transaction ID',
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
            },
            message: 'Invalid email format',
        },
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Example pattern for 10-digit phone number
            },
            message: 'Invalid phone number',
        },
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
    },
});


const productModel = mongoose.model('product', productSchema);
const orderModel = mongoose.model('orders', manageOrderSchema);
module.exports = {
    productModel,
    orderModel
}