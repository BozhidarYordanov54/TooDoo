import { useState } from 'react';
import { Routes, Route } from 'react-router';

// App components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import Error404 from './components/common/Error404';
import { AuthContext } from './context/AuthContext';

import Profile from './components/User/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

// Auth components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

export default function App() {
    const [authData, setAuthData] = useState({});

    const handleLogin = (authData) => {
        console.log(authData);
        console.log(authData.data);
        setAuthData({username: authData.data.username, token: authData.data.token, refreshToken: authData.data.refreshToken});
    }

    const handleLogout = () => {
        setAuthData({});
    }

    return (
        <>
            <AuthContext.Provider value={{...authData, handleLogin, handleLogout}}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='auth/login' element={<Login />} />
                    <Route path='auth/register' element={<Register />} />
                    <Route path='user/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
                <Footer />
            </AuthContext.Provider>
        </>
    );
}
