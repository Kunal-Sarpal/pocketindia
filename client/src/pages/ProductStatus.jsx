import { useEffect, useState } from 'react';
import OrderCard from '../Components/OrderCard';
import { OrderProducts } from '../store/actions/Productaction';



const ProductStatus = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await OrderProducts();
            console.log(data)
            setData(orders.products);
        };
        fetchOrders();
    }, []);
    return (
        <div className="h-screen bg-gray-100  flex p-5 ">
            <div className=" w-1/2 flex flex-col  gap-1   p-6 space-y-6 bg-white  ">
                <h1 className='text-3xl font-extrabold  text-gray-700'>Orders</h1>
                {data.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded shadow flex flex-col md:flex-row items-center md:items-start p-6 gap-6"
                    >
                        <img
                            src={order.image}
                            alt={order.title}
                            className="w-36 h-36 object-fill rounded-lg border shadow shadow-red-100"
                        />
                        <div className="flex-1 space-y-1">
                            <h2 className="text-lg font-extrabold text-gray-700">{order.title}</h2>
                            <p className="text-sm font-semibold text-gray-500">Order  ID: {order._id}</p>
                       
                            <p className="text-sm font-semibold text-gray-500">Quantity: 1</p>
                            <p className="text-sm font-semibold text-gray-500">Lorem ipsum dolor sit.</p>
                            <p className="text-sm font-extrabold  text-gray-600 mt-1">Price: ₹{order.price.toFixed(2)}</p>
                        </div>
                        <button className="border-red-300  hover:shadow-sm border text-red-500 text-xs   px-4 py-2 rounded font-semibold">
                            Track Order
                        </button>
                    </div>
                ))}
                <h1 className='w-10 h-10 border-zinc-500 rounded-full animate-spin border-2 border-t-gray-100'></h1>
            </div>

            <div className='w-1/2 h-screen border-2 p-5 bg-white'>
                <h1 className='text-3xl font-extrabold text-gray-700'>Order Details</h1>
                <OrderCard/>
            </div>
        </div>
    );
};

export default ProductStatus;
