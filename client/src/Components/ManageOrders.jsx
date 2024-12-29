import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    TextField,
    Button,
    Paper,
    InputLabel,
    FormControl,
} from '@mui/material';

const ManageOrders = () => {
    const [searchType, setSearchType] = useState('email');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([
        { _id: '12345', product: 'Prime', email: 'user1@example.com', upi: '1234567890', phone: '9876543210' },
        { _id: '67890', product: 'YouTube', email: 'user2@example.com', upi: '0987654321', phone: '8765432109' },
        { _id: '11223', product: 'Netflix', email: 'user3@example.com', upi: '9876543212', phone: '9123456789' },
        { _id: '44556', product: 'Disney+', email: 'user4@example.com', upi: '5432167890', phone: '9786543210' },
        { _id: '77889', product: 'Spotify', email: 'user5@example.com', upi: '8765432190', phone: '9876123456' },
        { _id: '99100', product: 'Hulu', email: 'user6@example.com', upi: '1098765432', phone: '9123768540' },
        { _id: '13579', product: 'Amazon', email: 'user7@example.com', upi: '2345678901', phone: '9345678901' },
        { _id: '24680', product: 'Apple Music', email: 'user8@example.com', upi: '3456789012', phone: '9878901234' },
        { _id: '86420', product: 'HBO Max', email: 'user9@example.com', upi: '4567890123', phone: '8765432198' },
        { _id: '97531', product: 'Peacock', email: 'user10@example.com', upi: '5678901234', phone: '9877890123' },
    ]);

    // Filtered orders based on search query and type
    const filteredOrders = orders.filter((order) => {
        if (searchType && searchQuery) {
            return order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    const deleteOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    };

    return (
        <div className="bg-white p-5 shadow-md w-full h-full overflow-y-auto">
            <h1 className="text-3xl w-fit font-extrabold text-zinc-700 mb-5">
                Manage Orders
                <hr className="mt-2 mb-4" />
            </h1>

            {/* Search Orders */}
            <Box sx={{ marginBottom: 4, display: 'flex', gap: 2 }}>
                <FormControl fullWidth required variant="outlined" size="small">
                    <InputLabel id="search-type-label">Type</InputLabel>
                    <Select
                        labelId="search-type-label"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        label="Type"
                        sx={{ width: '200px' }}
                    >
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="upi">UPI UTR</MenuItem>
                        <MenuItem value="phone">Phone</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    variant="outlined"
                    size="small"
                    placeholder={`Search by ${searchType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                />
            </Box>

            {/* Orders Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>UPI UTR</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <TableRow key={order._id} hover>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.product}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell>{order.upi}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => deleteOrder(order._id)}
                                            sx={{
                                                textTransform: 'none',
                                                '&:hover': { backgroundColor: '#ffebee' },
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageOrders;
