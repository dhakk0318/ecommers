import React from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserRegistration = ({ fetchUsers }) => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    user_id: Yup.string()
      .required("User ID is required"),
    user_name: Yup.string()
      .required("User Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    status: Yup.string()
      .oneOf(["active", "inactive"], "Invalid status")
      .required("Status is required"),
  });

  // Use Formik to handle form state and submission
  const formik = useFormik({
    initialValues: {
      user_id: "",
      user_name: "",
      password: "",
      status: "inactive",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("User registered successfully");
          fetchUsers(); // Refresh the user list
          formik.resetForm(); // Reset form after submission
        } else {
          const errorData = await response.json();
          alert(`Failed to register user: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
  });

  return (
    <div className="w-1/3  p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <label className="block">User ID:</label>
          <input
            type="text"
            name="user_id"
            value={formik.values.user_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="border rounded w-full px-2 py-1"
          />
          {formik.touched.user_id && formik.errors.user_id ? (
            <div className="text-red-500">{formik.errors.user_id}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <label className="block">User Name:</label>
          <input
            type="text"
            name="user_name"
            value={formik.values.user_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="border rounded w-full px-2 py-1"
          />
          {formik.touched.user_name && formik.errors.user_name ? (
            <div className="text-red-500">{formik.errors.user_name}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="border rounded w-full px-2 py-1"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-2">
          <label className="block">Status:</label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border rounded w-full px-2 py-1"
          >
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <div className="text-red-500">{formik.errors.status}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Register User
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
