import React from 'react'
import Homepage from './pages/Homepage'
import { PaymentProvider } from './paymentContext'
import Admin from './pages/Admin'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Payment from './Components/Payment'
import AdminLogin from './pages/AdminLogin'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProductStatus from './pages/ProductStatus'

const App = () => {


  return (
    <>
    
    <PaymentProvider>

      <div className=' transition-all ease-in-out duration-300 select-none '>
        
        <Routes>
       
          <Route path='/' element={<Homepage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/status' element={<ProductStatus />} />
          
          <Route path='/cart' element={<Cart />} />
          <Route path='/api/v1/pocket/admin/pocketindia' element={<AdminLogin/>} />
          <Route path='/payment/:id' element={<Payment />} />
        </Routes>
      </div>

    </PaymentProvider>
    </>
  )
}

export default App