import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from './pages/Home';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from './components/Navbar';
import AuthWrapper from './components/AuthWrapper';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';
import SearchResults from "./pages/SearchResults";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import AllProductsAdmin from "./pages/AllProductsAdmin"
import PrivateAdminRoute from "./pages/PrivateAdminRoute";
import AllOrdersAdmin from "./pages/AllOrdersAdmin";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", updateToken);
    return () => window.removeEventListener("storage", updateToken);
  }, []);

  return (
    <Router>
      <InnerApp token={token} role={role} />
    </Router>
  );
};

const InnerApp = ({ token, role }) => {
  const location = useLocation();
  const hideFooterNavbarRoutes = ["/login", "/register"];
  const hideLayout = hideFooterNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && token && <Navbar />}
      <Routes>
        {/* Redirect to register if not logged in */}
        <Route path="/" element={!token ? <Navigate to="/register" /> : <Home />} />
        <Route path="/register" element={<AuthWrapper><Register /></AuthWrapper>} />
        <Route path="/login" element={<AuthWrapper><Login /></AuthWrapper>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AllProductsAdmin />} />
        <Route path="/admin/orders" element={<AllOrdersAdmin />} />
        <Route path="/admin" element={<PrivateAdminRoute> <AdminDashboard /></PrivateAdminRoute>} />

        <Route path="/products" element={token ? <Products /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/chechout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/category/:name" element={token ? <CategoryProducts /> : <Navigate to="/login" />} />
        <Route path="/products/:id" element={token ? <ProductDetail /> : <Navigate to="/login" />} />
      </Routes>
    {!hideLayout && token && <Footer/>}
    </>
  );
};

export default App;
