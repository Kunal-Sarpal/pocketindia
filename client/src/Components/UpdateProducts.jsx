// import React, { useEffect, useState } from 'react';
// import {
//     Box,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Paper,
//     TextField,
// } from '@mui/material';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';


// const UpdateProducts = () => {
//     const [update,setUpdate] = useState(false)
//     const [updateData,setUpdateData] = useState({
//         title:'',
//         price:'',
//         stock:'',
//     })
//     const [orders, setOrders] = useState([
     
//     ]);
//     const getData = ()=>{
//         axios.get('https://api.pocketindia.shop/products')
//         .then(res=>{
//             setOrders(res.data)
//         })
//     }
//     const handleDelete = async (id)=>{
//         try{
//         const del = await axios.post(`https://api.pocketindia.shop/api/v1/admin/pocket/product/delete?id=${id}`,null,{
//             headers:{
//                 'Authorization':localStorage.getItem('token')
//             }
//         });
//          if(!del){
//             return toast.error(del.data?.message || "Error while deleting")
//          }
//          else{
//              toast.success(del.data?.message || "Deleted Successfully")

//          }

         
//         }
//         catch(err){
//             toast.error(err+" Error while deleting")
//         }
        
            
//     }
//     const handleUpdate = async (id)=>{
//         const res = await axios.post(`http://api.pocketindia.shop/api/v1/admin/pocket/product/update?id=${id}`, updateData, {
//             headers: {
//                 'Authorization': localStorage.getItem('token')
//             }
//         });
//         console.log(res)
//         if (res.data.msg === "Product updated successfully") {
//             toast.success("Product updated successfully")
//         } else {
//             toast.info('Product is up-to-date')
//         }
//         setUpdateData(() => ({
//             title: "",
//             price: "",
//             stick: ""
//         }))
//     }
//     useEffect(()=>{
//         getData()
//     },[])

    

//     // Handle cell change
//     const handleCellChange = async (e, rowIndex, column) => {
        
//         try{

//             const updatedOrders = [...orders];
//             updatedOrders[rowIndex][column] = e.target.value;
           
//             if (column == 'title') {
//                 setUpdateData((prev) => ({
//                     ...prev,
//                     title: e.target.value
//                 }))
//             }
//             if (column == 'price') {
//                 setUpdateData((prev) => ({
//                     ...prev,
//                     price: e.target.value
//                 }))
//             }
//             if (column == 'stock') {
//                 setUpdateData((prev) => ({
//                     ...prev,
//                     stock: e.target.value
//                 }))
//             }
           
//         }
//         catch(err){
//             toast.error('Product not updated' + err)
//         }
       
//     };

//     // Update the backend (example)
//     const updateBackend = async (orderId, updatedData) => {
//         try {
//             const response = await fetch(`http://your-api-url.com/orders/${orderId}`, {
//                 method: 'PUT', // or PATCH depending on your backend
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updatedData),
//             });
//             const result = await response.json();
//             console.log('Order updated:', result);
//         } catch (error) {
//             console.error('Error updating order:', error);
//         }
//     };

//     // Handle update on blur (when the user clicks out of the input field)
//     const handleBlur = (orderId, rowIndex) => {
//         const updatedData = orders[rowIndex];
//         updateBackend(orderId, updatedData);
//     };

//     return (
//         <>
//         <ToastContainer autoClose={1200} />
//         <div className="bg-white p-5 shadow-md">
//             <h1 className="text-3xl w-fit font-extrabold text-zinc-700 mb-5">
//                 Update Orders
//                 <hr className="mt-2 mb-4" />
//             </h1>
//             <div className='width'></div>

//             {/* Editable Orders Table */}
//             <TableContainer component={Paper} sx={{ borderRadius: 1, overflow: 'hidden' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                             <TableCell>Order ID</TableCell>
//                             <TableCell>Product</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Stock</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {orders.map((order, rowIndex) => (
//                             <TableRow key={order._id} hover>
//                                 <TableCell>{order._id}</TableCell>
//                                 <TableCell>
//                                         <TextField
//                                             value={order.title}
//                                             onChange={(e) => handleCellChange(e, rowIndex, 'title')}
//                                             size="small"
//                                             fullWidth
//                                             type="string"

//                                         />
//                                 </TableCell>
//                                 {/* <TableCell>{order.}</TableCell> */}
//                                 <TableCell>
//                                     <TextField
//                                         value={order.price}
//                                         onChange={(e) => handleCellChange(e, rowIndex, 'price')}
                                       
//                                         size="small"
//                                         fullWidth
//                                         type="number"
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <TextField
//                                         value={order.stock}
//                                         onChange={(e) => handleCellChange(e, rowIndex, 'stock')}
                                       
//                                         size="small"
//                                         fullWidth
//                                         type="number"
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="outlined"
//                                         color="error"
//                                         size="small"
                                        
//                                         onClick={() => handleDelete(order._id)} // Placeholder for delete
//                                         sx={{
//                                             textTransform: 'none',
//                                             '&:hover': { backgroundColor: '#ffebee' },
//                                         }}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="outlined"
//                                         color="success"
//                                         size="small"
//                                         onClick={() => handleUpdate(order._id)} // Placeholder for delete
//                                         sx={{
                                            
//                                             textTransform: 'none',
//                                             '&:hover': { backgroundColor: '#fefefe' },
//                                         }}
//                                     >
//                                         Update
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
        
//         </>
//     );
// };

// export default UpdateProducts;
import React from 'react'

const UpdateProducts = () => {
  return (
    <div>UpdateProducts</div>
  )
}

export default UpdateProducts
