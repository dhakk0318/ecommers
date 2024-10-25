import React from "react";
import DashboardHeader from "../../Admin/DashboardHeader";
import Sidebar from "../../Admin/Sidebar";

const Layout = ({ children, onLogout }) => {
  return (
    <div className="flex h-screen">
      
      <Sidebar onLogout={onLogout} />
      
     
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <DashboardHeader onLogout={onLogout} />

      
        <main className="p-4 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
