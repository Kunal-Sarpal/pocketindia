import axios from "axios"
import { addData, getData } from "../reducers/dataReducer";

export const asyncGetProducts = () => async (dispatch) =>{
     
    try{
        const response = await axios.get("http://145.223.19.43:3000/products"); 
        dispatch(getData(response.data))
    }
    catch(error){
        console.log(error)  
    }
}

export const asyncCreateProducts = (data) => async (dispatch) =>{
    console.log(localStorage.getItem("token"));

     
    try{
        await axios.post("http://145.223.19.43:3000/api/v1/admin/pocket/product/create",data,
        {headers:{
            "Authorization": `${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }}
        ); 
        console.log(data)
        dispatch(addData(data))
    }
    catch(error){
        console.log(error)  
    }
}

