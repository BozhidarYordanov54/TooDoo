import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";
import { useRefreshToken } from "../../api/authApi";

export default function PrivateRoute({ children }) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(null);
    const { token, refreshToken, handleLogout, handleRefreshToken } = useAuth();
    const { getNewToken } = useRefreshToken();

    useEffect(() => {
        const validateToken = async () => {

            if (!token) {
                setIsTokenValid(false);
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime();

                if (isTokenExpired) {
                    setIsRefreshing(true);
                    const data = await getNewToken(token, refreshToken);
                        handleRefreshToken(data.data.token, data.data.refreshToken);
                        setIsTokenValid(true);
                        setIsRefreshing(false);
                } else {
                    setIsTokenValid(true);
                }
            }
            catch (error) {
                setIsTokenValid(false);
                handleLogout();
                console.log(error);
            }
        }

        validateToken();

    }, [refreshToken, token]);

    if (isRefreshing) {
        return <p>Refreshing token...</p>;
    }

    if (isTokenValid === null) {
        return <p>Checking token...</p>;
    }

    return isTokenValid ? children : <Navigate to="/auth/login" />;
}
