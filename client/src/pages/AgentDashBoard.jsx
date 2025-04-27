import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, TextField,
  Button, Divider, Alert, CircularProgress
} from '@mui/material';
import { LocationOn, LocalShipping } from '@mui/icons-material';
import { HandleDelveryStatus } from '../store/actions/Productaction';
import { toast, ToastContainer } from 'react-toastify';

const API_BASE = "https://api.pocketindia.shop/api/v1"; // your backend URL

export default function AgentDashboard() {
  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState({});
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [agentId, setAgentId] = useState('');
  const [orderId, setOrderId] = useState('');

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/agent/orders`, {
        headers: { Authorization: `${token}` }
      });
    
      setAgentId(res.data.agentId);
      setOrderId(res.data.assignedOrders[0]?._id);
      
      setOrdersData(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "something went wrong");
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
        `${API_BASE}/agent/update-location?agentId=${agentId}`,
        { location, pincode },
        { headers: { Authorization: `${token}` } }
      );
      setMessage(res.data);
      setLocation('');
      setPincode('');
     window.location.reload();
    } catch (err) {
      setMessage(err.response?.data.error.message || err.message || err.message || "something went wrong");
    }
  };

 

async function handleStatusUpdateDelevered(orderId){
          const res = confirm("Are you sure you want to update the order as delivered?")
          if(res){
              try{
                  const response = await HandleDelveryStatus(orderId);
                  console.log(response.message + "Kunal")
                  if (response.errorMessage) {
                    
                      toast.error(response.errorMessage);
                      return;
                  }
                  toast.info(response.message);
              }
              catch (error) {
                  console.error("Error updating order status:", error);
                  toast.error("Failed to update order status. Please try again.");
              }
          } 
          else{
              alert("Cancelled")
          }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>
  );

  return (
    <>
    <ToastContainer/>
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-50 to-purple-100 font-sans">
      <Typography variant="h4" className="text-purple-800 font-bold mb-8">Agent Dashboard</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Agent Details Section */}
      <Card className="mb-8 shadow-xl rounded-xl border border-purple-200">
        <CardContent>
          <Typography variant="h6" className="text-purple-700 mb-4">Agent Info</Typography>
          <Typography><strong>City:</strong> {ordersData.agentCity}</Typography>
          <Typography><strong>Pincode:</strong> {ordersData.agentPincode}</Typography>
          <Typography><strong>Assigned At:</strong> {new Date(ordersData.assignedAt).toLocaleString()}</Typography>
        </CardContent>
      </Card>

      {/* Orders Section */}
      {ordersData.assignedOrders?.length === 0 || error ? (
        <Alert severity="info">No orders assigned yet. Please wait.</Alert>
      ) : (
        <>
          <Card className="mb-8 shadow-xl rounded-xl border border-purple-200">
            <CardContent>
              <div className="flex items-center gap-2 mb-4 text-purple-700">
                <LocalShipping />
                <Typography variant="h6">Assigned Orders</Typography>
              </div>
              {ordersData.assignedOrders?.map(order => (
                <div key={order._id} className="mb-4 p-3 rounded bg-white border shadow-sm">
                  <Typography><strong>Order ID:</strong> {order._id}</Typography>
                  <Typography><strong>Pickup:</strong> Cali, LA</Typography>
                  <Typography><strong>Delivery:</strong> {order.userId.state} {order.userId.city} {order.userId.pincode}</Typography>
                  <Typography><strong>Current Agent Location:</strong> {ordersData.agentCity}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Update Location Section */}
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
                  onClick={()=>handleStatusUpdate()}
                  disabled={!location || !pincode}
                >
                  Update
                </Button>
              </div>
              {message && (
                <Alert severity="info" className="mt-4">{message}</Alert>
              )}
            </CardContent>
            <p>If you have deleivered the order succesfull clcik this button</p>
            <Button
                  variant="contained"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={()=>handleStatusUpdateDelevered(orderId)}
      
                >
                  Update
                </Button>
          </Card>
        </>
      )}
    </div>
    </>
  );
}
