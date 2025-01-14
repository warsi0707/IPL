import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Accessories from "./components/Accessories";
import Navbar from "./components/Navbar";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { AuthProvider } from "./context/AuthProvider";
import Cart from "./components/Cart";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Accessories />} />
            <Route path="/item/:id" element={<Detail />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
        <Footer />
      </Router>
    </>
  );
}

export default App;
