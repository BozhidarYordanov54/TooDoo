import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

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

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axiosPrivate.get("api/auth/checkAuth");

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }

        checkAuthStatus();
    }, [isAuthenticated]);

    const handleRegister = (userData) => {
        // Implement registration logic here
        console.log("Registering user:", userData);
    };

    const handleLogin = (credentials) => {
        // Implement login logic here
        console.log("Logging in with credentials:", credentials);
        setIsAuthenticated(true);
        navigate("/dashboard");

    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logging out");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleRegister, handleLogin, handleLogout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}