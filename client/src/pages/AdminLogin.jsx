import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography, Box, Container } from '@mui/material';
import { loginAdmin } from '../store/actions/Productaction'; // Ensure the correct import path
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmailError(false);
        setPasswordError(false);
        setLoading(true);

        const { email, password } = formData;

        // Simple validation
        if (!email || !password) {
            setError('Please fill in both fields.');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (!password) {
            setPasswordError(true);
            setError('Password is required.');
            setLoading(false);
            return;
        }

        try {
            const resdata = await loginAdmin(formData);
            if (resdata === "Authentication failed") {
                toast.error('Login Failed!');
                // throw new Error('Login failed');
            } else {
                const resToken = resdata.token;
                localStorage.setItem("token", resToken); // Store token on success
                toast.success("Login Successful!");
                setTimeout(() => {
                    navigate('/');
                },1000)
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <Box sx={{ padding: 4, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Admin Login
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            type="email"
                            helperText={emailError ? 'Please enter a valid email address.' : ''}
                            error={emailError}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            type="password"
                            helperText={passwordError ? 'Password is required.' : ''}
                            error={passwordError}
                        />

                        {error && <Typography variant="body2" color="error" align="center">{error}</Typography>}

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Box>
                    </form>

                    <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
                        <span>Created by Amazon CEO</span>
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default AdminLogin;
