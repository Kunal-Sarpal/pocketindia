import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    TextField,
} from '@mui/material';

const UpdateProducts = () => {
    const [orders, setOrders] = useState([
        { _id: '12345', product: 'Prime', email: 'user1@example.com', price: 12.99, stock: 50 },
        { _id: '67890', product: 'YouTube', email: 'user2@example.com', price: 9.99, stock: 75 },
        { _id: '11223', product: 'Netflix', email: 'user3@example.com', price: 14.99, stock: 30 },
        { _id: '44556', product: 'Disney+', email: 'user4@example.com', price: 10.99, stock: 100 },
        { _id: '77889', product: 'Spotify', email: 'user5@example.com', price: 7.99, stock: 25 },
        { _id: '99100', product: 'Hulu', email: 'user6@example.com', price: 11.99, stock: 60 },
        { _id: '13579', product: 'Amazon', email: 'user7@example.com', price: 19.99, stock: 40 },
        { _id: '24680', product: 'Apple Music', email: 'user8@example.com', price: 5.99, stock: 55 },
        { _id: '86420', product: 'HBO Max', email: 'user9@example.com', price: 13.99, stock: 20 },
        { _id: '97531', product: 'Peacock', email: 'user10@example.com', price: 8.99, stock: 45 },
    ]);

    // Handle cell change
    const handleCellChange = (e, rowIndex, column) => {
        const updatedOrders = [...orders];
        updatedOrders[rowIndex][column] = e.target.value;
        setOrders(updatedOrders);
    };

    // Update the backend (example)
    const updateBackend = async (orderId, updatedData) => {
        try {
            const response = await fetch(`http://your-api-url.com/orders/${orderId}`, {
                method: 'PUT', // or PATCH depending on your backend
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const result = await response.json();
            console.log('Order updated:', result);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    // Handle update on blur (when the user clicks out of the input field)
    const handleBlur = (orderId, rowIndex) => {
        const updatedData = orders[rowIndex];
        updateBackend(orderId, updatedData);
    };

    return (
        <div className="bg-white p-5 shadow-md">
            <h1 className="text-3xl w-fit font-extrabold text-zinc-700 mb-5">
                Update Orders
                <hr className="mt-2 mb-4" />
            </h1>

            {/* Editable Orders Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, rowIndex) => (
                            <TableRow key={order._id} hover>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>
                                    <TextField
                                        value={order.product}
                                        onChange={(e) => handleCellChange(e, rowIndex, 'product')}
                                        onBlur={() => handleBlur(order._id, rowIndex)}
                                        size="small"
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>
                                    <TextField
                                        value={order.price}
                                        onChange={(e) => handleCellChange(e, rowIndex, 'price')}
                                        onBlur={() => handleBlur(order._id, rowIndex)}
                                        size="small"
                                        fullWidth
                                        type="number"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={order.stock}
                                        onChange={(e) => handleCellChange(e, rowIndex, 'stock')}
                                        onBlur={() => handleBlur(order._id, rowIndex)}
                                        size="small"
                                        fullWidth
                                        type="number"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => console.log(`Deleting order ${order._id}`)} // Placeholder for delete
                                        sx={{
                                            textTransform: 'none',
                                            '&:hover': { backgroundColor: '#ffebee' },
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UpdateProducts;
