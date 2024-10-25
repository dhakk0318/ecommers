import React from "react";
import { useTheme } from "../ThemeContext"; // Import the theme context

const RecentOrdersTable = ({ recentOrders }) => {
  const { isDarkMode } = useTheme(); // Access theme context

  const getStatusColor = (status) => {
    switch (status) {
      case "Shipped":
        return "bg-green-500";
      case "Processing":
        return "bg-yellow-500";
      case "Delivered":
        return "bg-blue-500";
      case "Pending":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-3 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"} mb-2`}>Recent Orders</h3>
      <table className={`min-w-full divide-y ${isDarkMode ? "divide-gray-600"  : "divide-gray-200"}`}>
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium  text-gray-500">Order ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className={`hover:bg-gray-200 ${isDarkMode ? "hover:bg-gray-800" : ""}`}>
              <td className={`px-4 py-2 text-sm ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{order.id}</td>
              <td className={`px-4 py-2 text-sm ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{order.customer}</td>
              <td className={`px-4 py-2 text-sm ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{order.product}</td>
              <td className={`px-4 py-2 text-sm ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{order.date}</td>
              <td className={`px-4 py-2 text-sm`}>
                <button className={`border rounded px-2 py-1 text-sm text-white ${getStatusColor(order.status)}`}>
                  {order.status}
                </button>
              </td>
              <td className={`px-4 py-2 text-sm text-right ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
                ${order.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
