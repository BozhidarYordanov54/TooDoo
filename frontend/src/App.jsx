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
import Members from './components/board/Members';

export default function App() {
    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='auth/login' element={<Login />} />
                <Route path='auth/register' element={<Register />} />
                <Route path='user/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path='board/members/:boardID' element={<PrivateRoute><Members /></PrivateRoute>} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}
