

// import { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// function RetailerRegistration() {
//   const [retailers, setRetailers] = useState([]);
//   const [selectedRetailer, setSelectedRetailer] = useState(null);

//   // Fetch retailers from the API
//   const fetchRetailers = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/retailers");
//       if (!response.ok) {
//         throw new Error("Failed to fetch retailers");
//       }
//       const data = await response.json();
//       // Exclude password field
//       const retailersWithoutPassword = data.map(
//         ({ password, ...rest }) => rest
//       );
//       setRetailers(retailersWithoutPassword);
//     } catch (error) {
//       console.error("Error fetching retailers:", error);
//     }
//   };

//   // Fetch retailers when the component mounts
//   useEffect(() => {
//     fetchRetailers();
//   }, []);

//   const handleRetailerClick = (retailer) => {
//     // Toggle the selected retailer
//     if (selectedRetailer && selectedRetailer.retid === retailer.retid) {
//       setSelectedRetailer(null); // Deselect if already selected
//     } else {
//       setSelectedRetailer(retailer);
//     }
//   };

//   // Function to download details as PDF
//   const downloadPDF = async () => {
//     if (!selectedRetailer) return; // No retailer selected

//     // Hide the download button
//     const downloadButton = document.getElementById("download-button");
//     downloadButton.style.display = "none"; // Hide the button

//     const pdf = new jsPDF();
//     const imgUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Sample profile picture URL

//     // Add the retailer's basic details to the PDF
//     pdf.setFontSize(16);
//     pdf.text("Retailer ID: " + selectedRetailer.retid, 10, 10);
//     pdf.text("Profile Picture: ", 10, 20);
//     pdf.addImage(imgUrl, "PNG", 10, 25, 30, 30); // Adjusting the image position and size
//     pdf.text("Registration Number: " + selectedRetailer.retregno, 10, 60);
//     pdf.text("Retailer Name: " + selectedRetailer.retname, 10, 70);
//     pdf.text("Details:", 10, 90);
    
//     // Capture the details of the selected retailer
//     const detailsElement = document.getElementById("retailer-details");
    
//     // Use html2canvas to capture the content
//     const canvas = await html2canvas(detailsElement);
//     const imgData = canvas.toDataURL("image/png");
    
//     // Add the image to PDF
//     pdf.addImage(imgData, "PNG", 10, 100);
//     pdf.save(`${selectedRetailer.retname}_details.pdf`); // Save the PDF

//     // Show the download button again
//     downloadButton.style.display = "block"; // Show the button back
//   };

//   return (
//     <div className="container p-6 py-0 flex space-x-10">
//       <div className="flex-1">
//         <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">Retailers List</h1>
//         <div className="overflow-x-auto bg-white shadow-lg ">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
//                   Retailer ID
//                 </th>
//                 <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
//                   Profile Picture
//                 </th>
//                 <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
//                   Registration Number
//                 </th>
//                 <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
//                   Retailer Name
//                 </th>
//                 <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {retailers.map((retailer) => (
//                 <tr key={retailer.retid} className="hover:bg-gray-100">
//                   <td className="py-2 px-4 border-b">{retailer.retid}</td>
//                   <td className="py-0 px-4 border-b">
//                     <img
//                       src={
//                         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                       }
//                       alt="Profile"
//                       className="h-10 w-10 rounded-full object-cover"
//                     />
//                   </td>
//                   <td className="py-2 px-4 border-b">{retailer.retregno}</td>
//                   <td className="py-2 px-4 border-b">{retailer.retname}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       onClick={() => handleRetailerClick(retailer)}
//                       className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-1 dark:border-green-500 dark:text-green-500 dark:hover:text-white"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedRetailer && (
//         <div className="flex-1 border rounded-lg shadow-lg p-4 bg-white" id="retailer-details">
//           <h2 className="text-2xl font-semibold mb-4">Retailer Details</h2>
//           <p>
//             <strong>Contact Number:</strong> {selectedRetailer.contactno}
//           </p>
//           <p>
//             <strong>Alternate Contact:</strong> {selectedRetailer.alternatecontact}
//           </p>
//           <p>
//             <strong>Address:</strong> {selectedRetailer.address}
//           </p>
//           <p>
//             <strong>State:</strong> {selectedRetailer.state}
//           </p>
//           <p>
//             <strong>City:</strong> {selectedRetailer.city}
//           </p>
//           <p>
//             <strong>Pincode:</strong> {selectedRetailer.pincode}
//           </p>
//           <p>
//             <strong>Email:</strong> {selectedRetailer.email}
//           </p>
//           <p>
//             <strong>URL:</strong>{" "}
//             <a
//               href={selectedRetailer.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               {selectedRetailer.url}
//             </a>
//           </p>
//           <p>
//             <strong>PAN:</strong> {selectedRetailer.pan}
//           </p>
//           <p>
//             <strong>Status:</strong> {selectedRetailer.status}
//           </p>
//           <p>
//             <strong>Registered On:</strong>{" "}
//             {new Date(selectedRetailer.registeron).toLocaleDateString()}
//           </p>
//           <button 
//             id="download-button"
//             onClick={downloadPDF}
//             className="mt-4 bg-blue-500 text-white p-2 rounded"
//           >
//             Download PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RetailerRegistration;


