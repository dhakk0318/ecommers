import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RetailerRegistration() {
  const [retailers, setRetailers] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRetailer = Object.fromEntries(formData.entries());

    // Check for unique retailer ID
    const isExisting = retailers.some(retailer => retailer.retid === newRetailer.retid);
    if (isExisting) {
      setErrorMessage('Retailer ID already exists!');
      return;
    }

    // Add the new retailer to the state
    setRetailers((prevRetailers) => [...prevRetailers, newRetailer]);

    // Reset the form
    e.target.reset();
    setErrorMessage('');

    // Redirect to login page after registration
    navigate('/');
  };

  const renderInputField = (id, name, type = 'text', required = true) => (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-medium text-gray-800">{name}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );

  return (
    <div className="items-center justify-center min-h-screen bg-gray-800">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-black font-bold mb-4 text-white text-center">Retailer KYC Registration</h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[80vh] w-full max-w-5xl bg-gray-100 p-8 shadow-lg rounded-lg border border-gray-200"
          >
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-2 mb-4 rounded">
                {errorMessage}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                {renderInputField('retid', 'Retailer ID')}
                {renderInputField('retregno', 'Registration Number')}
                {renderInputField('retname', 'Retailer Name')}
                {renderInputField('contactno', 'Contact Number', 'tel')}
                {renderInputField('alternatecontact', 'Alternate Contact', 'tel')}
                {renderInputField('address', 'Address')}
                {renderInputField('city', 'City')}
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="state" className="block font-medium text-gray-800">State</label>
                  <select id="state" name="state" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                    <option value="">Select State</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="MH">Maharashtra</option>
                    <option value="DL">Delhi</option>
                  </select>
                </div>
                {renderInputField('pincode', 'Pincode')}
                {renderInputField('email', 'Email', 'email')}
                {renderInputField('url', 'URL', 'url', false)}
                {renderInputField('pan', 'PAN')}
                {renderInputField('password', 'Password', 'password')}
                <div className="space-y-1">
                  <label htmlFor="profile_pic" className="block font-medium text-gray-800">Profile Picture</label>
                  <input id="profile_pic" name="profile_pic" type="file" accept="image/*" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                </div>
              </div>
            </div>
            <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200">Register Retailer</button>
          </form>
        </div>
        <p className="text-center text-black mt-4 text-white">
          Already have an account? 
          <button onClick={() => navigate('/')} className="text-blue-600 hover:underline"> Login here</button>
        </p>
      </div>
    </div>
  );
}

export default RetailerRegistration;
