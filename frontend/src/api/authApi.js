import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "./axios";

const registerBaseURL = "api/auth/register";
const loginBaseURL = "/api/auth/login";
const refreshTokenBaseURL = "api/auth/refreshToken";

export const useRefreshToken = () => {
    const getNewToken = async () => {
        try {
            const response = await axiosPrivate.post(refreshTokenBaseURL);

            if(response.status === 200){
                console.log(response);
                return response;
            }
        } catch (error) {
        }
    };

    return {
        getNewToken,
    };
}

export const useRegister = () => {
    const register = async (username, password, confirmPassword) => {
        try {
            const response = await axios.post(
                registerBaseURL,
                { username, password, confirmPassword },
                { headers: { "Content-Type": "application/json" } }
            );

            if(response.status === 200){
                useLogin(username, password);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        register,
    };
}

export const useLogin = () => {
    const abortController = new AbortController();
    const login = async (username, password) => {
        try{
            const response = await axiosPrivate.post(loginBaseURL, 
                { username, password },
                { headers: { "Content-Type": "application/json" } },
                { signal: abortController.signal })

            if(response.status === 200){
                return response;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        return () => abortController.abort();
    }, []);

    return{
        login,
    }
}


