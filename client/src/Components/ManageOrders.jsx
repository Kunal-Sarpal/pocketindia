import React, { useEffect, useState } from 'react';
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
import { HandleOrders } from '../store/actions/Productaction';

const ManageOrders = () => {
    const [searchType, setSearchType] = useState('email');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);

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

    async function fetchOrders() {
    
      const response = await HandleOrders();
      setOrders(response.orders);
    }
    useEffect(() => {
        fetchOrders();
    },[]
    )

    return (
        <div className="bg-white  w-full h-full overflow-y-auto">
            <h1 className="text-3xl w-fit font-extrabold text-zinc-700 ">
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
                        sx={{ width: '100px' }}
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
                            <TableCell>Order Status</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>UPI UTR</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Assign Agent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <TableRow key={order._id} hover>
                                    <TableCell>pending</TableCell>
                                    <TableCell>{order._id.substring(0, 8)}</TableCell>
                                    <TableCell>{order.productId.title}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell>{order.upiTransactionId}</TableCell>
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
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => deleteOrder(order._id)}
                                            sx={{
                                                textTransform: 'none',
                                                '&:hover': { backgroundColor: '#ffebee' },
                                            }}
                                        >
                                            Assign
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No orders 
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
