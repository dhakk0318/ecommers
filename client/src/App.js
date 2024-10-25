 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import Cookies from "js-cookie";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Admin/Dashboard";
import Login from "./Admin/Login";
import UserManagement from "./Components/Pages/UserMangement/UserManagement";
import CategoryManagement from "./Components/Pages/CategoryManagement";
import SubCategoryManagement from "./Components/Pages/SubCategoryManagement";
import RetailerRegistration from "./Components/Pages/RetailerMangment";
import ProductList from "./Components/Pages/ProductList";
import UserProfile from './Components/Pages/Profile';
import Offers from "./Components/Pages/Offers"
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token") || localStorage.getItem("accessToken");
    console.log("Token found in App component:", token);
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove("access_token");
    localStorage.removeItem("accessToken");
    console.log("User logged out and tokens removed.");
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />} />

        {/* Private Routes (only accessible if authenticated) */}
        {isAuthenticated ? (
          <> 
            <Route path="/" element={<Layout onLogout={handleLogout}><Dashboard /></Layout>} />
            <Route path="/user-management" element={<Layout onLogout={handleLogout}><UserManagement /></Layout>} />
            <Route path="/categories" element={<Layout onLogout={handleLogout}><CategoryManagement /></Layout>} />
            <Route path="/subcategories" element={<Layout onLogout={handleLogout}><SubCategoryManagement /></Layout>} />
            <Route path="/retailers" element={<Layout onLogout={handleLogout}><RetailerRegistration /></Layout>} />
            <Route path="/products" element={<Layout onLogout={handleLogout}><ProductList /></Layout>} />
            <Route path="/profile/:userId" element={<Layout onLogout={handleLogout}><UserProfile /></Layout>} />
            <Route path="/offers" element={<Layout onLogout={handleLogout}><Offers /></Layout>} />

          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
