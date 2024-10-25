import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import CurrentBookings from "./CurrentBookings";
import axios from "axios";  

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [retailerCount, setRetailerCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subCategoryCount, setSubCategoryCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3000/api/count/admin-users");
        const retailerResponse = await axios.get("http://localhost:3000/api/count/retailers");
        const categoryResponse = await axios.get("http://localhost:3000/api/count/categories");
        const subCategoryResponse = await axios.get("http://localhost:3000/api/count/subcategories");

        setUserCount(userResponse.data.userCount);
        setRetailerCount(retailerResponse.data.retailerCount);
        setCategoryCount(categoryResponse.data.categoryCount);
        setSubCategoryCount(subCategoryResponse.data.subcategoryCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <main className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-blue-600">👥</span> {/* User Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{userCount}</p>
          </div>
        </div>

        <div className="bg-green-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-green-600">👨🏻‍💻</span> {/* Retailer Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Retailers</h3>
            <p className="text-3xl font-bold text-green-600">{retailerCount}</p>
          </div>
        </div>

        <div className="bg-purple-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-purple-600">📑</span> {/* Category Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Categories</h3>
            <p className="text-3xl font-bold text-purple-600">{categoryCount}</p>
          </div>
        </div>

        <div className="bg-red-100 rounded-lg shadow p-6 flex items-center">
          <span className="text-4xl mr-4 text-red-600">📋</span> {/* Subcategory Icon */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Subcategories</h3>
            <p className="text-3xl font-bold text-red-600">{subCategoryCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">User Growth Analytics</h3>
          <LineChart />
        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Current Bookings</h3>
          <CurrentBookings />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
