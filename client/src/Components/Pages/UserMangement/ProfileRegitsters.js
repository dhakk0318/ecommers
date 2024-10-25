import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    date_of_birth: "",
    gender: "",
    profile_pic_url: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Profile created successfully with ID: ${data.profileId}`);
      } else {
        alert("Failed to create profile");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register New Profile</h2>
      <input
        type="text"
        name="user_id"
        value={formData.user_id}
        onChange={handleChange}
        placeholder="User ID"
        required
      />
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        required
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        required
      />
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        required
      />
      <input
        type="text"
        name="pin_code"
        value={formData.pin_code}
        onChange={handleChange}
        placeholder="Pin Code"
        required
      />
      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        placeholder="Gender"
        required
      />
      <input
        type="text"
        name="profile_pic_url"
        value={formData.profile_pic_url}
        onChange={handleChange}
        placeholder="Profile Picture URL"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
