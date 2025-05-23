import axios from "axios";
import { addData, getData } from "../reducers/dataReducer";
import { toast } from "react-toastify";

// Axios instance
const axiosInstance = axios.create({
    baseURL: "https://api.pocketindia.shop/api/v1/",
});

// ========== CUSTOMER ==========

export const asyncGetProducts = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/customer/products");
        dispatch(getData(response.data));
    } catch (error) {
        console.error("Error fetching products:", error?.response?.data || error.message);
    }
};

export const handlePayment = async (data) => {
    const payload = {
        upiTransactionId: data.formData.upiTransactionId,
    
    };

    try {
        const response = await axiosInstance.post(`/customer/order?id=${data.id}`, payload,{
            headers: {
                authorization : localStorage.getItem('token'),
            }
        });
        return response.data;
    } catch (error) {
        // console.log(error);

        console.error("Error handling payment:", error);
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        toast.error(`${error.response.data.message == "Auth token is not supplied" ? "You are not logged in" : error.response.data.message}`);
        return {errorMessage, statusCode};
    }
};

export const SignUpCustomer = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/customer/signup", data);
        return response.data;
    } catch (error) {

        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return {statusCode:statusCode, errorMessage:errorMessage}
    }
};

// ========== AGENT ==========

export const SignUpAgent = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/agent/signup", data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return { statusCode: statusCode, errorMessage: errorMessage }
    }
};

// ========== ADMIN ==========

export const loginAdmin = async (data) => {

    try {
        const response = await axiosInstance.post("/admin/register", data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.msg || error.message;
        const statusCode = error.response?.status || 'unknown';
        return {errorMessage,statusCode};
    }
};

export const LoginAgent = async (data) => {

    try {
        const response = await axiosInstance.post("/auth/agent/login", data);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
};

export const LoginCustomer = async (data) => {
    
    try {
        const response = await axiosInstance.post("/auth/customer/login", data);
        localStorage.setItem("token", response.data.token);
 
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
};

export const asyncCreateProducts = (data) => async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. Please log in.");
        return { error: "No token found. Please log in." };
    }

    try {
        const response = await axiosInstance.post("/admin/create/product", data, {
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
        });
        dispatch(addData(data));
        return response.data;
    } catch (error) {
        return { error: error.response.data.message };
    }
};
export const  OrderProducts = async (data) =>{
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }

    try {
        const response = await axiosInstance.get("/customer/order/products", {
            headers: {
                authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
};
export const HandleOrders = async () => {

    try {
        const response = await axiosInstance.get("/admin/get/orders", {
            headers: {
                authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
};

export const GetAgents = async () => {
    console.log("call");
    try {
        const response = await axiosInstance.get("/admin/get/agents", {
            headers: {
                authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.log("In error")
        const errorMessage = error.response?.data?.message || error.message;
        console.log(error)

        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
}
export const AssignAgent = async (agentId,orderId) => {
    try {
    console.log("call");
    const payload = {
        agentId: agentId,
        orderId: orderId
    }
        const response = await axiosInstance.post("/admin/assign/agent",payload, {
            headers: {
                authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.log("In error")
        const errorMessage = error.response?.data?.message || error.message;
        console.log(error)

        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
}
export const  CheckStatus = async (orderId) => {
    console.log("call");
    console.log(orderId);

    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }
        

        const response = await axiosInstance.get(`/admin/get/order/status?orderId=${orderId}`, {

            headers: {
                authorization:token,
                "Content-Type": "application/json",
            },
        });
        console.log(response.data)
        return response.data;
    }catch (error) {
        console.log(error)
        const errorMessage = error.response?.data?.message || error.message;
        // console.log(errorMessage)

        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
}
export const  HandleDelveryStatus = async (orderId) => {
    console.log("call");
    console.log(orderId);

    try{
        
        const response = await axiosInstance.post(`/agent/delivery?orderId=${orderId}`,{}, {
            headers: {
                Authorization:localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        console.log(response.data)
        return response.data;
    }catch (error) {
        console.log(error)
        const errorMessage = error.response?.data?.message || error.message;
        console.log(errorMessage)
        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
}


