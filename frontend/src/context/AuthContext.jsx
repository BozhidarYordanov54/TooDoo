import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(
    {
        username: '',
        token: '',
        refreshToken: '',
        handleLogin: () => { },
        handleRegister: () => { },
        handleLogout: () => { },
        handleRefreshToken: () => { },
    }
);

export function useAuth(){
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser({ data });
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}