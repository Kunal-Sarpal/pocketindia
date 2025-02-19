import React, {  useEffect, useState } from 'react';
import Card from '../Components/Card';
import '../index.css';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetProducts } from '../store/actions/Productaction';

const Homepage = () => {
    const data = useSelector((state) => state.appdata.data)
     const cartItem = useSelector(state => state.cartdata.cartItems);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(asyncGetProducts())
    },[])
    // console.log(data[0])
    // const dispatch = useDispatch()
    return (
        <>
            <div className="flex justify-center transition-all ease-in-out duration-200    ">

                {/* Sidebar */}
                <div className={` ${open ? ' w-full overflow-hidden'  : 'w-0'}  bg-white md:w-1/5  transition-all ease-in-out duration-300   h-screen sticky top-0  overflow-hidden  text-white z-50   `}>
                    <Navbar />
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="lg:hidden fixed  top-4 right-4 z-60 p-3 bg-zinc-700 z-9999  hover:bg-zinc-800 text-white rounded-full">
                        {open ? (
                            // Close icon (X) when sidebar is open
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger menu icon when sidebar is closed
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Main Content */}
                <div className={`${open ? `w-6 blur-md    z-[-44px]` :'w-full blur-none' } md:w-4/5 lg:blur-none transition-all ease-in-out duration-200 ml-1/5  border-2    border-l-2  rounded-l-[50px]     right-0 p-8 overflow-y-auto  overflow-hidden`}>


                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Shop</h1>
                        <p className="text-gray-600 text-lg">
                            Explore our range of products and find what suits you best.
                        </p>
                    </div>

                    {/* Cards Section */}
                    {data.length == 0 && <div className='text-xl font-light text-gray-500 mb-4'>No product available..</div>}
                    <div className="grid xl:grid-cols-4  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.length > 0 && data?.map((item, index) => (
                            <Card key={index} id={item._id} title={item.title} stock={item.stock} like={item.like} price={item.price} duration={item.duration} image={item.image} unit={item.unit} />
                        ))}
                       
                        {data?.length <= 0 && 
                            <div className='font-light text-gray-500  w-full fixed top-0 bg-transparent left-40 flex justify-center items-center bg-red-500 h-screen backdrop-blur-sm gap-3'>
                                    <div className=' w-16 h-16 rounded-full border-2 border-b-zinc-100  border-zinc-900 animate-spin'>
                                    <div className=' w-16 h-16 rounded-full border-8 border-x-transparent  border-zinc-300 animate-pulse'>
                                        <div className=' w-16 h-16 rounded-full border-8  border-transparent  animate-spin'>

                                        </div>
                                    </div>
                                    
                                    </div>
                                <p className='text-zinc-800 font-normal'>Loading... </p>
                               
                            </div>
                               
                            }

                       
                       
                    </div> 
                </div>
            </div>
        </>
       
    );
};

export default Homepage;
