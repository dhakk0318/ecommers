import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

const UserProfile = () => {
  const { userId } = useParams(); 
  const [userProfile, setUserProfile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [profileNotFound, setProfileNotFound] = useState(false); // For handling profile not found

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        console.error("No user ID provided");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/profiles/user/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching user profile:', errorData);
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        console.log('User Profile Data:', data);

        if (data.profile && data.profile.length > 0) {
          setUserProfile(data.profile[0]);
        } else {
          setProfileNotFound(true); 
        }
      } catch (error) {
        console.error('Fetch User Profile Error:', error);
        setProfileNotFound(true); }
    };

    fetchUserProfile();
  }, [userId]); 

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text("User Profile", 20, 20);
    pdf.setFontSize(14);
    
    if (userProfile) {
      pdf.text(`Name: ${userProfile.first_name} ${userProfile.last_name}`, 20, 40);
      pdf.text(`Email: ${userProfile.email}`, 20, 50);
      pdf.text(`User ID: ${userProfile.user_id}`, 20, 60);
      pdf.text(`Mobile: ${userProfile.mobile}`, 20, 70);
      pdf.text(`Address: ${userProfile.address}`, 20, 80);
      pdf.text(`City: ${userProfile.city}`, 20, 90);
      pdf.text(`State: ${userProfile.state}`, 20, 100);
      pdf.text(`Country: ${userProfile.country}`, 20, 110);
      pdf.text(`Pin Code: ${userProfile.pin_code}`, 20, 120);
      pdf.text(`Date of Birth: ${new Date(userProfile.date_of_birth).toLocaleDateString()}`, 20, 130);
      pdf.text(`Gender: ${userProfile.gender}`, 20, 140);
    }

    pdf.save('user_profile.pdf');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">

      {profileNotFound ? (
        <div className="bg-whitw text-red-600 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-3xl font-extrabold mb-2">Profile Not Found</h2>
          <p className="text-lg text-red-700">The user profile you are trying to view does not exist.</p>
        </div>
      ) : userProfile ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl text-black-600 font-bold mb-4">User Profile👨🏻</h2>
          <div className="flex items-center mb-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt={`${userProfile.first_name} ${userProfile.last_name}`}
              className="h-28 w-28 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-green-400 shadow-lg"
            />
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-blue-600">
                {userProfile.first_name} {userProfile.last_name}
              </h3>
              <p className="text-gray-500 text-sm">{userProfile.email}</p>
              <p className="text-gray-500 text-sm">User ID: {userProfile.user_id}</p>
              <button
                className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105"
                onClick={() => setShowDetails(true)}
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}

      {/* Modal for Profile Details */}
      {showDetails && userProfile && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative mx-4 sm:mx-0 transform transition-transform duration-500 ease-in-out">
            <div id="profile-content" className="text-center">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">{userProfile.first_name} {userProfile.last_name}</h2>
              <p className="text-gray-600 text-sm">{userProfile.email}</p>
              <p className="text-red-500 text-sm">User ID: {userProfile.user_id}</p>

              {/* Profile Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Mobile:</span>
                  <span className="text-gray-900 font-medium">{userProfile.mobile}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Address:</span>
                  <span className="text-gray-900 font-medium">{userProfile.address}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">City:</span>
                  <span className="text-gray-900 font-medium">{userProfile.city}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">State:</span>
                  <span className="text-gray-900 font-medium">{userProfile.state}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Country:</span>
                  <span className="text-gray-900 font-medium">{userProfile.country}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Pin Code:</span>
                  <span className="text-gray-900 font-medium">{userProfile.pin_code}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Date of Birth:</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(userProfile.date_of_birth).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Gender:</span>
                  <span className="text-gray-900 font-medium">{userProfile.gender}</span>
                </div>
              </div>
            </div>

            <button
              className="mt-5 bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105"
              onClick={downloadPDF}
            >
              Download Profile as PDF📂
            </button>

            <button
              type="button"
              className="absolute top-3 right-3 text-3xl font-bold text-gray-500 hover:text-red-500 focus:outline-none transition-transform transform hover:scale-105"
              onClick={() => setShowDetails(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
