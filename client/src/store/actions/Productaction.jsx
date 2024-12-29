import axios from "axios"
import { addData, getData } from "../reducers/dataReducer";

const axiosInstance = axios.create({
    baseURL: "https://www.pocketindia.shop",
});

export const asyncGetProducts = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/products");
        dispatch(getData(response.data));
    } catch (error) {
        console.error("Error fetching products:", error?.response?.data || error.message);
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

