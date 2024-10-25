import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import OrderStatusPieChart from "../Components/OrderStatusPieChart"; // Ensure this component exists
import RecentOrdersTable from "../Components/RecentOrdersTable"; // Ensure this component exists
import axios from "axios"; // Import axios for API calls

// Card component
const Card = ({ title, amount, change, icon, bgColor, textColor }) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 ${bgColor}`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`text-sm font-medium ${textColor}`}>{title}</div>
        <span className="text-2xl text-gray-100">{icon}</span>
      </div>
      <div className={`text-3xl font-bold ${textColor}`}>{amount}</div>
      {/* <p className={`text-xs ${textColor}`}>{change} from last month</p> */}
    </div>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [productCount, setProductCount] = useState(0);

  // Fetch product count from API
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/count/retailer-products");
        setProductCount(response.data.productCount); // Adjust this according to your API response structure
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchProductCount();
  }, []);

  const recentOrders = [
    { id: "1234", customer: "Aman Daheriya", product: "Wireless Headphones", date: "2023-09-28", status: "Shipped", amount: "129.99" },
    { id: "1235", customer: "Mayank Malviye", product: "Smartphone", date: "2023-09-27", status: "Processing", amount: "599.99" },
    { id: "1236", customer: "Dheeraj Khoprakhale", product: "Laptop", date: "2023-09-26", status: "Delivered", amount: "1299.99" },
    { id: "1237", customer: "Ajay Kushwaha", product: "Smartwatch", date: "2023-09-25", status: "Shipped", amount: "249.99" },
    { id: "1238", customer: "Sachin Kuswaha", product: "Tablet", date: "2023-09-24", status: "Pending", amount: "399.99" },
  ];

  const pieChartData = [
    { name: "Shipped", value: 3, color: "#4CAF50" },
    { name: "Processing", value: 1, color: "#FF9800" },
    { name: "Delivered", value: 1, color: "#2196F3" },
    { name: "Pending", value: 1, color: "#F44336" },
  ];

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card title="Total Revenue" amount="$45,231.89" change="+20.1%" icon="₹" bgColor="bg-green-700" textColor="text-white" />
            <Card title="Orders" amount="+2350" change="+180.1%" icon="🚛" bgColor="bg-blue-800" textColor="text-white" />
            <Card title="Products" amount={`+${productCount}`} change="+19%" icon="🛒" bgColor="bg-orange-800" textColor="text-white" />
            <Card title="Pending Orders" amount="+573" change="+201" icon="🛍️" bgColor="bg-pink-700" textColor="text-white" />
          </div>

          {/* Main Layout with sections */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Pie Chart */}
            <OrderStatusPieChart data={pieChartData} isDarkMode={isDarkMode} />

            {/* Recent Orders Table */}
            <div className="flex-1">
              <RecentOrdersTable recentOrders={recentOrders} isDarkMode={isDarkMode} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
