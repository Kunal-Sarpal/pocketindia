import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncCreateProducts } from '../store/actions/Productaction';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, CircularProgress } from '@mui/material';

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
                return setError('No token found');
            }

            try {
                await dispatch(asyncCreateProducts(data));
                setLoading(false);
                setError('');
                setFormData({
                    title: '',
                    price: '',
                    stock: '',
                    unit: '',
                    duration: '',
                    imageUrl: '',
                });
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        } catch (error) {
            setError('Error uploading product');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white  rounded-lg">
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
    );
};

export default AddProduct;
