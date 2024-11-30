// src/components/AddProfile.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../../app/Redux/Action/profileActions';

const AddProfile = () => {
  const [profileData, setProfileData] = useState({
    cid: '',
    address: '',
    alternate_address: '',
    alternate_contact_no: '',
    profile_image: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileData((prevData) => ({ ...prevData, profile_image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfile(profileData));
    setProfileData({
      cid: '',
      address: '',
      alternate_address: '',
      alternate_contact_no: '',
      profile_image: null,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Customer Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">CID:</label>
          <input
            type="text"
            name="cid"
            value={profileData.cid}
            onChange={handleChange}
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Add Profile
        </button>
      </form>
    </div>
  );
};

export default AddProfile;
