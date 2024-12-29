import { createContext, useState } from "react";


export const paymentContext = createContext()



export const PaymentProvider = ({children}) => {
   
    const [payment, setPayment] = useState(false);
    return (
        <paymentContext.Provider value={{payment, setPayment}}>
            {children}
        </paymentContext.Provider>
    )
}