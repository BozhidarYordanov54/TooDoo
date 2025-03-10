import { Route, Routes } from "react-router-dom";

// App components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/home/Home";

function App() {
  return (
    <>
      <Header />

      <Home />

      <Footer />
    </>
  );
}

export default App;