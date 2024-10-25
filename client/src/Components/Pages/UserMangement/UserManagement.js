 

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserRegistration from "./UserRegistration";
import UserTable from "./UserList";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setSelectedRoles(
        data.reduce((acc, user) => {
          acc[user.user_id] = user.roles || [];
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/roles", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const userToUpdate = users.find((user) => user.user_id === userId);

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          user_name: userToUpdate.user_name,
          password: userToUpdate.password,
          status: newStatus,
        }),
      });

      if (response.ok) {
        fetchUsers(); // Refresh the user list
      } else {
        const errorData = await response.json();
        alert(`Failed to update status: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleRoleSelection = async (userId, selectedRole) => {
    // Update selectedRoles with the new selected role
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: selectedRole, // Only allow one role selection
    }));

    await handleRolesChange(userId, selectedRole); // Call the function to update roles
  };

  const handleRolesChange = async (userId, selectedRole) => {
    // Get current roles or set it to an empty array if undefined
    const currentRoles = Array.isArray(selectedRoles[userId]) ? selectedRoles[userId] : [];
    const rolesToAdd = selectedRole ? [selectedRole] : []; // Create an array for new role
    const rolesToRemove = currentRoles.filter((roleId) => !rolesToAdd.includes(roleId));

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/roles`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          addRoles: rolesToAdd,
          removeRoles: rolesToRemove,
        }),
      });

      if (response.ok) {
        alert("Roles updated successfully");
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(`Failed to update roles: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating roles:", error);
    }
  };

  const handleViewProfile = (userId) => {
    // Navigate to the user's profile page
    navigate(`/profile/${userId}`); // Use navigate instead of history.push
  };

  return (
    <div className="flex flex-col p-3 py-3">
      <div className="flex space-x-6">
        <UserRegistration fetchUsers={fetchUsers} />
        <UserTable
          users={users}
          roles={roles}
          selectedRoles={selectedRoles}
          handleStatusChange={handleStatusChange}
          handleRoleSelection={handleRoleSelection}
          handleViewProfile={handleViewProfile} // Pass the profile view handler
        />
      </div>
    </div>
  );
};

export default UserManagement;
