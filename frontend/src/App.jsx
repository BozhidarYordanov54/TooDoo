import { BrowserRouter, Routes, Route } from 'react-router';

// App components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/home/Home";

import Profile from './components/User/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

// Auth components
import Login from "./components/auth/Login";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='auth/login' element={<Login/>}/>
          <Route path='user/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}
