import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DashboardHeader = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    const token = Cookies.get("access_token");

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (token) {
      fetchUserProfile(token);
    } else {
      console.warn("Access Token is not found in cookies");
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/profiles/user", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile Data:", data); // Debugging line

        // Assuming data is an array, we take the first element
        if (Array.isArray(data) && data.length > 0) {
          setUserProfile(data[0]); // Set the first element of the array
        } else {
          console.warn("User profile data is empty or not an array");
        }
      } else {
        const errorData = await response.json();
        console.error("Server Response:", errorData);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        Cookies.remove("username");
        Cookies.remove("access_token");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      Cookies.remove("username");
      Cookies.remove("access_token");
      onLogout();
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDropdownOpen(false);
      setShowProfileDetails(false);
      setShowChangePassword(false);
    }
  };

  const toggleProfileDetails = () => {
    setShowProfileDetails((prev) => !prev);
  };

  const toggleChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };

  const handlePasswordChange = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userProfile.user_id}/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (response.ok) {
        alert("Password changed successfully");
        setNewPassword("");
        setShowChangePassword(false);
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white-200 shadow-md">
      <h2 className="text-gray-800">
        <input
          type="text"
          placeholder="Search..."
          className="pl-4 py-2 border rounded-md"
        />
      </h2>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <span className="text-xs sm:text-sm md:text-md font-medium text-zinc-950 overflow-hidden whitespace-nowrap text-ellipsis">
            Welcome {username} Ji👋😊
          </span>
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-sm p-1 rounded-md hover:border hover:border-gray-400 focus:outline-none"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            tabIndex={0}
          >
            <img
              src="https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Avatar"
              className="w-8 h-8 md:w-11 md:h-11 rounded-full"
            />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md z-10"
              onBlur={handleBlur}
              tabIndex={-1}
            >
              <div className="py-2 px-4">
                {userProfile ? (
                  <>
                    <button
                      className="block text-gray-700 w-full text-left"
                      onClick={toggleProfileDetails}
                    >
                      Profile
                    </button>
                    {showProfileDetails && (
                      <div className="mt-2 text-gray-700">
                        <p className="font-semibold text-md">
                          {userProfile.first_name} {userProfile.last_name}
                        </p>
                        <p className="text-xs">{userProfile.email}</p>
                        <p className="text-xs">Mobile: {userProfile.mobile}</p>
                        <p className="text-xs">
                          Address: {userProfile.address}
                        </p>
                      </div>
                    )}

                    <button
                      className="block text-gray-700 w-full text-left mt-2"
                      onClick={toggleChangePassword}
                    >
                      Change Password
                    </button>
                    {showChangePassword && (
                      <div className="mt-2">
                        <input
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                          onClick={handlePasswordChange}
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="border-t"></div>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
