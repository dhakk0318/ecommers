

import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext'; // Import the theme hook
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllBankingDetails, addBankingDetails, updateBankingDetails } from '../api/bankingApi';

// Validation schema for Formik
const validationSchema = Yup.object().shape({
  accountno: Yup.string().required('Account No is required'),
  bankname: Yup.string().required('Bank Name is required'),
  branchname: Yup.string().required('Branch Name is required'),
  ifsc: Yup.string().required('IFSC is required'),
  branchcode: Yup.string().required('Branch Code is required'),
  accountholdername: Yup.string().required('Account Holder Name is required'),
});

const BankingForm = () => {
  const [bankingDetails, setBankingDetails] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);

  const { isDarkMode } = useTheme(); // Use theme context

  const fetchBankingDetails = async () => {
    try {
      const response = await getAllBankingDetails();
      if (response && response.success && Array.isArray(response.data)) {
        setBankingDetails(response.data);
      } else {
        setError('Failed to fetch banking details. Please try again.');
      }
    } catch (error) {
      setError('Error fetching banking details: ' + error.message);
    }
  };

  const toggleDropdown = () => {
    resetForm();
    setIsDropdownOpen(true);
    setIsEditMode(false);
  };

  const handleEdit = (bank) => {
    setSelectedBank(bank);
    setIsEditMode(true);
    setIsDropdownOpen(true);
    formik.setValues(bank);
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditMode) {
        await updateBankingDetails(selectedBank.retid, values);
      } else {
        await addBankingDetails(values);
      }
      fetchBankingDetails();
      resetForm();
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    }
  };

  const resetForm = () => {
    formik.resetForm();
    setSelectedBank(null);
    setIsDropdownOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      accountno: '',
      bankname: '',
      branchname: '',
      ifsc: '',
      branchcode: '',
      accountholdername: ''
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    fetchBankingDetails();
  }, []);

  return (
    <div className={`max-w-7xl mx-auto p-4 py-6 ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Banking Details</h2>

      {error && <div className="mb-4 text-red-500 dark:text-red-300">{error}</div>}

      {/* Flex layout for form and table */}
      <div className={`flex ${isDropdownOpen ? 'space-x-4' : ''}`}>
        {/* Form */}
        {isDropdownOpen && (
          <div className="w-1/3 p-4 border rounded-lg shadow-md bg-gray-50 dark:bg-gray-900 dark:text-white">
            <h3 className="text-lg font-bold mb-4 text-gray-700 dark:text-white">
              {isEditMode ? 'Edit Banking Details' : 'Add New Banking Details'}
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {['accountno', 'bankname', 'branchname', 'ifsc', 'branchcode', 'accountholdername'].map((field, index) => (
                  <div key={index}>
                    <label className="block text-gray-700 dark:text-gray-300">
                      {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formik.values[field]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 w-full px-3 py-2 border rounded-md ${
                        formik.touched[field] && formik.errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-700 dark:text-white`}
                    />
                    {formik.touched[field] && formik.errors[field] && (
                      <div className="text-red-500 text-sm dark:text-red-400">{formik.errors[field]}</div>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-600 dark:hover:bg-blue-500"
              >
                {isEditMode ? 'Update Details' : 'Add Banking Details'}
              </button>
            </form>
          </div>
        )}

        {/* Banking Details Table */}
        <div className="flex-grow transition-all w-full">
          <div className="overflow-x-auto shadow-md mb-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-neutral-700">
              <thead className="bg-gray-50 dark:bg-neutral-900">
                <tr>
                  {['Account No', 'Bank Name', 'Branch Name', 'IFSC', 'Branch Code', 'Account Holder Name', 'Actions'].map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-start text-xs font-semibold text-gray-700 uppercase dark:text-gray-300 border-b border-gray-200 dark:border-neutral-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {bankingDetails.map((bank) => (
                  <tr key={bank.retid} className="bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-neutral-200">
                      {bank.accountno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-200">
                      {bank.bankname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-200">
                      {bank.branchname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-200">
                      {bank.ifsc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-200">
                      {bank.branchcode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-200">
                      {bank.accountholdername}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => handleEdit(bank)}
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={toggleDropdown}
            className="flex items-center text-blue-500 dark:text-blue-300 mt-4"
          >
            ➡️ Add New Banking Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankingForm;
