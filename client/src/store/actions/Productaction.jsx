import axios from "axios";
import { addData, getData } from "../reducers/dataReducer";
import { toast } from "react-toastify";

// Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/",
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
        id: data.id,
        upiTransactionId: data.formData.upiTransactionId,
        email: data.formData.email,
        phone: data.formData.phoneNumber,
    };

    try {
        const response = await axiosInstance.post(`/customer/order?id=${data.id}`, payload,{
            headers: {
                authorization : localStorage.getItem('token'),
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);

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
        console.log(error);
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
};

export const LoginCustomer = async (data) => {

    try {
        const response = await axiosInstance.post("/auth/customer/login", data);
        localStorage.setItem("token", response.data.token);
        return response.data;
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
        return;
    }

    try {
        await axiosInstance.post("/admin/create/product", data, {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        });
        dispatch(addData(data));
    } catch (error) {
        console.error("Error creating product:", error?.response?.data || error.message);
    }
};
export const OrderProducts = async (data) =>{
    // const token = localStorage.getItem("token");

    // if (!token) {
    //     console.error("No token found. Please log in.");
    //     return;
    // }

    try {
        const response = await axiosInstance.get("/customer/order/products", {
            headers: {
                authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.log(error)
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        return { errorMessage, statusCode };
    }
};
