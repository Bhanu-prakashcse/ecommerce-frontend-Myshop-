import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/register");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🛍️ MyShop</h2>
{/*       
      {token && (
        // <form className="search-form" onSubmit={handleSearch}>
        //   <input
        //     type="text"
        //     placeholder="Search products..."
        //     value={searchTerm}
        //     onChange={(e) => setSearchTerm(e.target.value)}
        //   />
        //   <button type="submit">🔍</button>
        // </form>
      )} */}

      <ul>
       
        {token && (
          <li>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">🔍</button>
            </form>
          </li>
        )}
         <li><Link to="/">Home</Link></li>
         <Link to="/about">About</Link>


        {token ? (
          <>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            {/* {role === "ADMIN" && (
              <li><Link to="/api/products/add/admin">Add Product</Link></li>
            )} */}
            <Link to="/contact">Contact Us</Link>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
