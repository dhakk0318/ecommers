import React, { useEffect, useState } from 'react';
import {   TrashIcon } from 'lucide-react';

export default function AdminBusinessOffers() {
  const [formData, setFormData] = useState({
    offercode: '',
    offername: '',
    sub_catid: '',
    percentagediscount: null,
    flatdiscount: null,
    validfrom: '',
    validto: '',
    status: ''
  });

  const [offers, setOffers] = useState([]);
  const [subcategories, setSubcategories] = useState([]); // New state for subcategories
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch existing offers and subcategories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const offersResponse = await fetch('http://localhost:3000/api/offers'); // Replace with your API endpoint
        const offersData = await offersResponse.json();
        setOffers(offersData);
  
        const subcategoriesResponse = await fetch('http://localhost:3000/api/subcategories'); // Replace with your API endpoint for subcategories
        const subcategoriesData = await subcategoriesResponse.json();
        console.log(subcategoriesData); // Log the subcategories to check the response
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error creating offer');
      }

      const newOffer = await response.json();
      setOffers(prevOffers => [...prevOffers, { ...formData, ...newOffer }]);
      resetForm();
      setIsModalOpen(false); // Close modal after submission
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const handleDelete = async (offercode) => {
    try {
      const response = await fetch(`http://localhost:3000/api/offers/${offercode}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error deleting offer');
      }

      setOffers(prevOffers => prevOffers.filter(offer => offer.offercode !== offercode));
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      offercode: '',
      offername: '',
      sub_catid: '',
      percentagediscount: null,
      flatdiscount: null,
      validfrom: '',
      validto: '',
      status: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-extrabold text-gray-900 text-center">
          Business Offers Management
        </h2>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)} // Open modal
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New Offer
          </button>
        </div>

        {/* Offers Table Section */}
        <div className="lg:w-full">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Existing Offers</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Offer Code</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Offer Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Sub Category</th> {/* Updated header */}
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Percentage Discount</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Flat Discount</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Valid From</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Valid To</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map(offer => (
                    <tr key={offer.offercode} className="bg-white hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{offer.offercode}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{offer.offername}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{offer.sub_catid}</td> {/* Display the subcategory name */}
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{offer.percentagediscount}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{offer.flatdiscount}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{new Date(offer.validfrom).toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{new Date(offer.validto).toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">{offer.status}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                        <button onClick={() => handleDelete(offer.offercode)} className="text-red-600 hover:text-red-800">
                          <TrashIcon className="inline h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for the Form */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto"> {/* Centered modal */}
              <h3 className="text-xl font-bold mb-4">Create New Offer</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* 2-column layout */}
                {/* Form Fields */}
                <div>
                  <label htmlFor="offercode" className="block text-sm font-medium text-gray-700">Offer Code</label>
                  <input
                    id="offercode"
                    name="offercode"
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.offercode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="offername" className="block text-sm font-medium text-gray-700">Offer Name</label>
                  <input
                    id="offername"
                    name="offername"
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.offername}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="sub_catid" className="block text-sm font-medium text-gray-700">Sub Category</label>
                  <select
  id="sub_catid"
  name="sub_catid"
  required
  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  value={formData.sub_catid}
  onChange={handleChange}
>
  <option value="">Select Subcategory</option>
  {subcategories.map(subcategory => (
    <option key={subcategory.sub_catid} value={subcategory.sub_catid}>
      {subcategory.subcat_name}
    </option>
  ))}
</select>

                </div>
                <div>
                  <label htmlFor="percentagediscount" className="block text-sm font-medium text-gray-700">Percentage Discount</label>
                  <input
                    id="percentagediscount"
                    name="percentagediscount"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.percentagediscount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="flatdiscount" className="block text-sm font-medium text-gray-700">Flat Discount</label>
                  <input
                    id="flatdiscount"
                    name="flatdiscount"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.flatdiscount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="validfrom" className="block text-sm font-medium text-gray-700">Valid From</label>
                  <input
                    id="validfrom"
                    name="validfrom"
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.validfrom}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="validto" className="block text-sm font-medium text-gray-700">Valid To</label>
                  <input
                    id="validto"
                    name="validto"
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.validto}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="mt-4 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
