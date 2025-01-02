import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentContext } from '../paymentContext';
import { Button, duration } from '@mui/material';
import Like from './Like';
import { addItemToCart } from '../store/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
addItemToCart

const Card = ({ id, price, title, stock, like,duration,unit,image }) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cartdata.cartItems);
    const { setPayment } = useContext(paymentContext);
    const navigate = useNavigate();
    const [item,setItem] = useState(true);

    const handlePayment = () => {
        // setPayment((prev) => !prev);
        navigate('/payment/' + "" + id);
        
    };

    const handleAddToCart = async () => {
        const item = { id, price, title,stock,image,duration,unit };
        await dispatch(addItemToCart(item));
        
        toast.success('Item added to Fav', {
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 1300,
            // hideProgressBar: true,
            // closeOnClick: true,
            // pauseOnHover: true,
            // draggable: true,
            progress:0,
        })
        
      
    };
    useEffect(()=>{
        if(cartItem.length>0){
            const check = cartItem.find((item)=>item.id===id);
            if(check){
                setItem(false);
            }
        }
    },[cartItem])

    return (
        <div className='w-full h-full'>
            <ToastContainer />
        <div className="shadow-md border border-zinc-300  h-full rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 relative flex justify-between flex-col ">
            {/* Image Section */}
            <div className="bg-gray-200 h-full flex items-center justify-center p-2">
                <img
                    src={image}
                    alt="Spotify Premium"
                    className="w-full h-full object-cover scale rounded-md"
                    />
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-4">
                <h2 className="text-2xl font-bold text-zinc-700 truncate">{title}</h2>
                <hr className="border-t border-zinc-300" />

                <div className="flex gap-2 items-center">
                    <p className="text-xl text-zinc-700 font-semibold">₹{price}</p>
                    <p className="text-md font-semibold text-zinc-500 pb-1 line-through">₹199</p>
                    <p className="text-gray-600 text-sm font-medium">
                        for <span className="font-semibold">{duration} {unit}</span>
                    </p> 
                </div>
                
                <p className="text-red-500 leading-snug">
                    {stock > 0 ? `${stock} items left at this price!` : 'Item left at this price!'}
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
                        Buy
                    </Button>

                    {/* Add to Cart Button */}
                    {item && <Button
                        size="small"
                        variant="outlined"
                        onClick={handleAddToCart}
                        >
                        Add to fav
                    </Button>}
                </div>

                {/* Like Component */}
                {/* <span className="absolute border p-2 border-zinc-400 rounded-full bottom-[-20px] right-[-10px] text-xs text-zinc-500 bg-white">
                    <Like initialLikes={like} />
                    </span> */}
            </div>
            <ToastContainer/>
        </div>
        </div>
    );
};

export default Card;
