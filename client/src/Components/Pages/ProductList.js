import React, { useEffect, useState } from "react";
import axios from "axios";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="p-8 mb-10 mx-auto rounded-lg shadow-lg bg-white text-gray-900">
      {/* Product List Heading */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Products List
      </h1>

      {/* Loading state */}
      {loading && <p className="text-blue-500">Loading products...</p>}

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products table */}
      {!loading && !error && (
        <table className="min-w-full divide-y divide-gray-200 bg-white">
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
              <tr
                key={product.pid}
                onClick={() => handleProductClick(product)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-2 text-sm">{product.pid}</td>
                <td className="px-4 py-2 text-sm">{product.productname}</td>
                <td className="px-4 py-2 text-sm">{product.subcat_name}</td>
                <td className="px-4 py-2 text-sm">{product.price}</td>
                <td className="px-4 py-2 text-sm">{product.qty}</td>
                <td className="px-4 py-2 text-sm">{product.company}</td>
                <td className="px-4 py-2 text-md">🔍</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for product details */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative mx-4 sm:mx-0">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Details</h2>
            <div className="space-y-4">
              <p><strong>Product Name:</strong> {selectedProduct.productname}</p>
              <p><strong>Subcategory:</strong> {selectedProduct.subcat_name}</p>
              <p><strong>Price:</strong> {selectedProduct.price}</p>
              <p><strong>Quantity:</strong> {selectedProduct.qty}</p>
              <p><strong>Company:</strong> {selectedProduct.company}</p>
              <p><strong>Description:</strong> {selectedProduct.product_description}</p>
              <p><strong>Tags:</strong> {selectedProduct.tags}</p>
              <p><strong>URL:</strong> {selectedProduct.url}</p>
              <p><strong>Review:</strong> {selectedProduct.review}</p>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-red-500 focus:outline-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProducts;
