import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncCreateProducts } from '../store/actions/Productaction';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        stock: '',
        unit: '',
        duration: '',
        imageUrl: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            title: formData.title,
            price: formData.price,
            stock: formData.stock,
            unit: formData.unit,
            duration: formData.duration,
            image: formData.imageUrl,
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                toast.error('Please login first');
                return;
            }

            const result = await dispatch(asyncCreateProducts(data));
       
            if (result && result.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                setError('');
                setFormData({
                    title: '',
                    price: '',
                    stock: '',
                    unit: '',
                    duration: '',
                    imageUrl: '',
                });
                toast.success('Product Added Successfully');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setError(error || 'Error uploading product');
            toast.error(error._message || 'Error uploading product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <ToastContainer/>
        <div className="max-w-lg mx-auto p-6 bg-white  rounded-lg">
            <h1 className="text-3xl w-fit font-extrabold text-zinc-700 mb-5">
                Add Product
                <hr className="mt-2 mb-4" />
            </h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Product Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Stock Quantity"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                    required
                    variant="outlined"
                />
                <FormControl fullWidth margin="normal" required variant="outlined">
                    <InputLabel>Unit</InputLabel>
                    <Select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        label="Unit"
                    >
                        <MenuItem value="days">Days</MenuItem>
                        <MenuItem value="months">Months</MenuItem>
                        <MenuItem value="years">Years</MenuItem>
                    </Select>
                    <FormHelperText>{error && 'Please select a unit'}</FormHelperText>
                </FormControl>
                <TextField
                    label="Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                    required
                    variant="outlined"
                />
                <TextField
                    label="Product Image URL"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                />
                <div className="flex justify-center mt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={24} /> : null}
                    >
                        {loading ? 'Uploading...' : 'Upload Product'}
                    </Button>
                </div>
                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            </form>
        </div>
        </>
    );
};

export default AddProduct;
