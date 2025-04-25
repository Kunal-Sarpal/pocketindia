import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, TextField,
  Button, Divider, Alert, CircularProgress
} from '@mui/material';
import { LocationOn, LocalShipping, CheckCircle } from '@mui/icons-material';

const API_BASE = "http://localhost:3000/api/v1"; // change to your backend

export default function AgentDashboard() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/agent/orders`, {
        headers: { Authorization: `${token}` }
      });
      console.log(res.data);
      setOrders(res.data.assignedOrders);
      if (res.data.assignedOrders.length > 0) {
        setSelectedOrderId(res.data.assignedOrders[0]._id);
      }
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/agent/update-status`,
        { orderId: selectedOrderId, location, pincode },
        { headers: { Authorization: `${token}` } }
      );
      setMessage(res.data.chargesDeducted);
      setLocation('');
      setPincode('');
      fetchOrders(); // optional: refresh orders if you want to show updated data
    } catch (err) {
      setMessage("Update failed. Please try again.");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-50 to-purple-100 font-sans">
      <Typography variant="h4" className="text-purple-800 font-bold mb-8">Agent Dashboard</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {orders.length === 0 ? (
        <Alert severity="info">No orders assigned yet. Please wait.</Alert>
      ) : (
        <>
          <Card className="mb-8 shadow-xl rounded-xl border border-purple-200">
            <CardContent>
              <div className="flex items-center gap-2 mb-4 text-purple-700">
                <LocalShipping />
                <Typography variant="h6">Assigned Order</Typography>
              </div>
              {orders.map(order => (
                <div key={order._id} className="mb-4 p-3 rounded bg-white border shadow-sm">
                  <Typography><strong>Order ID:</strong> {order._id}</Typography>
                  <Typography><strong>Pickup:</strong> Cali,LA</Typography>
                  <Typography><strong>Delivery:</strong> {order.userId.state + " " +order.userId.city +" " + order.userId.pincode }</Typography>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-8 shadow-xl rounded-xl border border-purple-200">
            <CardContent>
              <div className="flex items-center gap-2 mb-4 text-purple-700">
                <LocationOn />
                <Typography variant="h6">Update Order Status</Typography>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <TextField
                  label="Current Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1"
                />
                <TextField
                  label="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="contained"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleStatusUpdate}
                  disabled={!location || !pincode}
                >
                  Update
                </Button>
              </div>
              {message && (
                <Alert severity="info" className="mt-4">{message}</Alert>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
