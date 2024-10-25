import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useTheme } from "../ThemeContext"; // Import useTheme

export default function Sidebar() {
  const { isDarkMode } = useTheme(); // Use the hook to access the theme
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar open state
  const [menuOpen, setMenuOpen] = useState({
    dashboard: false,
    banking: false,
    order: false,
    trackOrder: false,
    updateProfile: false,
    products: false, // New state for Products section
  });

  const handleToggleMenu = (menu) => {
    setMenuOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`md:hidden fixed top-4 left-4 z-30 p-2 rounded focus:outline-none transition duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar Component */}
      <div
        className={`${
          isDarkMode
            ? "bg-black text-gray-300 border-gray-800"
            : "bg-white text-black border-gray-300"
        } w-64 space-y-6 py-6 px-2 absolute transition duration-200 ease-in-out z-20 h-screen ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 border-r`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-12">
          <span
            className={`text-xl text-black font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            RetailDash👨‍💼
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="search"
            placeholder="Search"
            className={`w-full rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-300 focus:ring-gray-600"
                : "bg-gray-200 border-gray-400 text-black focus:ring-gray-400"
            }`}
          />
          <Search
            className={`absolute left-3 top-2.5 h-4 w-4 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          />
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-2">
          {/* Dashboard Section */}
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className={`w-full text-left block py-2.5 px-4 rounded transition duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-zinc-900"
                  : "text-black hover:text-gray-700 hover:bg-gray-300"
              }`}
            >
              🖥️ Dashboard
            </Link>
          </div>

          {/* Products Section */}
          <div className="space-y-1">
            <button
              onClick={() => handleToggleMenu("products")}
              className={`w-full text-left block py-2.5 px-4 rounded transition duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-zinc-900"
                  : "text-black hover:text-gray-700 hover:bg-gray-300"
              }`}
            >
              🛒 Products
            </button>
            {menuOpen.products && (
              <div className="ml-4 space-y-1">
                <Link
                  to="/products/view"
                  className={`block py-2.5 px-4 rounded transition duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-zinc-900"
                      : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  👁️ View Products
                </Link>
                <Link
                  to="/products/add"
                  className={`block py-2.5 px-4 rounded transition duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-zinc-900"
                      : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  ➕ Add Product
                </Link>
              </div>
            )}
          </div>

          {/* Banking Section */}

          <div className="space-y-1">
            <Link
              to="/banking"
              className={`w-full text-left block py-2.5 px-4 rounded transition duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-zinc-900"
                  : "text-black hover:text-gray-700 hover:bg-gray-300"
              }`}
            >
              🏛️ Banking
            </Link>
          </div>

          {/* Order History Section */}
          <div className="space-y-1">
            <button
              onClick={() => handleToggleMenu("order")}
              className={`w-full text-left block py-2.5 px-4 rounded transition duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-zinc-900"
                  : "text-black hover:text-gray-700 hover:bg-gray-300"
              }`}
            >
              🚚 Order History
            </button>
          </div>

          {/* Track Order Section */}
          <div className="space-y-1">
            <button
              onClick={() => handleToggleMenu("trackOrder")}
              className={`w-full text-left block py-2.5 px-4 rounded transition duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-zinc-900"
                  : "text-black hover:text-gray-700 hover:bg-gray-300"
              }`}
            >
              🔍 Track Order
            </button>
            {menuOpen.trackOrder && (
              <div className="ml-4 space-y-1">
                <Link
                  to="/track-order/status"
                  className={`block py-2.5 px-4 rounded transition duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🕒 Order Status
                </Link>
              </div>
            )}
          </div>

          {/* Update Profile Section */}
          <div className="space-y-1">
            <button
              onClick={() => handleToggleMenu("updateProfile")}
              className={`w-full text-left block py-2.5 px-4 rounded transition duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-zinc-900"
                  : "text-black hover:text-gray-700 hover:bg-gray-300"
              }`}
            >
              🪪 Update Profile
            </button>
            {menuOpen.updateProfile && (
              <div className="ml-4 space-y-1">
                <Link
                  to="/update-profile/info"
                  className={`block py-2.5 px-4 rounded transition duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  📝 Profile Info
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
