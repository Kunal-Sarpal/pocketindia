import { useEffect, useState } from 'react';
import OrderCard from '../Components/OrderCard';
import { HandleDelveryStatus, OrderProducts } from '../store/actions/Productaction';
import { toast, ToastContainer } from 'react-toastify';

const ProductStatus = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await OrderProducts();
      console.log(res.orders);
      if (res.errorMessage) {
        toast.error("Something went wrong while fetching orders");
        return;
      }
      toast.success("Customer Orders fetched successfully");
      setData(res.orders);
    };
    fetchOrders();
  }, []);

  async function CheckStatus(orderId) {
    const res = confirm("Are you sure you want to update the order as delivered?");
    if (res) {
      try {
        const response = await HandleDelveryStatus(orderId);
        if (response.errorMessage) {
          toast.error(response.errorMessage);
          return;
        }
        toast.info(response.message);

        // Optionally, remove the delivered order from list
        setData(prev => prev.filter(order => order._id !== orderId));

      } catch (error) {
        console.error("Error updating order status:", error);
        toast.error("Failed to update order status. Please try again.");
      }
    } else {
      alert("Cancelled");
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="h-screen bg-gray-100 flex p-5">
        {/* Left side - Orders */}
        <div className="w-1/2 flex flex-col gap-1 p-6 space-y-6 bg-white">
          <h1 className="text-3xl font-extrabold text-gray-700">Orders</h1>

          {data.length > 0 ? (
            data.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded shadow flex flex-col md:flex-row items-center md:items-start p-6 gap-6"
              >
                <img
                  src={order.productId.image}
                  alt={order.productId.title}
                  className="w-36 h-36 object-fill rounded-lg border shadow shadow-red-100"
                />
                <div className="flex-1 space-y-1">
                  <h2 className="text-lg font-extrabold text-gray-700">{order.productId.title}</h2>
                  <p className="text-sm font-semibold text-gray-500">Order ID: {order._id}</p>
                  <p className="text-sm font-semibold text-gray-500">Product ID: {order.productId._id}</p>
                  <p className="text-sm font-semibold text-gray-500">Quantity: 1</p>
                  <p className="text-sm font-extrabold text-gray-600 mt-1">Price: ₹{order.productId.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => CheckStatus(order._id)}
                  className="border-red-300 hover:shadow-sm border text-red-500 text-xs px-4 py-2 rounded font-semibold"
                >
                  Order deliver ho gaya hai?
                </button>
              </div>
            ))
          ) : (
            <div className="w-10 h-10 border-zinc-500 rounded-full animate-spin border-2 border-t-gray-100 mx-auto mt-10"></div>
          )}
        </div>

        {/* Right side - Order Details */}
        <div className="w-1/2 h-screen border-2 p-5 bg-white">
          <h1 className="text-3xl font-extrabold text-gray-700">Order Details</h1>
          <OrderCard />
        </div>
      </div>
    </>
  );
};

export default ProductStatus;
