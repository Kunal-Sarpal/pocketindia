import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '../store/reducers/cartReducer';
import { Button } from '@mui/material';
import { paymentContext } from '../paymentContext';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartdata.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setPayment } = useContext(paymentContext);

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handlePayment = () => {
    setPayment((prev) => !prev);
    navigate('/payment');
  };

  return (
  
    <div className="bg-zinc-200 h-screen overflow-y-auto  py-12 px-10 relative">
        <div className="absolute top-4 left-4 p-2 bg-[#ccc] text-zinc-500 border-zinc-500 border   rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-110 cursor-pointer z-50">
                      <IoMdArrowBack size={30} onClick={() => {setPayment((prev) => !prev);navigate(-1)}} />
                  </div>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="md:text-5xl text-4xl font-extrabold text-gray-900 border-b-2 border-zinc-400 pb-4">Your Favourite Products</h1>
        
      </div>
      
      <div className=''>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="shadow-md border  border-zinc-300 rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 relative"
              >
                {/* Image Section */}
                <div className="bg-gray-200 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt="Spotify Premium"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-4">
                  <h2 className="text-2xl font-bold text-zinc-700 truncate">{item.title}</h2>
                  <hr className="border-t border-zinc-300" />

                  <div className="flex gap-2 items-center">
                    <p className="text-xl text-zinc-700 font-semibold">₹{item.price}</p>
                    <p className="text-md font-semibold text-zinc-500 pb-1 line-through">₹199</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-gray-600 text-sm font-medium">
                      for <span className="font-semibold">{item.duration} {item.unit}</span>
                    </p>
                  </div>

                  <p className="text-red-500 leading-snug">
                    {item.stock > 0 ? `${item.stock} items left at this price!` : 'Item left at this price!'}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Buy Now Button */}
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={handlePayment}
                    >
                      Buy Now
                    </Button>

                    {/* Remove from Cart Button */}
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove Item
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <p className="md:text-2xl text-gray-800 poppins-light text-xl">Your don't have favourite product yet 🥹</p>
            <img
              src="https://via.placeholder.com/150"
              alt="Empty Cart"
              className="mt-4 rounded-full"
            />
          </div>
        )}
      </div>
   
    </div>
  );
};

export default Cart;
