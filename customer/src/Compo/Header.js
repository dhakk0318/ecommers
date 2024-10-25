import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Header({ isSidebarOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/subcategories/search/${searchQuery}`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setSubcategories([]);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`bg-gray-50 transition-all ${
        isSidebarOpen ? "backdrop-blur-lg" : ""
      }`}
    >
      <header className={`bg-gray-900 text-white sticky top-0 z-50 transition-all`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://www.tnplab.in/_next/static/media/tnplablogo.6e39ec8f.svg"
                alt="TNP Logo"
                className="h-10"
              />
              <button className="lg:hidden">
                <span className="text-white">Menu</span>
              </button>
            </div>
            <div className="flex-1 mx-4 flex justify-center">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search categories"
                  className="w-full py-2 px-4 pr-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleSearch}
                />
              </div>
            </div>
            <div className="flex items-center space-x-6 relative">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="hidden lg:flex items-center space-x-1 hover:text-blue-400 transition"
                >
                  <span className="text-sm">👨‍💼 Account</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {isLoggedIn ? (
                        <>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Orders
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Wishlist
                          </button>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <Link to="/login" className="hover:text-gray-300">
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sign In
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button className="hidden lg:flex items-center space-x-1 hover:text-blue-400 transition">
                <span className="text-sm">🔔 Notifications</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-400 transition">
                <span className="text-sm font-semibold">🛒 Cart</span>
              </button>
            </div>
          </div>

          {subcategories.length > 0 && searchQuery.trim() !== "" && (
            <div className="absolute bg-white text-black rounded-lg shadow-lg p-4 max-w-xl mx-auto left-0 right-0 top-full mt-2 z-50">
              <div className="space-y-2">
                {subcategories.map((sub, index) => (
                  <div
                    key={index}
                    className="py-1 px-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    ⌕ {sub.subcat_name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
