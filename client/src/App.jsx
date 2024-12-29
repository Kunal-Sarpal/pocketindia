import React from 'react'
import Homepage from './pages/Homepage'
import { PaymentProvider } from './paymentContext'
import Admin from './pages/Admin'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Payment from './Components/Payment'

const App = () => {


  return (
    <PaymentProvider>

      <div className=' transition-all ease-in-out duration-300 select-none '>
        
        <Routes>
       
          <Route path='/' element={<Homepage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </div>

    </PaymentProvider>
  )
}

export default App