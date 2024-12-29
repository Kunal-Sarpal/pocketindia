import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncCreateProducts } from '../store/actions/Productaction';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        stock: '',
        unit: '',
        duration: '',
        imageUrl: '', // Image URL for the product
    });

    const [error, setError] = useState('');
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

        // You can use FormData or just send a plain object depending on your API requirements.
        const data = {
            title: formData.title,
            price: formData.price,
            stock: formData.stock,
            unit: formData.unit,
            duration: formData.duration,
            image: formData.imageUrl, // Send image URL instead of file upload
        };

        try {
            // Dispatch the async action to add product
            const token = localStorage.getItem('token');
            if(!token){
                return setError('No token found');
            }
            try{
                dispatch(asyncCreateProducts(data));

            }
            catch(err){
                setError(err.message);
            }

            // Clear form data or show success message
            // setFormData({
            //     title: '',
            //     price: '',
            //     stock: '',
            //     unit: '',
            //     duration: '',
            //     imageUrl: '',
            // });
            setError('');
        } catch (error) {
            setError('Error uploading product');
            console.error('Error uploading product:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Product Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter product title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Stock Quantity</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Enter stock quantity"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Unit</label>
                    <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Unit</option>
                        <option value="days">Days</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Duration</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Enter product duration"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Product Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter product image URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Upload Product
                    </button>
                </div>
                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            </form>
        </div>
    );
};

export default AddProduct;
