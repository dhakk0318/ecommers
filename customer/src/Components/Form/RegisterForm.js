import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "../../app/Redux/Action/customerActions";
import { Link } from "react-router-dom";
function Registration() {
  const [formData, setFormData] = useState({
    customer_name: "",
    age: "",
    contact_no: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const error = useSelector((state) => state.customer.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(createCustomer(formData));

    if (createCustomer.fulfilled.match(resultAction)) {
      setSuccessMessage("Registration successful!"); // Set success message
      // Uncomment the line below if you want to navigate after some time
      // setTimeout(() => navigate("/welcome"), 3000);
    } else {
      // Handle error
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6">
      <div className="w-full max-w-[600px] px-6">
        <div className="mb-6 flex justify-center">
          <h1 className="text-2xl font-bold">Welcome to</h1>
           
          <Link to="/">
            <span className=" text-2xl text-yellow-600 font-bold "> Tnp</span>

            <span className=" text-2xl text-blue-600 font-bold ">Ecom</span>
            </Link>
        </div>
        <div className="border border-gray-300 rounded-lg p-6 mb-4">
          <h1 className="text-3xl font-normal mb-4">Create account</h1>
          {successMessage && ( // Display success message if it exists
            <div className="mb-4 text-green-600">
              {successMessage}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {/* Form Fields */}
            <div>
              <label
                htmlFor="customer_name"
                className="block text-sm font-bold mb-2"
              >
                Your name
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                required
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-bold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                required
              />
            </div>
            <div>
              <label
                htmlFor="contact_no"
                className="block text-sm font-bold mb-2"
              >
                Mobile number
              </label>
              <input
                type="tel"
                id="contact_no"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-bold mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold mb-2"
              >
                Re-enter password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-custom"
                required
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-[#f0c14b] border border-[#a88734] rounded-[3px] py-[6px] px-[10px] text-sm focus:outline-none focus:shadow-custom hover:bg-[#f1c860]"
              >
                Create your account
              </button>
            </div>
          </form>
        </div>

        {/* Terms and Conditions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 text-xs mt-4">
          <div className="text-center md:text-left">
            By creating an account, you agree to TNPEcom's
            <a
              href="/conditions"
              className="text-blue-600 hover:text-[#c45500] hover:underline"
            >
              {" "}
              Conditions of Use{" "}
            </a>
            and
            <a
              href="/privacy"
              className="text-blue-600 hover:text-[#c45500] hover:underline"
            >
              {" "}
              Privacy Notice
            </a>
            .
          </div>
          <div className="text-center md:text-right">
            Already have an account?
            <a
              href="/login"
              className="text-blue-600 hover:text-[#c45500] hover:underline"
            >
              {" "}
              Sign in
            </a>
          </div>
        </div>
      </div>

      <div className="mt-2 text-xs text-center text-gray-600">
        © 2023, TNPEcom.com, Inc. or its affiliates
      </div>
    </div>
  );
}

export default Registration;
