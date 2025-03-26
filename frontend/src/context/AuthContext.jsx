import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { useLogout } from "../api/authApi";

export const AuthContext = createContext(
    {
        isAuthenticated: false,
        handleRegister: () => { },
        handleLogin: () => { },
        handleLogout: () => { }
    }
);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { logout } = useLogout();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axiosPrivate.get("api/auth/checkAuth");

                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } finally {
                setIsLoading(false);
            }
        }

        checkAuthStatus();
    }, []);

    const handleRegister = (userData) => {
        // Implement registration logic here
        console.log("Registering user:", userData);
    };

    const handleLogin = (credentials) => {
        // Implement login logic here
        setIsAuthenticated(true);
        navigate("/dashboard");

    };

    const handleLogout = async () => {
        await logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleRegister, handleLogin, handleLogout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}