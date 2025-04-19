import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginAgent, LoginCustomer } from '../store/actions/Productaction';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [pointer, setPointer] = useState(false); // false = Agent, true = Customer
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const res = await LoginCustomer(formData);
            if(res != undefined){
                if (res.statusCode != undefined && res.statusCode == 500 || res.statusCode == 404 || res.statusCode == 401) {
                    toast.error(res.errorMessage);
                    return;
                }
                if (res.statusCode === 400) {
                    toast.warning(res.errorMessage);
                    return;
                }
            }
            toast.success("Customer Logged in Successfully");
            setTimeout(() => {
                navigate('/')
            }, 2000)

        } else {
            const res = await LoginAgent(formData);
            if (res.statusCode == 500  || res.statusCode == 401 || res.statusCode == 404) {
                toast.error(res.errorMessage);
                return;
            }
            else if(res.statusCode === 400) {
                toast.warning(res.errorMessage);
                return;
            }
            toast.success("Agent Logged in Successfully");
            setMessage(res.message)
        }
       
    };

    return (
        <>
            <ToastContainer />
            <div className='flex justify-center items-center w-full h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 px-4'>

                <div className={`w-full max-w-md bg-zinc-950 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6 ${pointer && 'border-zinc-800'} border-zinc-600 border`}>

                    {/* TOGGLE BUTTON */}

                    <div className='relative w-60 scale-75  flex justify-between bg-zinc-800 p-1 rounded-full border-2 border-zinc-700 overflow-hidden shadow-inner'>

                        {/* SLIDE ANIMATION BUTTON */}
                        <div
                            className={`absolute top-0 transition-all  h-full w-1/2 bg-zinc-100 z-0 duration-500 rounded-full
              ${pointer ? 'left-1/2' : 'left-0'}`}
                        />
                        <button
                            type='button'
                            onClick={() => {
                                setPointer(false);
                                setMessage('');
                                setFormData({ email: '', password: '' });
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
                                setFormData({  email: '', password: '' });
                            }}
                            className={`z-10 w-1/2 text-center font-extrabold  tracking-wide py-3 
              ${pointer ? 'text-zinc-900' : 'text-white'}`}
                        >
                            Customer
                        </button>
                    </div>

                    {/* TITLE */}


                    {/* FORM */}
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                       
                        
                        <input
                            type='email'
                            name='email'
                            placeholder='Email Address'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='w-full p-3 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='w-full p-3 py-4 rounded-md border border-zinc-600 bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-sm'
                        />

                        <button
                            type='submit'
                            className='w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-md font-semibold tracking-wide transition duration-200 shadow-md'
                        >
                            Log in
                        </button>
                        <h1 className={`top-28 w-96 border border-zinc-700  rounded-lg p-5 px-10  text-xl  font-extrabold shadow tracking-wide text-zinc-300`}>
                            {pointer ? 'Customer Log in' : 'Agent Login in'}
                        </h1>
                    </form>


                    {/* AGENT MESSAGE */}
                    {!pointer && message && (
                        <p className='text-green-400 font-medium text-sm text-center mt-2'>{message}</p>
                    )}
                    <p className='text-white '>don't have a account ? <span className='text-blue-400 underline hover:text-blue-500 cursor-pointer' onClick={()=>navigate('/signup')}>SignUp</span></p>
                </div>
            </div>
        </>
    );
};

export default Login;
