import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from '../ThemeContext'; // Import the theme hook

const CreateProduct = () => {
  const { isDarkMode } = useTheme(); // Get the current theme

  const [categories, setCategories] = useState([]); // State to store categories
  const [subCategories, setSubCategories] = useState([]); // State to store subcategories
  const [productData, setProductData] = useState({
    sub_catid: '',    // Subcategory ID
    retid: '',        // Retailer ID
    pid: '',          // Product ID
    productname: '',  // Product name
    price: '',        // Product price
    qty: '',          // Product quantity
    company: '',      // Company
    product_description: '',  // Description
    tags: '',         // Tags
    url: '',          // URL (for product URL)
    review: '',       // Review
    image: null,      // Product image
    category: '',     // Selected category
  });

  const [message, setMessage] = useState('');

  // Fetch categories and subcategories from API
  useEffect(() => {
    async function fetchCategoriesAndSubCategories() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/product/categories/subcategories");
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories); // Update categories state
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching categories and subcategories:", error);
      }
    }
    fetchCategoriesAndSubCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find((cat) => cat.catid === selectedCategoryId);

    if (selectedCategory) {
      setSubCategories(selectedCategory.subcategories); // Update subcategories based on selected category
      setProductData({
        ...productData,
        category: selectedCategoryId,  // Store the selected category id
        sub_catid: "",  // Reset subcategory when category is changed
      });
    }
  };

  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    setProductData({
      ...productData,
      sub_catid: selectedSubCategoryId,  // Update the subcategory when changed
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if 'pid' is missing or invalid
    if (!productData.pid) {
      console.error("Error: 'pid' is missing or invalid", productData.pid);
      setMessage("Product ID (pid) is required.");
      return;
    }

    // Additional required fields check
    const requiredFields = ['sub_catid', 'pid', 'retid', 'productname', 'price', 'qty', 'company', 'product_description'];
    let missingFields = [];
    requiredFields.forEach((field) => {
      if (!productData[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      console.error("Missing fields:", missingFields);
      setMessage("Please fill in all required fields.");
      return;
    }

    console.log("Submitting productData:", productData);  // Log product data for debugging

    // Use JSON for POST data
    try {
      const response = await axios.post('http://localhost:3000/api/product', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setMessage(response.data.message || 'Product created successfully!');
      setProductData({
        sub_catid: '', retid: '', pid: '', productname: '', price: '', qty: '', company: '', product_description: '', tags: '', url: '', review: '', image: null, category: '',
      });
      setCategories([]);  // Reset categories
      setSubCategories([]);  // Reset subcategories
    } catch (err) {
      console.error('Product creation error:', err.response ? err.response.data : err.message);
      setMessage('Failed to create product. Please try again.');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen p-2 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className={`w-full max-w-lg p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Create New Product</h1>
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Category Selector */}
          <div className="mb-4">
            <label className={`block ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Category</label>
            <select
              name="category"
              onChange={handleCategoryChange}
              value={productData.category}
              className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.catid} value={category.catid}>
                  {category.catname}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Selector */}
          {productData.category && (
            <div className="mb-4">
              <label className={`block ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Subcategory</label>
              <select
                name="sub_catid"
                onChange={handleSubCategoryChange}
                value={productData.sub_catid}
                className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                required
              >
                <option value="">Select Subcategory</option>
                {subCategories.length > 0 ? (
                  subCategories.map((subCategory) => (
                    <option key={subCategory.sub_catid} value={subCategory.sub_catid}>
                      {subCategory.subcat_name}
                    </option>
                  ))
                ) : (
                  <option value="">No Subcategories Available</option>
                )}
              </select>
            </div>
          )}

          {/* Product Fields */}
          <input
            type="text"
            name="retid"
            placeholder="Retailer ID"
            value={productData.retid}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            required
          />

          <input
            type="text"
            name="pid"
            placeholder="Product ID"
            value={productData.pid}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            required
          />

          <input
            type="text"
            name="productname"
            placeholder="Product Name"
            value={productData.productname}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            required
          />

          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={productData.qty}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={productData.company}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            required
          />

          <textarea
            name="product_description"
            placeholder="Product Description"
            value={productData.product_description}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            required
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
