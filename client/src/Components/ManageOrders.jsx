import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Typography
} from '@mui/material';
import { CheckStatus, HandleOrders } from '../store/actions/Productaction';

const ManageOrders = () => {
    const [searchType, setSearchType] = useState('email');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [assignableOrders, setAssignableOrders] = useState([]);
    const [clickId, setClick] = useState(null);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        const response = await HandleOrders();
        if (response?.orders) {
            setOrders(response.orders);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        if (!searchQuery) return true;

        const user = order.userId || {};
        if (searchType === 'email') {
            return user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchType === 'phone') {
            return user.phone?.includes(searchQuery);
        } else if (searchType === 'upi') {
            return order.upiTransactionId?.includes(searchQuery);
        }
        return true;
    });

    const deleteOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    };

    const AssignOrder = (id) => {
        navigate(`/agent/assign/to/orderid/${id}`);
    };

    const handleStatus = async (orderId) => {
        const res = await CheckStatus(orderId);
        setClick(orderId);

        if (res.status === 'not-assigned') {
            setAssignableOrders((prev) => [...new Set([...prev, orderId])]);
        } else {
            setAssignableOrders((prev) => prev.filter((id) => id !== orderId));
        }

        alert('Order status: ' + res.status);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Manage Orders
            </Typography>
            <hr className="mb-6" />

            {/* Search Bar */}
            <Box className="flex flex-wrap gap-4 mb-6">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="search-type-label">Search By</InputLabel>
                    <Select
                        labelId="search-type-label"
                        value={searchType}
                        label="Search By"
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="phone">Phone</MenuItem>
                        <MenuItem value="upi">UPI UTR</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder={`Search by ${searchType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            {/* Orders Table */}
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell>Status</TableCell>
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
                            filteredOrders.map((order) => {
                                const user = order.userId || {};
                                const product = order.productId || {};
                                return (
                                    <TableRow key={order._id}>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleStatus(order._id)}
                                            >
                                                Check
                                            </Button>
                                        </TableCell>
                                        <TableCell>{order._id.substring(0,6).toUpperCase()}</TableCell>
                                        <TableCell>{product.title.toLowerCase() || 'N/A'}</TableCell>
                                        <TableCell>{user.email || 'N/A'}</TableCell>
                                        <TableCell>{order.upiTransactionId || 'N/A'}</TableCell>
                                        <TableCell>{user.phone || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => deleteOrder(order._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {assignableOrders.includes(order._id) ? (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => AssignOrder(order._id)}
                                                >
                                                    Assign
                                                </Button>
                                            ):"click on check status"}
                                          
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
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
