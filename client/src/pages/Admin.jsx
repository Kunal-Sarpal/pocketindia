import React from 'react';
import AddProduct from '../Components/AddProduct';
import ManageOrders from '../Components/ManageOrders';
import UpdateProducts from '../Components/UpdateProducts';

const Admin = () => {
    return (
        
        <div className="min-h-screen w-full flex flex-col bg-gray-100">
            {/* Upper Section */}
            <div className="w-full flex flex-wrap lg:flex-nowrap justify-between p-4 lg:p-8 gap-4 lg:gap-6">
                {/* Product Upload Section */}
                <section className="w-full lg:w-1/3 bg-white  shadow border border-zinc-400 rounded-md p-4 lg:p-6">
                    
                    <AddProduct />
                </section>

                {/* Order Management Section */}
                <div className=' overflow-x-auto h-[63vh]'>

                <section className="w-full lg:flex-1 bg-white border border-zinc-400 shadow rounded-md p-4 lg:p-6 min-w-[900px] overflow-x-auto">
                    <ManageOrders />
                </section>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="w-full flex flex-wrap lg:flex-nowrap overflow-x-auto border-t border-gray-300 p-4 lg:p-8 gap-4 lg:gap-6">
                {/* Update Products Section */}
                <section className="w-full lg:flex-1 bg-white border border-gray-300 shadow-lg rounded-md p-4 lg:p-6 min-w-[900px]">
                    <UpdateProducts />
                </section>
            </div>
        </div>
    );
};

export default Admin;
