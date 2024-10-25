// import React from "react";
// import { FaEye } from "react-icons/fa"; // Import the view icon from react-icons

// const UserTable = ({
//   users,
//   roles,
//   selectedRoles,
//   handleStatusChange,
//   handleRoleSelection,
//   handleViewProfile,
// }) => {
//   return (
//     <div className="w-2/3 border rounded-md shadow-md p-2 bg-white">
//       <h2 className="text-xl font-semibold mb-3">Registered Users</h2>
//       <table className="min-w-full border border-gray-300 text-center">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">User ID</th>
//             <th className="border border-gray-300 p-2">User Name</th>
//             <th className="border border-gray-300 p-2">Current Roles</th>
//             <th className="border border-gray-300 p-2">Status</th>
//             <th className="border border-gray-300 p-2">Manage Roles</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.user_id}>
//               <td className="border border-gray-300 p-2 text-center">
//                 {user.user_id}
//               </td>
//               <td className="border border-gray-300 p-2 text-center">
//                 {user.user_name}
//                 <button 
//                   onClick={() => handleViewProfile(user.user_id)} // Call the view profile function
//                   className="ml-2 text-blue-600 hover:underline"
//                 >
//                   <FaEye className="inline" />
//                 </button>
//               </td>
//               <td className="border border-gray-300 p-2 text-center">
//                 {typeof user.roles === "string" && user.roles.trim() !== ""
//                   ? user.roles
//                   : Array.isArray(user.roles) && user.roles.length > 0
//                   ? user.roles
//                       .map((roleId) => {
//                         const role = roles.find((r) => r.role_id === roleId);
//                         return role ? role.role_name : "Unknown Role";
//                       })
//                       .join(", ")
//                   : "No roles assigned"}
//               </td>
//               <td className="border border-gray-300 p-2 text-center">
//                 <label className="inline-flex items-center cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       checked={user.status === "active"}
//                       onChange={() =>
//                         handleStatusChange(user.user_id, user.status)
//                       }
//                       className="sr-only"
//                     />
//                     <div
//                       className={`block w-10 h-6 rounded-full transition duration-300 ${
//                         user.status === "active"
//                           ? "bg-green-500"
//                           : "bg-red-500"
//                       }`}
//                     ></div>
//                     <div
//                       className={`dot absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
//                         user.status === "active"
//                           ? "transform translate-x-4"
//                           : ""
//                       }`}
//                     ></div>
//                   </div>
//                 </label>
//               </td>
//               <td className="border border-gray-300 p-2 text-center">
//                 <select
//                   value={selectedRoles[user.user_id] || ""}
//                   onChange={(e) =>
//                     handleRoleSelection(user.user_id, e.target.value)
//                   }
//                   className="border rounded mb-2 p-1"
//                 >
//                   <option value="">Select Role</option>
//                   {roles.map((role) => (
//                     <option key={role.role_id} value={role.role_id}>
//                       {role.role_name}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserTable;

import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const UserTable = ({
  users,
  roles,
  selectedRoles,
  handleStatusChange,
  handleRoleSelection,
  handleViewProfile,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Calculate the current users to display based on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-2/3 border rounded-md shadow-md p-2 bg-white">
      <h2 className="text-xl font-semibold mb-3">Registered Users</h2>
      <table className="min-w-full border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">User ID</th>
            <th className="border border-gray-300 p-2">User Name</th>
            <th className="border border-gray-300 p-2">Current Roles</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Manage Roles</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.user_id}>
              <td className="border border-gray-300 p-2 text-center">
                {user.user_id}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.user_name}
                <button
                  onClick={() => handleViewProfile(user.user_id)}
                  className="ml-2 text-blue-600 hover:underline"
                >
                  <FaEye className="inline" />
                </button>
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {typeof user.roles === "string" && user.roles.trim() !== ""
                  ? user.roles
                  : Array.isArray(user.roles) && user.roles.length > 0
                  ? user.roles
                      .map((roleId) => {
                        const role = roles.find((r) => r.role_id === roleId);
                        return role ? role.role_name : "Unknown Role";
                      })
                      .join(", ")
                  : "No roles assigned"}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <label className="inline-flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={user.status === "active"}
                      onChange={() =>
                        handleStatusChange(user.user_id, user.status)
                      }
                      className="sr-only"
                    />
                    <div
                      className={`block w-10 h-6 rounded-full transition duration-300 ${
                        user.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                        user.status === "active"
                          ? "transform translate-x-4"
                          : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <select
                  value={selectedRoles[user.user_id] || ""}
                  onChange={(e) =>
                    handleRoleSelection(user.user_id, e.target.value)
                  }
                  className="border rounded mb-2 p-1"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {users.length > usersPerPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
