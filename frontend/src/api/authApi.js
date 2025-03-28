import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { axiosPrivate } from "./axios";

const registerBaseURL = "/api/auth/register";
const loginBaseURL = "/api/auth/login";
const refreshTokenBaseURL = "api/auth/refreshToken";

export const useRegister = () => {
    const register = async (username, firstName, lastName, email, password, confirmPassword) => {
        try {
            const response = await axios.post(
                registerBaseURL,
                { username, firstName, lastName, email, password, confirmPassword },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                return response;
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
        try {
            const response = await axiosPrivate.post(loginBaseURL,
                { username, password },
                { headers: { "Content-Type": "application/json" } },
                { signal: abortController.signal })

            if (response.status === 200) {
                return response;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => abortController.abort();
    }, []);

    return {
        login,
    }
}

export const useLogout = () => {
    const logout = async () => {
        try {
            const response = await axiosPrivate.post('api/auth/logout');
            if (response.status === 200) {
                console.log(response);
            }

            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    return{
        logout,
    }
}

export const useRefreshToken = () => {
    const getNewToken = async () => {
        try {
            const response = await axiosPrivate.post(refreshTokenBaseURL);

            if (response.status === 200) {
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


