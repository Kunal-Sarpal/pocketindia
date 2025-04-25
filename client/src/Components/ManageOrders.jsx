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
} from '@mui/material';
import { CheckStatus, HandleOrders } from '../store/actions/Productaction';

const ManageOrders = () => {
    const [searchType, setSearchType] = useState('email');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [bool, setBool] = useState(false);
    const navigate = useNavigate();
    const [clickId, setClick] = useState(null); 
    const [assignableOrders, setAssignableOrders] = useState([]); 



    const filteredOrders = orders.filter((order) => {
        if (searchType && searchQuery) {
            return order[searchType]?.toLowerCase().includes(searchQuery.toLowerCase());
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

        if (res.status === "not-assigned") {
            setAssignableOrders((prev) => [...new Set([...prev, orderId])]);
        } else {
            setAssignableOrders((prev) => prev.filter((id) => id !== orderId)); 
        }

        alert("Order status: " + res.status);
    };


    async function fetchOrders() {

        const response = await HandleOrders();
        setOrders(response.orders);
    }
    useEffect(() => {
        fetchOrders();
    }, []
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
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>Order Status</TableCell>
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>Order ID</TableCell>
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>Product</TableCell>
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>Email</TableCell>
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>UPI UTR</TableCell>
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>Phone</TableCell>
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>Actions</TableCell>
                            <TableCell sx={{ fontSize: "14px", fontWeight: "600" }}>Assign Agent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <TableRow key={order._id} hover>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleStatus(order._id)}
                                        >
                                            Check
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "14px" }}>{order._id.substring(0, 8)}</TableCell>
                                    <TableCell sx={{ fontSize: "14px" }}>{order.productId.title.substring(0, 5) + "...  "}</TableCell>
                                    <TableCell sx={{ fontSize: "14px" }}>{order.email || order.userId.email}</TableCell>
                                    <TableCell sx={{ fontSize: "14px" }}>{order.upiTransactionId}</TableCell>
                                    <TableCell sx={{ fontSize: "14px" }}>{order.phone || order.userId.phone}</TableCell>
                                    <TableCell sx={{ fontSize: "14px" }}>
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
                                    <TableCell sx={{ fontSize: "14px" }}>
                                        <Button
                                            disabled={order._id !== clickId || !assignableOrders.includes(order._id)}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => AssignOrder(order._id)}
                                            sx={{
                                                textTransform: 'none',
                                                '&:hover': { backgroundColor: '#fefef' },
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
