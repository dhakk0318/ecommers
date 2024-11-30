// // src/components/UpdateProfile.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateProfile } from '../Redux/Action/profileActions';
// import { useParams } from 'react-router-dom';

// const UpdateProfile = () => {
//   const { cid } = useParams();
//   const dispatch = useDispatch();

//   const [profileData, setProfileData] = useState({
//     cid: '',
//     address: '',
//     alternate_address: '',
//     alternate_contact_no: '',
//     profile_image: null,
//   });

//   useEffect(() => {
//     // Fetch existing profile data for the given CID and populate the form
//     // You would typically use `dispatch(fetchProfilesByCid(cid))` here
//     // For this example, I'm leaving it empty.
//     setProfileData({ cid: cid, address: '', alternate_address: '', alternate_contact_no: '', profile_image: null });
//   }, [cid]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setProfileData((prevData) => ({ ...prevData, profile_image: e.target.files[0] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProfile(profileData));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Update Customer Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block">CID:</label>
//           <input
//             type="text"
//             name="cid"
//             value={profileData.cid}
//             onChange={handleChange}
//             disabled
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block">Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={profileData.address}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block">Alternate Address:</label>
//           <input
//             type="text"
//             name="alternate_address"
//             value={profileData.alternate_address}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block">Alternate Contact No:</label>
//           <input
//             type="text"
//             name="alternate_contact_no"
//             value={profileData.alternate_contact_no}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block">Profile Image:</label>
//           <input
//             type="file"
//             name="profile_image"
//             onChange={handleFileChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../app/Redux/Action/profileActions';

const UpdateProfileModal = ({ profile, setIsModalOpen }) => {
  const dispatch = useDispatch();
  
  const [profileData, setProfileData] = useState({
    cid: profile.cid || '',
    address: profile.address || '',
    alternate_address: profile.alternate_address || '',
    alternate_contact_no: profile.alternate_contact_no || '',
    profile_image: null,
  });

  useEffect(() => {
    setProfileData({
      cid: profile.cid,
      address: profile.address,
      alternate_address: profile.alternate_address,
      alternate_contact_no: profile.alternate_contact_no,
      profile_image: null,
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({ ...prevData, profile_image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
    setIsModalOpen(false); // Close the modal after submitting
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">CID:</label>
            <input
              type="text"
              name="cid"
              value={profileData.cid}
              onChange={handleChange}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Address:</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Alternate Address:</label>
            <input
              type="text"
              name="alternate_address"
              value={profileData.alternate_address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Alternate Contact No:</label>
            <input
              type="text"
              name="alternate_contact_no"
              value={profileData.alternate_contact_no}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Profile Image:</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 rounded mt-4">
          Save📥
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
