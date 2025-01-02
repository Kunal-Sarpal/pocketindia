import axios from "axios"
import { addData, getData } from "../reducers/dataReducer";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "https://api.pocketindia.shop",
});

export const asyncGetProducts = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/products");
        dispatch(getData(response.data));
    } catch (error) {
        console.error("Error fetching products:", error?.response?.data || error.message);
    }
};

export const loginAdmin = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/admin/pocket/register", data);
        // localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        // console.error('Error while logging in:', error);
        if (error.response) {
            // console.log('API error response:', error.response.data);
        }
        return "Authentication failed";
    }
}

export const handlePayment = async (data) => {
    const obj = {
        id: data.id,
        upiTransactionId: data.formData.upiTransactionId,
        email: data.formData.email,
        phone: data.formData.phoneNumber
    };

    console.log("Sending payment data:", obj);

    try {
        const response = await axiosInstance.post("/user/buy", obj);
        console.log("Payment response:", response);
        return response.data;
    } catch (error) {
        // Log the entire error response
        console.error("Error details:", error);
        const errorMessage = error.response?.data?.message || error.message;
        const statusCode = error.response?.status || 'unknown';
        console.error(`Error (${statusCode}):`, errorMessage);

        // Display the error to the user
        toast.error(`Payment failed: ${errorMessage}`);
        throw new Error(`Payment failed: ${errorMessage}`);
    }
};


export const asyncCreateProducts = (data) => async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }
    try {
        await axiosInstance.post(
            "/api/v1/admin/pocket/product/create",
            data,
            {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch(addData(data));
    } catch (error) {
        console.error("Error creating product:", error?.response?.data || error.message);
    }
};

