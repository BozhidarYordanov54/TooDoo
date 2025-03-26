import { useState } from 'react';
import { Routes, Route } from 'react-router';

// App components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import Error404 from './components/common/Error404';
import AuthProvider from './context/AuthContext';

import PrivateRoute from './components/auth/PrivateRoute';

// Auth components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from './components/User/Profile';
import Dashboard from './components/dashboard/Dashboard';

export default function App() {
    // const [authData, setAuthData] = useState({});

    // const handleLogin = (authData) => {
    //     setAuthData({username: authData.data.username, token: authData.data.token, refreshToken: authData.data.refreshToken});
    // }

    // const handleLogout = async () => {
    //     try {
    //         await axiosPrivate.post('/api/auth/logout');
    //         setAuthData({});
    //     } catch (error) {
    //         console.error("Logout failed", error);
    //     }
    // }

    // const handleRefreshToken = (token, refreshToken) => {
    //     setAuthData({token: token, refreshToken: refreshToken});
    // }

    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='auth/login' element={<Login />} />
                <Route path='auth/register' element={<Register />} />
                <Route path='user/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}
