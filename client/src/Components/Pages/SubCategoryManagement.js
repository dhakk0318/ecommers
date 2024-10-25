
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const SubCategoryManagement = () => {
//   const [subcategories, setSubcategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [catId, setCatId] = useState("");
//   const [subCatId, setSubCatId] = useState("");
//   const [subCatName, setSubCatName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8); // Number of entries per page

//   useEffect(() => {
//     fetchCategories();
//     fetchSubCategories();
//   }, []);

//   const fetchCategories = async () => {
//     const accessToken = Cookies.get("access_token");
//     if (!accessToken) return;

//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:3000/api/categories", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       });
//       setCategories(response.data);
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message;
//       setErrorMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubCategories = async () => {
//     const accessToken = Cookies.get("access_token");
//     if (!accessToken) return;

//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:3000/api/subcategories", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       });
//       setSubcategories(response.data);
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message;
//       setErrorMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddSubCategory = async () => {
//     const accessToken = Cookies.get("access_token");
//     if (!accessToken) {
//       alert("No access token found! Please log in again.");
//       return;
//     }
  
//     setLoading(true);
//     try {
//       await axios.post(
//         "http://localhost:3000/api/subcategories",
//         {
//           catid: catId,
//           sub_catid: subCatId,
//           subcat_name: subCatName,
//           addedon: new Date().toISOString(),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           withCredentials: true,
//         }
//       );
  
//       // Re-fetch subcategories to get the updated list
//       fetchSubCategories();
  
//       // Set success message
//       setSuccessMessage("Subcategory created successfully!");
      
//       // Reset form fields
//       setCatId("");
//       setSubCatId("");
//       setSubCatName("");
//       setErrorMessage(""); // Clear error message on success
  
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 3000);
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message;
//       alert(`Failed to add subcategory: ${errorMsg}`);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSubcategories = subcategories.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(subcategories.length / itemsPerPage);

//   return (
//     <div className="flex flex-col p-6">
//       <div className="flex space-x-4">
//         {/* Add Subcategory Section */}
//         <div className="flex flex-col w-1/3 border p-4 rounded shadow-md">
//           <h2 className="mb-4 text-xl font-semibold">Add Subcategory</h2>
//           {errorMessage && (
//             <div className="text-red-500 mb-4">{errorMessage}</div>
//           )}
//           {successMessage && (
//             <div className="text-green-500 mb-4">{successMessage}</div>
//           )}
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleAddSubCategory();
//             }}
//           >
//             <select
//               value={catId}
//               onChange={(e) => setCatId(e.target.value)}
//               className="border p-2 rounded mb-4 w-full"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category.catid} value={category.catid}>
//                   {category.catname}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Subcategory ID"
//               value={subCatId}
//               onChange={(e) => setSubCatId(e.target.value)}
//               className="border p-2 rounded mb-4 w-full"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Subcategory Name"
//               value={subCatName}
//               onChange={(e) => setSubCatName(e.target.value)}
//               className="border p-2 rounded mb-4 w-full"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded w-full"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </form>
//         </div>

//         {/* Subcategory List Section */}
//         <div className="flex flex-col w-2/3 border p-4 rounded shadow-md">
//           <h2 className="mb-4 text-xl font-semibold">Subcategory List</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                   <tr>
//                     <th className="border px-4 py-2 text-center">S/N</th>
//                     <th className="border px-4 py-2 text-center">Category Name</th>
//                     <th className="border px-4 py-2 text-center">Subcategory ID</th>
//                     <th className="border px-4 py-2 text-center">Subcategory Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentSubcategories.map((subcat, index) => {
//                     const category = categories.find(
//                       (cat) => cat.catid === subcat.catid
//                     );
//                     return (
//                       <tr key={subcat.sub_catid}>
//                         <td className="border px-4 py-2 text-center">{index + 1 + indexOfFirstItem}</td>
//                         <td className="border px-4 py-2 text-center">
//                           {category ? category.catname : "N/A"}
//                         </td>
//                         <td className="border px-4 py-2 text-center">{subcat.sub_catid}</td>
//                         <td className="border px-4 py-2 text-center">{subcat.subcat_name}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//               {/* Pagination Controls */}
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   Previous
//                 </button>
//                 <span>{`Page ${currentPage} of ${totalPages}`}</span>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategoryManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SubCategoryManagement = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of entries per page

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) return;

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/categories", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async () => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) return;

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/subcategories", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setSubcategories(response.data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubCategory = async (values, { resetForm }) => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      alert("No access token found! Please log in again.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/subcategories",
        {
          catid: values.catId,
          sub_catid: values.subCatId,
          subcat_name: values.subCatName,
          addedon: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // Re-fetch subcategories to get the updated list
      fetchSubCategories();

      // Set success message
      setSuccessMessage("Subcategory created successfully!");
      resetForm(); // Reset form fields
      setErrorMessage(""); // Clear error message on success

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      alert(`Failed to add subcategory: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubcategories = subcategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(subcategories.length / itemsPerPage);

  const validationSchema = Yup.object().shape({
    catId: Yup.string().required("Category is required"),
    subCatId: Yup.string().required("Subcategory ID is required"),
    subCatName: Yup.string().required("Subcategory name is required"),
  });

  return (
    <div className="flex flex-col p-6">
      <div className="flex space-x-4">
        {/* Add Subcategory Section */}
        <div className="flex flex-col w-1/3 border p-4 rounded shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Add Subcategory</h2>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          <Formik
            initialValues={{
              catId: "",
              subCatId: "",
              subCatName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddSubCategory}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field as="select" name="catId" className="border p-2 rounded mb-4 w-full" required>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.catid} value={category.catid}>
                      {category.catname}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="catId" component="div" className="text-red-500 mb-2" />

                <Field
                  type="text"
                  placeholder="Subcategory ID"
                  name="subCatId"
                  className="border p-2 rounded mb-4 w-full"
                  required
                />
                <ErrorMessage name="subCatId" component="div" className="text-red-500 mb-2" />

                <Field
                  type="text"
                  placeholder="Subcategory Name"
                  name="subCatName"
                  className="border p-2 rounded mb-4 w-full"
                  required
                />
                <ErrorMessage name="subCatName" component="div" className="text-red-500 mb-2" />

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded w-full"
                  disabled={loading || isSubmitting}
                >
                  {loading || isSubmitting ? "Saving..." : "Save"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Subcategory List Section */}
        <div className="flex flex-col w-2/3 border p-4 rounded shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Subcategory List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-center">S/N</th>
                    <th className="border px-4 py-2 text-center">Category Name</th>
                    <th className="border px-4 py-2 text-center">Subcategory ID</th>
                    <th className="border px-4 py-2 text-center">Subcategory Name</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubcategories.map((subcat, index) => {
                    const category = categories.find(
                      (cat) => cat.catid === subcat.catid
                    );
                    return (
                      <tr key={subcat.sub_catid}>
                        <td className="border px-4 py-2 text-center">{index + 1 + indexOfFirstItem}</td>
                        <td className="border px-4 py-2 text-center">
                          {category ? category.catname : "N/A"}
                        </td>
                        <td className="border px-4 py-2 text-center">{subcat.sub_catid}</td>
                        <td className="border px-4 py-2 text-center">{subcat.subcat_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Pagination Controls */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryManagement;
