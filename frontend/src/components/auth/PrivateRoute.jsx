import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const refreshTokenURL = "http://localhost:5058/api/authentication/refreshToken";

export default function PrivateRoute({ onInvalidToken, children }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setIsTokenValid(false);
                return;
            }

            try{
                const decodedToken = jwtDecode(token);
                const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime();
                
                if(isTokenExpired){
                    await refreshToken();
                } else {
                    setIsTokenValid(true);
                }
            }
            catch(error){
                setIsTokenValid(false);
                onInvalidToken();
                console.log(error);
            }
        }

        const refreshToken = async () => {
            setIsRefreshing(true);
            const refreshToken = localStorage.getItem("refreshToken");

            try {
                const response = await axios.post(refreshTokenURL,
                    {
                        token: localStorage.getItem("token"),
                        refreshToken: refreshToken
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                if (response.status === 200) {
                    const data = await response.data;
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    setIsTokenValid(true);
                }
            }
            catch (error) {
                setIsTokenValid(false);
                onInvalidToken();
                console.log(error);
            } finally {
                setIsRefreshing(false);
            }
        }
        
        validateToken();
       
    }, [onInvalidToken]);

    if (isRefreshing) {
        return <p>Refreshing token...</p>;
    }

    if(isTokenValid === null){
        return <p>Checking token...</p>;
    }

    return isTokenValid ? children : <Navigate to="/auth/login" />;
}
