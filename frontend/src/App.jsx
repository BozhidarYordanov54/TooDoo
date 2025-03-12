import { BrowserRouter, Routes, Route } from 'react-router';

// App components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/home/Home";

// Auth components
import Login from "./components/auth/Login";

export default function App() {
  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='auth/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>


      <Footer />
    </>
  );
}
