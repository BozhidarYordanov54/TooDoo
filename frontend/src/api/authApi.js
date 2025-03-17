import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loginBaseURL = "http://localhost:5058/api/authentication/login";
const refreshTokenBaseURL = "http://localhost:5058/api/authentication/refreshToken";

export const useRegister = () => {
    const register = async (username, password, confirmPassword) => {
        try {
            const response = await axios.post(
                loginBaseURL,
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
}

export const useLogin = () => {
    const abortController = new AbortController();
    const login = async (username, password) => {
        try{
            const response = await axios.post(loginBaseURL, 
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