import { useEffect, useState } from "react";
import jsPDF from "jspdf";

function RetailerRegistration() {
  const [retailers, setRetailers] = useState([]);
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  // Fetch retailers from the API
  const fetchRetailers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/retailers");
      if (!response.ok) {
        throw new Error("Failed to fetch retailers");
      }
      const data = await response.json();
      // Exclude password field
      const retailersWithoutPassword = data.map(
        ({ password, ...rest }) => rest
      );
      setRetailers(retailersWithoutPassword);
    } catch (error) {
      console.error("Error fetching retailers:", error);
    }
  };

  // Fetch retailers when the component mounts
  useEffect(() => {
    fetchRetailers();
  }, []);

  const handleRetailerClick = (retailer) => {
    // Toggle the selected retailer
    if (selectedRetailer && selectedRetailer.retid === retailer.retid) {
      setSelectedRetailer(null); // Deselect if already selected
    } else {
      setSelectedRetailer(retailer);
    }
  };

  // Function to download details as PDF
  const downloadPDF = () => {
    if (!selectedRetailer) return; // No retailer selected

    const pdf = new jsPDF();

    // Add the retailer's basic details to the PDF
    pdf.setFontSize(16);
    pdf.text("Retailer ID: " + selectedRetailer.retid, 10, 10);
    pdf.text("Profile Picture: ", 10, 20);
    // Use a placeholder for the profile picture since html2canvas is removed
    pdf.text("URL: https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 10, 25);
    pdf.text("Registration Number: " + selectedRetailer.retregno, 10, 40);
    pdf.text("Retailer Name: " + selectedRetailer.retname, 10, 50);
    pdf.text("Details:", 10, 70);
    
    // Add additional details of the selected retailer
    pdf.text("Contact Number: " + selectedRetailer.contactno, 10, 80);
    pdf.text("Alternate Contact: " + selectedRetailer.alternatecontact, 10, 90);
    pdf.text("Address: " + selectedRetailer.address, 10, 100);
    pdf.text("State: " + selectedRetailer.state, 10, 110);
    pdf.text("City: " + selectedRetailer.city, 10, 120);
    pdf.text("Pincode: " + selectedRetailer.pincode, 10, 130);
    pdf.text("Email: " + selectedRetailer.email, 10, 140);
    pdf.text("URL: " + selectedRetailer.url, 10, 150);
    pdf.text("PAN: " + selectedRetailer.pan, 10, 160);
    pdf.text("Status: " + selectedRetailer.status, 10, 170);
    pdf.text("Registered On: " + new Date(selectedRetailer.registeron).toLocaleDateString(), 10, 180);

    pdf.save(`${selectedRetailer.retname}_details.pdf`); // Save the PDF
  };

  return (
    <div className="container p-6 py-0 flex space-x-10">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
          Retailers List
        </h1>
        <div className="overflow-x-auto bg-white shadow-lg ">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
                  Retailer ID
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
                  Profile Picture
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
                  Registration Number
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
                  Retailer Name
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {retailers.map((retailer) => (
                <tr key={retailer.retid} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{retailer.retid}</td>
                  <td className="py-0 px-4 border-b">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{retailer.retregno}</td>
                  <td className="py-2 px-4 border-b">{retailer.retname}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleRetailerClick(retailer)}
                      className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-1 dark:border-green-500 dark:text-green-500 dark:hover:text-white"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRetailer && (
        <div
          className="flex-1 border rounded-lg shadow-lg p-4 bg-white"
          id="retailer-details"
        >
          <h2 className="text-2xl font-semibold mb-4">Retailer Details</h2>
          <p>
            <strong>Contact Number:</strong> {selectedRetailer.contactno}
          </p>
          <p>
            <strong>Alternate Contact:</strong>{" "}
            {selectedRetailer.alternatecontact}
          </p>
          <p>
            <strong>Address:</strong> {selectedRetailer.address}
          </p>
          <p>
            <strong>State:</strong> {selectedRetailer.state}
          </p>
          <p>
            <strong>City:</strong> {selectedRetailer.city}
          </p>
          <p>
            <strong>Pincode:</strong> {selectedRetailer.pincode}
          </p>
          <p>
            <strong>Email:</strong> {selectedRetailer.email}
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <a
              href={selectedRetailer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {selectedRetailer.url}
            </a>
          </p>
          <p>
            <strong>PAN:</strong> {selectedRetailer.pan}
          </p>
          <p>
            <strong>Status:</strong> {selectedRetailer.status}
          </p>
          <p>
            <strong>Registered On:</strong>{" "}
            {new Date(selectedRetailer.registeron).toLocaleDateString()}
          </p>
          <button
            id="download-button"
            onClick={downloadPDF}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default RetailerRegistration;
