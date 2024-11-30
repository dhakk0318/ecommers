import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls

function CustomerProfile() {
  const [customerInfo, setCustomerInfo] = useState(null); // State to hold customer information
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/customers/protected", {
          withCredentials: true, // Include credentials for cookies if needed
        });
        console.log("API Response:", response.data); // Log the response
        setCustomerInfo(response.data); // Set the customer info directly
      } catch (err) {
        console.error("Error fetching customer data:", err);
        setError("Failed to fetch customer data.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCustomerData();
  }, []); // Empty dependency array to run once on mount

  if (loading) return <p className="text-center text-gray-500">Loading...</p>; // Show loading message
  if (error) return <p className="text-center text-red-500">{error}</p>; // Show error message if any

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-md">
              {customerInfo.customer_name ? customerInfo.customer_name[0] : "?"} {/* Fallback if name is not available */}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {customerInfo.customer_name || "Unknown Name"} {/* Fallback if name is not available */}
              </h1>
              <p className="text-gray-600">
                Customer ID: <span className="font-semibold text-gray-700">#{customerInfo.cid}</span>
              </p>
            </div>
          </div>
           
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;


