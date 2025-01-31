import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Shop from "./pages/Shop";
import Index from "./pages/Index";
import Nav from "./components/Nav";
import Owner from "./pages/Owner";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Orders from "./pages/Orders";
import CreatedProduct from "./pages/CreatedProduct";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import Notfound from "./components/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerProtect from "./components/ownerProtect";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Footer from "./components/Footer"; // Import Footer
import LogAbout from "./components/LogAbout";
import LogContact from "./components/LogContact";
import AdminOrders from "./pages/AdminOrders";
import BookInfo from "./pages/BookInfo";
import Info from "./pages/Info";
import ForgetPassword from "./pages/ForgetPassword";
import  ResetPassword from "./pages/ResetPassword"

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = (token) => {
    dispatch(login(token));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Define paths where Nav should be displayed
  const navPaths = ["/about", "/owner", "/cart", "/shop" , "/contact", "/orders" , "/info"];

  return (
    <div>
      {/* Render Nav only if the current path is in navPaths */}
      {navPaths.includes(location.pathname) && <Nav />}

      <Routes>
        {/* Define the Index route */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<LogAbout />} />
        <Route path="/contactus" element={<LogContact />} />
        <Route path="/login" element={<Index/>} />
        <Route path="/404" element={<Notfound />} />
        <Route path="/bookinfo" element={<BookInfo />} />
        <Route path="/login/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        

        {/* Protected routes */}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
           <About/>
          </ProtectedRoute>
        }
        />
        <Route
          path="/info"
          element={
            <ProtectedRoute>
           <Info/>
          </ProtectedRoute>
        } />
         <Route
          path="/contact"
          element={
              <Contact />
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
         <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
         <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/owner" element={ <Owner />}/>
        <Route path="/create" element={<OwnerProtect element={<CreatedProduct />} />} />
        <Route path="/allorders" element={<OwnerProtect element={<AdminOrders />} />} />
        
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
