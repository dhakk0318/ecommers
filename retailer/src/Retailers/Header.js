// import React, { useState, useEffect } from 'react';
// import { useTheme } from '../ThemeContext';
// import { Search, ChevronDown, Sun, Lightbulb } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// export default function Header() {
//   const { isDarkMode, toggleTheme } = useTheme();
//   const [userProfile, setUserProfile] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [profileVisible, setProfileVisible] = useState(false);  // To toggle profile visibility in dropdown
//   const navigate = useNavigate();

//   // Fetch retailer profile details when the component mounts
//   useEffect(() => {
//     const fetchRetailerProfile = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/retailers/profile', {
//           method: 'GET',
//           credentials: 'include',  // Ensure cookies are sent along with the request
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('API Response:', data);  // Log the full response data

//           // Update state with the profile details
//           if (data.retname) {
//             setUserProfile(data);  // Set retailer profile information
//           } else {
//             console.log('No retailer profile data found:', data);
//           }
//         } else {
//           console.error('Failed to fetch retailer profile');
//         }
//       } catch (error) {
//         console.error('Error fetching retailer profile:', error);
//       }
//     };

//     fetchRetailerProfile();
//   }, []);

//   // Function to toggle dropdown
//   const toggleDropdown = () => {
//     setDropdownOpen((prev) => !prev);
//     setProfileVisible(false); // Close profile details when dropdown is toggled
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/retailers/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       if (response.ok) {
//         // Clear cookies
//         Cookies.remove('access_token');
//         Cookies.remove('refresh_token');
//         Cookies.remove('retname');  // Remove 'retname' when logging out
//         setUserProfile({}); // Clear the user profile state
//         setProfileVisible(false); // Close profile details on logout
//         navigate('/');  // Redirect to the home page after logout
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   // Function to handle profile click
//   const handleProfileClick = () => {
//     setProfileVisible((prev) => !prev);  // Toggle profile visibility
//   };

//   return (
//     <header className={`${isDarkMode ? 'bg-black' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} p-4 flex items-center justify-between`}>
//       <div className="flex items-center space-x-4">
//         <div className="relative">
//           <input
//             type="search"
//             placeholder="Search"
//             className={`${isDarkMode ? 'bg-black border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-black'} border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-gray-600' : 'focus:ring-gray-400'}`}
//           />
//           <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//         </div>
//       </div>
//       <nav className="flex items-center space-x-6">
//         {/* Navigation buttons */}
//         <button className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-black font-bold hover:text-gray-700'} transition-colors`} onClick={() => navigate("/products")}>Products</button>
//         <button className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-black font-bold hover:text-gray-700'} transition-colors`} onClick={() => navigate("/pricing")}>Pricing</button>

//         {/* Theme toggle button */}
//         <button onClick={toggleTheme} className="text-sm text-gray-300">
//           {isDarkMode ? <Sun className="h-6 w-6" /> : <Lightbulb className="h-6 w-6" />}
//         </button>

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
//             <img 
//             //userProfile.profile_pic ||
//               src={ "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
//               alt="Profile" 
//               className={`w-8 h-8 rounded-full border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
//             />
//             <span className={`${isDarkMode ? 'text-gray-300' : 'text-black font-bold'} text-sm`}>{userProfile.retname || 'User'}</span>
//             <ChevronDown className={`h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//           </button>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
//             <div className={`absolute right-0 mt-2 w-56 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-md shadow-lg py-1`}>
//               {/* Profile Name & Email */}
//               <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-sm font-semibold`}>{userProfile.retname || 'User'}</p>
//                 <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>{userProfile.email || 'Not Available'}</p>
//               </div>

//               {/* Profile Details - This is where the profile information appears inside the dropdown */}
//               {profileVisible && (
//                 <div className="px-4 py-2 space-y-1 text-sm text-gray-700">
//                   <p><strong>Address:</strong> {userProfile.address || 'Not Available'}</p>
//                   <p><strong>City:</strong> {userProfile.city || 'Not Available'}</p>
//                   <p><strong>State:</strong> {userProfile.state || 'Not Available'}</p>
//                   <p><strong>Pincode:</strong> {userProfile.pincode || 'Not Available'}</p>
//                   <p><strong>Phone:</strong> {userProfile.contactno || 'Not Available'}</p>
//                   <p><strong>Alternate Phone:</strong> {userProfile.alternatecontact || 'Not Available'}</p>
//                   <p><strong>Registered On:</strong> {new Date(userProfile.registeron).toLocaleDateString() || 'Not Available'}</p>
//                   <p><strong>Profile URL:</strong> <a href={userProfile.url || '#'} className="text-blue-600 hover:underline">{userProfile.url || 'Not Available'}</a></p>
//                   <p><strong>PAN:</strong> {userProfile.pan || 'Not Available'}</p>
//                   <p><strong>Registration No:</strong> {userProfile.retregno || 'Not Available'}</p>
//                 </div>
//               )}

//               {/* Profile Details Button */}
//               <button
//                 className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
//                 onClick={handleProfileClick} // Toggle profile visibility in dropdown
//               >
//                 {profileVisible ? 'Hide Profile' : 'View Profile'}
//               </button>

//               {/* Dropdown Links */}
//               <Link
//                 to="/settings"
//                 className={`block px-4 py-2 text-sm`}
//               >
//                 Settings
//               </Link>

//               {/* Logout Button */}
//               <button
//                 className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { Search, ChevronDown, Sun, Lightbulb } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [userProfile, setUserProfile] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch retailer profile details when the component mounts
  useEffect(() => {
    const fetchRetailerProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/retailers/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);

          if (data.retname) {
            setUserProfile(data);
          } else {
            console.log('No retailer profile data found:', data);
          }
        } else {
          console.error('Failed to fetch retailer profile');
        }
      } catch (error) {
        console.error('Error fetching retailer profile:', error);
      }
    };

    fetchRetailerProfile();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setProfileVisible(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/retailers/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('retname');
        setUserProfile({});
        setProfileVisible(false);
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    setProfileVisible((prev) => !prev);
  };

  return (
    <header className={`${isDarkMode ? 'bg-black' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} p-4 flex items-center justify-between`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className={`${isDarkMode ? 'bg-black border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-black'} border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-gray-600' : 'focus:ring-gray-400'}`}
          />
          <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        </div>
      </div>
      <nav className="flex items-center space-x-6">
        <button className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-black font-bold hover:text-gray-700'} transition-colors`} onClick={() => navigate("/products")}>Products</button>
        <button className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-black font-bold hover:text-gray-700'} transition-colors`} onClick={() => navigate("/pricing")}>Pricing</button>

        <button onClick={toggleTheme} className="text-sm text-gray-300">
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Lightbulb className="h-6 w-6" />}
        </button>

        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
            <img 
              src={"https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
              alt="Profile" 
              className={`w-8 h-8 rounded-full border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
            />
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-black font-bold'} text-sm`}>{userProfile.retname || 'User'}</span>
            <ChevronDown className={`h-4 w-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </button>

          {dropdownOpen && (
            <div className={`absolute right-0 mt-2 w-64 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-md shadow-lg py-2 transition-all duration-200 ease-in-out`}>
              {/* Profile Name & Email */}
              <div className={`px-4 py-0 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-semibold`}>{userProfile.retname || 'User'}</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{userProfile.email || 'Not Available'}</p>
              </div>

            
               {profileVisible && (
                <div className="px-4 py-2 space-y-2 text-sm">
                  <div className={`${isDarkMode ? 'bg-gray-850 text-gray-400' : 'bg-white text-black'} rounded-md p-3 shadow-md`}>
                    <p><strong>Address:</strong> {userProfile.address || 'Not Available'}</p>
                    <p><strong>City:</strong> {userProfile.city || 'Not Available'}</p>
                    <p><strong>State:</strong> {userProfile.state || 'Not Available'}</p>
                    <p><strong>Pincode:</strong> {userProfile.pincode || 'Not Available'}</p>
                    <p><strong>Phone:</strong> {userProfile.contactno || 'Not Available'}</p>
                    <p><strong>Alternate Phone:</strong> {userProfile.alternatecontact || 'Not Available'}</p>
                    <p><strong>Registered On:</strong> {new Date(userProfile.registeron).toLocaleDateString() || 'Not Available'}</p>
                    <p><strong>Profile URL:</strong> <a href={userProfile.url || '#'} className="text-blue-600 hover:underline">{userProfile.url || 'Not Available'}</a></p>
                    <p><strong>PAN:</strong> {userProfile.pan || 'Not Available'}</p>
                    <p><strong>Registration No:</strong> {userProfile.retregno || 'Not Available'}</p>
                  </div>
                </div>
              )}
              

              <button
                className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'} transition-colors`}
                onClick={handleProfileClick}
              >
                {profileVisible ? 'Hide Profile' : 'View Profile'}
              </button>

              <Link
                to="/settings"
                className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'} transition-colors`}
              >
                Settings
              </Link>

              <button
                className={`block w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'} transition-colors`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
