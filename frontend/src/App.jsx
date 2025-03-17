import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

// App components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import Error404 from './components/common/Error404';

import Profile from './components/User/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

// Auth components
import Login from "./components/auth/Login";

export default function App() {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? { token } : null;
    });

    const handleLogin = () => {
        const token = localStorage.getItem("token");
        setUser({ token });
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
    }

    return (
        <>
            <Header user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='auth/login' element={<Login onLogin={handleLogin} />} />
                <Route path='user/profile' element={<PrivateRoute onInvalidToken={handleLogout}><Profile /></PrivateRoute>} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </>
    );
}
