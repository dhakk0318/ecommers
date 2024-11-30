 

import React from "react";
import Sidebar from "../Retailers/Sidebar"; // Sidebar component
import Header from "../Retailers/Header"; // Header component
import { useTheme } from "../ThemeContext"; // Import the theme hook

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme(); // Access the current theme

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md z-50`}>
        <Sidebar />
      </div>

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className={`fixed top-0 left-64 right-0 h-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md z-50`}>
          <Header />
        </header>

        {/* Main Content */}
        <main className={`h-full overflow-y-auto ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="pt-16 px-4"> {/* Adjusting for the header height and adding padding */}
            {children} {/* Render the child components like Dashboard, Products, etc. */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
