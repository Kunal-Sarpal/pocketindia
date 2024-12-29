import React, { useContext, useState } from 'react';
import { FaArrowRight, FaTimesCircle } from 'react-icons/fa';  // Import icons
import { IoMdArrowBack } from "react-icons/io";
import { paymentContext } from '../paymentContext';
import { useNavigate } from 'react-router-dom';


// Validation function
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);
const validateUpiTransactionId = (upiTransactionId) => /^\d{12}$/.test(upiTransactionId);

const Payment = () => {
    const [step, setStep] = useState(1); // Control the current step (1 = scanner, 2 = form)
    const {setPayment} = useContext(paymentContext);
    const [formData, setFormData] = useState({
        upiTransactionId: '',
        email: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const navigate = useNavigate();

    const handleNextStep = () => {
        // Basic validation
        if (step === 1) {
            setStep(2); // Go to form step
        } else {
            const { upiTransactionId, email, phoneNumber } = formData;
            let validationErrors = {};
            if (!validateUpiTransactionId(upiTransactionId))
                validationErrors.upiTransactionId = 'UPI Transaction ID is required';
            if (!validateEmail(email)) validationErrors.email = 'Please enter a valid email address.';
            if (!validatePhoneNumber(phoneNumber)) validationErrors.phoneNumber = 'Please enter a valid 10-digit phone number.';

            if (Object.keys(validationErrors).length === 0) {
                setIsSubmitted(true);
                alert('Payment Successful!'); // Replace this with actual payment logic
            } else {
                setErrors(validationErrors);
            }
        }
    };

    

    return (
        <div className='w-full h-screen flex justify-center items-center'>
        <div className=" max-w-4xl   h-fit  mx-auto p-8 bg-white rounded-lg shadow-lg flex justify-center items-center border-2">
            <div className="absolute top-4 left-4 p-2 bg-[#ccc] text-zinc-500 border-zinc-500 border   rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-110 cursor-pointer z-50">
                <IoMdArrowBack size={30} onClick={() => {setPayment((prev) => !prev);navigate(-1)}} />
            </div>
            <div className="lg:flex  justify-between items-center">
                <div className="lg:w-1/2 p-2 lg:p-0">
                    {/* Step 1: Scanner Screen */}
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Scan UPI QR Code</h2>
                            <div className='rounded-md shadow-2xl shadow-green-100 border z-0'>
                                <img className='scale-90 z-0' src="https://svrtechnologies.com/wp-content/uploads/upi-scanner-01.webp" alt="UPI QR Code" />
                            </div>
                           
                            
                        </div>
                    
                </div>

                <div className="lg:w-1/2 pl-6">
                    {/* Step 2: UPI Transaction Form */}
                
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Complete Your Payment</h1>
                            <p className="text-sm text-gray-600 mb-4">Please enter your payment details below.</p>

                            {/* Form */}
                            <form>
                                <div className="space-y-4">
                                    {/* UPI Transaction ID */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">UPI Transaction ID</label>
                                        <input
                                            type="text"
                                            name="upiTransactionId"
                                            value={formData.upiTransactionId}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter UPI Transaction id"
                                        />
                                        {errors.upiTransactionId && <p className="text-red-500 text-xs">{errors.upiTransactionId}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your 10-digit phone number"
                                        />
                                        {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                        className="w-full border text-[#9333EA] border-[#9333EA] py-2 rounded-md hover:scale-95 shadow shadow-yellow-500 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-100"
                                        >
                                            Click to pay
                                        </button>

                                    
                                    </div>
                                </div>
                            </form>

                            {/* Cancel Button */}
                            

                            {/* Disclaimer */}
                            <div className="mt-6 text-center text-xs text-gray-500">
                                <p>
                                    We are not responsible for incorrect information provided. Please ensure all details are accurate.
                                </p>
                                <p className="mt-2 text-red-500 font-semibold">
                                    Fraudulent activities, such as using fake or stolen details, will result in legal action.
                                </p>
                            </div>
                        </div>
                    
                </div>
            </div>
        </div>

        </div>
    );
};

export default Payment;
