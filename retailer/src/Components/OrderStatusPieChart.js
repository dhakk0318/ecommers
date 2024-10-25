// import React, { useState } from "react";
// import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

// const OrderStatusPieChart = ({ data, isDarkMode }) => {
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   // Filter the data based on selected status
//   const filteredData = selectedStatus === "All" ? data : data.filter(item => item.name === selectedStatus);
  
//   const RADIAN = Math.PI / 180;

//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         textAnchor={x > cx ? "start" : "end"}
//         dominantBaseline="central"
//         className="text-xs font-bold"
//       >
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   const handleStatusChange = (event) => {
//     setSelectedStatus(event.target.value);
//   };

//   return (
//     <div className={`flex-1 rounded-lg shadow-md p-6 ${isDarkMode ? "bg-black" : "bg-white-800"}`}>
//       <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-800"} mb-4`}>Order Status Distribution</h3>

//       {/* Dropdown for status selection */}
//       <div className="mb-">
//         <label className={`mr-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Filter by Status:</label>
//         <select
//           value={selectedStatus}
//           onChange={handleStatusChange}
//           className={` rounded ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} border border-gray-300`}
//         >
//           <option value="All">All</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Processing">Processing</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Pending">Pending</option>
//         </select>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: isDarkMode ? "#333" : "#fff",
//               borderColor: isDarkMode ? "#444" : "#ddd",
//               color: isDarkMode ? "#fff" : "#000",
//             }}
//           />
//           <Pie
//             data={filteredData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             innerRadius={60}
//             labelLine={false}
//             label={renderCustomizedLabel}
//           >
//             {filteredData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default OrderStatusPieChart;

import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "../ThemeContext";

const OrderStatusDistributionChart = ({ data }) => {
  const { isDarkMode } = useTheme();

  // Sample data (this could be passed in as a prop)
  const allData = data || [
    { name: 'Shipped', value: 3, color: '#4CAF50' },
    { name: 'Processing', value: 1, color: '#FF9800' },
    { name: 'Delivered', value: 1, color: '#2196F3' },
    { name: 'Pending', value: 1, color: '#F44336' },
  ];

  // State for filtered data
  const [filteredData, setFilteredData] = useState(allData);

  // Filter function
  const handleFilter = (event) => {
    const status = event.target.value;
    if (status === 'All') {
      setFilteredData(allData);
    } else {
      const newData = allData.filter(item => item.name === status);
      setFilteredData(newData);
    }
  };

  return (
    <div className={`flex-1 rounded-lg shadow-md p-4   ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Order Status Distribution</h3>
      
      <div className="mb-0">
        <label className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Filter by Order Status:
        </label>
        <select 
          onChange={handleFilter} 
          className={`p-1 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          <option value="All">All</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Tooltip />
          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusDistributionChart;
