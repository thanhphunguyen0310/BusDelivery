import axios from "axios";
import { BASE_URL, handleApiError } from "./axiosClient";

export const loginUser = async (email, password) => {
    try{
        const { data } = await axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
        .post("/api/v1/Authentication/LoginAsync", {
            email,
            password
        });
        return {
            error: null,
            data: data
        }
    }catch(e){
        return handleApiError(e);
    }
}

export const getUsers = async () => {
    try{
        const { data } = await axiosClient.get("/users");
        return {
            error: null,
            data: data
        }
    }catch(e){
        return handleApiError(e);
    }
}