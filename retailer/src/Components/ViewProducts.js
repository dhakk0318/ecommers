 

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../ThemeContext"; // Import the theme hook

const GetProducts = () => {
  const { isDarkMode } = useTheme(); // Get the current theme

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null); // To manage dropdown toggle
  const [editableProduct, setEditableProduct] = useState({
    productname: "",
    subcat_name: "",
    price: "",
    qty: "",
    company: "",
    product_description: "",
    tags: "",
    url: "",
    review: "",
  }); // To handle form data for editing

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    if (selectedProductId === productId) {
      setSelectedProductId(null); // Toggle off if clicked again
    } else {
      setSelectedProductId(productId); // Set the clicked product as selected
      // Set the editable product form with the existing product data
      const product = products.find((prod) => prod.pid === productId);
      setEditableProduct({
        productname: product.productname || "",
        subcat_name: product.subcat_name || "",
        price: product.price || "",
        qty: product.qty || "",
        company: product.company || "",
        product_description: product.product_description || "",
        tags: product.tags || "",
        url: product.url || "",
        review: product.review || "",
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (productId) => {
    try {
      await axios.patch(`http://localhost:3000/api/product/${productId}`, editableProduct);
      // Update the product list with the new data
      const updatedProducts = products.map((prod) =>
        prod.pid === productId ? { ...prod, ...editableProduct } : prod
      );
      setProducts(updatedProducts);
      alert("Product updated successfully!");
    } catch (err) {
      setError("Failed to update product");
    }
  };

  return (
    <div
      className={`p-8 mb-8 mx-auto rounded-lg shadow-lg transition-transform transform ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
        Products List
      </h1>

      {/* Loading state */}
      {loading && <p className="text-blue-500">Loading products...</p>}

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products table */}
      {!loading && !error && (
        <table
          className={`min-w-full divide-y ${
            isDarkMode ? "divide-gray-600 bg-black" : "divide-gray-200 bg-white"
          }`}
        >
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Product ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Product Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Subcategory</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Company</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <React.Fragment key={product.pid}>
                <tr
                  onClick={() => handleProductClick(product.pid)} // Handle row click to toggle dropdown
                  className={`${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } cursor-pointer`}
                >
                  <td className="px-4 py-2 text-sm">{product.pid}</td>
                  <td className="px-4 py-2 text-sm">{product.productname}</td>
                  <td className="px-4 py-2 text-sm">{product.subcat_name}</td>
                  <td className="px-4 py-2 text-sm">{product.price}</td>
                  <td className="px-4 py-2 text-sm">{product.qty}</td>
                  <td className="px-4 py-2 text-sm">{product.company}</td>
                  <td className="px-4 py-2 text-sm">Click to view details</td>
                </tr>

                {/* Dropdown for Details */}
                {selectedProductId === product.pid && (
                  <tr className="bg-gray-100">
                    <td colSpan="7" className="px-4 py-2">
                      <div className="space-y-2">
                        {/* Editable Product Name */}
                        <div className="text-gray-800">
                          <strong>Product Name:</strong>
                          <input
                            type="text"
                            name="productname"
                            value={editableProduct.productname}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable Subcategory */}
                        <div className="text-gray-800">
                          <strong>Subcategory:</strong>
                          <input
                            type="text"
                            name="subcat_name"
                            value={editableProduct.subcat_name}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable Price */}
                        <div className="text-gray-800">
                          <strong>Price:</strong>
                          <input
                            type="number"
                            name="price"
                            value={editableProduct.price}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable Quantity */}
                        <div className="text-gray-800">
                          <strong>Quantity:</strong>
                          <input
                            type="number"
                            name="qty"
                            value={editableProduct.qty}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable Company */}
                        <div className="text-gray-800">
                          <strong>Company:</strong>
                          <input
                            type="text"
                            name="company"
                            value={editableProduct.company}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable Product Description */}
                        <div className="text-gray-800">
                          <strong>Description:</strong>
                          <input
                            type="text"
                            name="product_description"
                            value={editableProduct.product_description}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable Tags */}
                        <div className="text-gray-800">
                          <strong>Tags:</strong>
                          <input
                            type="text"
                            name="tags"
                            value={editableProduct.tags}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable URL */}
                        <div className="text-gray-800">
                          <strong>URL:</strong>
                          <input
                            type="text"
                            name="url"
                            value={editableProduct.url}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Editable Review */}
                        <div className="text-gray-800">
                          <strong>Review:</strong>
                          <input
                            type="text"
                            name="review"
                            value={editableProduct.review}
                            onChange={handleFormChange}
                            className="ml-2 p-1 border rounded"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-2">
                          <button
                            onClick={() => handleFormSubmit(product.pid)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                          >
                            Update Product
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetProducts;
