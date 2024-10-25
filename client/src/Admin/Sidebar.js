import { Link } from "react-router-dom"; 
import { useState } from "react";
import logo from "../Assets/logo.png";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`bg-white   flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } md:w-64`}
    >
      <div className="p-3 flex justify-between items-center">
        <div className="flex w-full">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-36 object-cover rounded-md opacity-75"
          />
        </div>
        <button onClick={handleToggle} className="p-2 md:hidden">
          {sidebarOpen ? "✖️" : "☰"}
        </button>
      </div>
      <nav className="flex-1">
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="home">🏠</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Home</span>
        </Link>
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="dashboard">🖥️</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Dashboard</span>
        </Link>
        <Link
          to="/user-management"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
        >
          <span role="img" aria-label="users">👨🏻‍💻</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Users</span>
        </Link>
        <Link
          to="/categories"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="categories">🔖</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Categories</span>
        </Link>
        <Link
          to="/subcategories"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="subcategories">🗒️</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Subcategories</span>
        </Link>
        <Link
          to="/retailers"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="retailers">🛍</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Retailers</span>
        </Link>
        <Link
          to="/products"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="products">📋</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Product List</span>
        </Link>
        <Link
          to="/offers"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="offers">🎉</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Offers</span>
        </Link>
        
        <Link
          to="/settings"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <span role="img" aria-label="settings">🛠️</span>
          <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
