
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const CategoryManagement = () => {
//   const [categories, setCategories] = useState([]);
//   const [catId, setCatId] = useState("");
//   const [catName, setCatName] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [successMessage, setSuccessMessage] = useState(""); 
//   const [errorMessage, setErrorMessage] = useState(""); 
//   const [loading, setLoading] = useState(false); 
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const [entriesPerPage] = useState(8); // Number of entries per page

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     const accessToken = Cookies.get("access_token");
//     console.log("Access Token for fetching categories:", accessToken);

//     if (!accessToken) {
//       console.error("No access token provided");
//       return;
//     }

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
//       console.error(
//         "Error fetching categories:",
//         error.response ? error.response.data : error.message
//       );
//       setErrorMessage("Token Expired");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddCategory = async () => {
//     const accessToken = Cookies.get("access_token");
//     console.log("Access Token for adding category:", accessToken);

//     if (!accessToken) {
//       console.error("No access token provided");
//       setErrorMessage("Authorization required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const dataToSend = { catid: catId, catname: catName, startdate: startDate };
//       console.log("Data being sent:", dataToSend);

//       const response = await axios.post(
//         "http://localhost:3000/api/categories",
//         dataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//           withCredentials: true,
//         }
//       );

//       console.log("Category added:", response.data);

//       // Immediately update categories state without needing to refetch
//       setCategories((prevCategories) => [
//         ...prevCategories,
//         { catid: catId, catname: catName, startdate: startDate }
//       ]);

//       // Reset form fields
//       setCatId("");
//       setCatName("");
//       setStartDate("");
//       setSuccessMessage("Category created successfully!");

//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 3000);
//     } catch (error) {
//       console.error("Error adding category:", error.response ? error.response.data : error.message);
//       setErrorMessage("Failed to create category. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate the current categories to display
//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentCategories = categories
//     .filter((category) =>
//       category.catname && category.catname.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .slice(indexOfFirstEntry, indexOfLastEntry);

//   // Calculate total pages
//   const totalPages = Math.ceil(categories.length / entriesPerPage);

//   return (
//     <div className="flex flex-col p-6">
//       <div className="flex space-x-4">
//         {/* Add Category Section */}
//         <div className="flex flex-col w-1/3 border p-4 rounded shadow-md">
//           <h2 className="mb-4 text-xl font-semibold">Add Category</h2>
//           {successMessage && (
//             <div className="text-green-500 mb-4">{successMessage}</div>
//           )}
//           {errorMessage && (
//             <div className="text-red-500 mb-4">{errorMessage}</div>
//           )}
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleAddCategory();
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Category ID"
//               value={catId}
//               onChange={(e) => setCatId(e.target.value)}
//               className="border p-2 rounded mb-4 w-full"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={catName}
//               onChange={(e) => setCatName(e.target.value)}
//               className="border p-2 rounded mb-4 w-full"
//               required
//             />
//             <input
//               type="date"
//               placeholder="Start Date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
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

//         {/* Category List Section */}
//         <div className="flex flex-col w-2/3 border p-2 rounded shadow-md">
//           <h2 className="mb-4 text-xl font-semibold">Category List</h2>
//           <div className="flex mb-2">
//             <input
//               type="text"
//               placeholder="Search Category..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                   <tr>
//                     <th className="border px-4 py-2">S/N</th>
//                     <th className="border px-4 py-2">Category ID</th>
//                     <th className="border px-4 py-2">Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentCategories.map((category, index) => (
//                     <tr key={category.catid}>
//                       <td className="border px-4 py-2 text-center">{index + 1 + indexOfFirstEntry}</td>
//                       <td className="border px-4 py-2 text-center">{category.catid}</td>
//                       <td className="border px-4 py-2 text-center">{category.catname}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {/* Pagination Controls */}
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

// export default CategoryManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [entriesPerPage] = useState(8); // Number of entries per page

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const accessToken = Cookies.get("access_token");
    console.log("Access Token for fetching categories:", accessToken);

    if (!accessToken) {
      console.error("No access token provided");
      return;
    }

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
      console.error(
        "Error fetching categories:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Token Expired");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (values, { resetForm }) => {
    const accessToken = Cookies.get("access_token");
    console.log("Access Token for adding category:", accessToken);

    if (!accessToken) {
      console.error("No access token provided");
      setErrorMessage("Authorization required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/categories",
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log("Category added:", response.data);

      // Immediately update categories state without needing to refetch
      setCategories((prevCategories) => [...prevCategories, values]);

      // Reset form fields and show success message
      resetForm();
      setSuccessMessage("Category created successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding category:", error.response ? error.response.data : error.message);
      setErrorMessage("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate the current categories to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentCategories = categories.slice(indexOfFirstEntry, indexOfLastEntry);

  // Calculate total pages
  const totalPages = Math.ceil(categories.length / entriesPerPage);

  // Validation schema
  const validationSchema = Yup.object().shape({
    catid: Yup.string().required("Category ID is required"),
    catname: Yup.string().required("Category Name is required"),
    startdate: Yup.date().required("Start Date is required").nullable(),
  });

  return (
    <div className="flex flex-col p-6">
      <div className="flex space-x-4">
        {/* Add Category Section */}
        <div className="flex flex-col w-1/3 border p-4 rounded shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Add Category</h2>
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <Formik
            initialValues={{
              catid: "",
              catname: "",
              startdate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddCategory}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    type="text"
                    name="catid"
                    placeholder="Category ID"
                    className="border p-2 rounded mb-4 w-full"
                  />
                  <ErrorMessage name="catid" component="div" className="text-red-500 mb-2" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="catname"
                    placeholder="Category Name"
                    className="border p-2 rounded mb-4 w-full"
                  />
                  <ErrorMessage name="catname" component="div" className="text-red-500 mb-2" />
                </div>
                <div>
                  <Field
                    type="date"
                    name="startdate"
                    className="border p-2 rounded mb-4 w-full"
                  />
                  <ErrorMessage name="startdate" component="div" className="text-red-500 mb-2" />
                </div>
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

        {/* Category List Section */}
        <div className="flex flex-col w-2/3 border p-2 rounded shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Category List</h2>
          <div className="flex mb-2">
            <input
              type="text"
              placeholder="Search Category..."
              // Search functionality can be implemented here
              className="border p-2 rounded w-full"
            />
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">S/N</th>
                    <th className="border px-4 py-2">Category ID</th>
                    <th className="border px-4 py-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map((category, index) => (
                    <tr key={category.catid}>
                      <td className="border px-4 py-2 text-center">{index + 1 + indexOfFirstEntry}</td>
                      <td className="border px-4 py-2 text-center">{category.catid}</td>
                      <td className="border px-4 py-2 text-center">{category.catname}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

export default CategoryManagement;
