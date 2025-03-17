import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const refreshTokenURL = "http://localhost:5058/api/authentication/refreshToken";

export default function PrivateRoute({ children }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(null);
    const { token, refreshToken, handleLogout } = useAuth();

    useEffect(() => {
        const validateToken = async () => {

            if(!token){
                setIsTokenValid(false);
                return;
            }

            try{
                const decodedToken = jwtDecode(token);
                const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime();
                
                if(isTokenExpired){
                    await getNewToken();
                } else {
                    setIsTokenValid(true);
                }
            }
            catch(error){
                setIsTokenValid(false);
                handleLogout();
                console.log(error);
            }
        }

        const getNewToken = async () => {
            setIsRefreshing(true);

            try {
                const response = await axios.post(refreshTokenURL,
                    {
                        token: token,
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
                handleLogout();
                console.log(error);
            } finally {
                setIsRefreshing(false);
            }
        }
        
        validateToken();
       
    }, [refreshToken, token]);

    if (isRefreshing) {
        return <p>Refreshing token...</p>;
    }

    if(isTokenValid === null){
        return <p>Checking token...</p>;
    }

    return isTokenValid ? children : <Navigate to="/auth/login" />;
}
