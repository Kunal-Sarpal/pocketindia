import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpAgent, SignUpCustomer } from '../store/actions/Productaction';
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {
    const [pointer, setPointer] = useState(false); // false = Agent, true = Customer
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        state: '',
        city: '',
        pincode: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pointer) {
            const res = await SignUpCustomer(formData);
            if (res.statusCode === 500 || res.statusCode === 401 || res.statusCode === 404) {
                toast.error(res.errorMessage);
                return;
            }
            if (res.statusCode === 400) {
                toast.warning(res.errorMessage);
                return;
            }
            toast.success("Customer Registered Successfully");
        } else {
            const res = await SignUpAgent(formData);
            console.log(res);
            if (res.statusCode === 500 || res.statusCode === 401 || res.statusCode === 404) {
                toast.error(res.errorMessage);
                return;
            }
            if (res.statusCode === 400) {
                toast.warning(res.errorMessage);
                return;
            }
            toast.success("Agent Registered Successfully");
            setMessage(res.message);
        }
        navigate('/login');
    };

    return (
        <>
            <ToastContainer />
            <div className='flex justify-center items-center w-full h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 px-4'>
                <div className={`w-full max-w-md bg-zinc-950 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6 ${pointer && 'border-zinc-800'} border-zinc-600 border`}>
                    {/* TOGGLE BUTTON */}
                    <div className='relative w-60 scale-75 flex justify-between bg-zinc-800 p-1 rounded-full border-2 border-zinc-700 overflow-hidden shadow-inner'>
                        <div
                            className={`absolute top-0 transition-all h-full w-1/2 bg-zinc-100 z-0 duration-500 rounded-full
                            ${pointer ? 'left-1/2' : 'left-0'}`}
                        />
                        <button
                            type='button'
                            onClick={() => {
                                setPointer(false);
                                setMessage('');
                                setFormData({ name: '', phone: '', email: '', password: '', state: '', city: '', pincode: '' });
                            }}
                            className={`z-10 w-1/2 text-center font-extrabold tracking-wide py-3 
                            ${!pointer ? 'text-zinc-900' : 'text-white'}`}
                        >
                            Agent
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setPointer(true);
                                setMessage('');
                                setFormData({ name: '', phone: '', email: '', password: '', state: '', city: '', pincode: '' });
                            }}
                            className={`z-10 w-1/2 text-center font-extrabold tracking-wide py-3 
                            ${pointer ? 'text-zinc-900' : 'text-white'}`}
                        >
                            Customer
                        </button>
                    </div>

                    {/* TITLE */}
                    <h1 className={`top-28 w-96 border border-zinc-700 rounded-lg p-5 px-10 text-xl font-extrabold shadow tracking-wide text-zinc-300`}>
                        {pointer ? 'Customer Sign Up' : 'Agent Sign Up'}
                    </h1>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <div>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Full Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className='w-full p-3 m-1 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                                />
                                <input
                                    type='tel'
                                    name='phone'
                                    placeholder='Phone Number'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className='w-full p-3 m-1 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                                />
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email Address'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full p-3 m-1 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                                />
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className='w-full p-3 m-1 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                                />
                            </div>

                            {/* Show additional fields for Customer */}
                            {pointer && (
                                <div>
                                    <input
                                        type='text'
                                        name='state'
                                        placeholder='State'
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className='w-full m-1 p-3 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                                    />
                                    <input
                                        type='text'
                                        name='city'
                                        placeholder='City'
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className='w-full m-1 p-3 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                                    />
                                    <input
                                        type='number'
                                        name='pincode'
                                        placeholder='Pincode'
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                        className='w-full m-1 p-3 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-md font-semibold tracking-wide transition duration-200 shadow-md'
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* AGENT MESSAGE */}
                    {!pointer && message && (
                        <p className='text-green-400 font-medium text-sm text-center mt-2'>{message}</p>
                    )}

                    <p className='text-white'>
                        Already have an account?{' '}
                        <span
                            className='text-blue-400 underline hover:text-blue-500 cursor-pointer'
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;
