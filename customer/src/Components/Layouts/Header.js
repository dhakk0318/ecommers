import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logos from "../../Assets/logos.png";
import { logoutCustomer } from "../../app/Redux/Action/customerActions";
import { rehydrateCart } from "../../app/Redux/Action/cartActions"; // Action to rehydrate cart

function Header({ isSidebarOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [serverCartCount, setServerCartCount] = useState(0); // State for server cart count

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total cart items from Redux state
  const localCartCount = useSelector((state) =>
    state.cart.cartItems
      ? state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0
  );

  // Fetch customer data and cart count on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer name
        const customerResponse = await axios.get(
          "http://localhost:3000/api/customers/protected",
          { withCredentials: true }
        );
        if (customerResponse.data && customerResponse.data.customer_name) {
          setCustomerName(customerResponse.data.customer_name);
        }

        // Fetch cart count from server
        const cartResponse = await axios.get(
          "http://localhost:3000/api/count/cart",
          { withCredentials: true }
        );
        if (cartResponse.data && cartResponse.data.item_count >= 0) {
          setServerCartCount(cartResponse.data.item_count);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    // Rehydrate cart from localStorage (if needed)
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch(rehydrateCart(storedCart)); // Dispatch rehydrateCart to load cart into Redux state
    }
  }, [dispatch]);

  // Handle search input
  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      try {
        await axios.get(
          `http://localhost:3000/api/subcategories/search/${searchQuery}`
        );
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle account dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle logout
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await axios.post(
        "http://localhost:3000/api/customers/logout",
        {},
        { withCredentials: true }
      );

      dispatch(logoutCustomer());
      setCustomerName("");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`bg-gray-50 transition-all ${
        isSidebarOpen ? "backdrop-blur-lg" : ""
      }`}
    >
      <header className="bg-gray-900 text-white sticky top-0 z-50 transition-all">
        <div className="container mx-auto px-2 py-1">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4 mr-2">
              <Link to="/">
                <img
                  src={logos}
                  alt="TNP Logo"
                  className="h-14 w-100 cursor-pointer"
                />
              </Link>
            </div>

            {/* Search bar */}
            <div className="flex-1 mx-4 flex justify-center">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search categories"
                  className="w-full py-2 px-4 pr-10 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleSearch}
                />
              </div>
            </div>

            {/* Cart and Account section */}
            <div className="flex items-center space-x-4 text-sm relative">
              {customerName ? (
                <div className="text-white">
                  <p>{customerName} 👋</p>
                </div>
              ) : (
                <Link to="/login">
                  {/* <span className="hover:text-blue-400">Sign in</span> */}
                </Link>
              )}

              {/* Account dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="hidden lg:flex items-center space-x-1 hover:text-blue-400 transition"
                >
                  <span className="text-sm">Account</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {customerName ? (
                        <>
                          <Link to="/profile">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Profile
                            </button>
                          </Link>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Orders
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Wishlist
                          </button>

                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <Link to="/login">
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sign in
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications and Cart */}
              <button className="hidden lg:flex items-center space-x-1 hover:text-blue-400 transition">
                <span className="text-sm">Notifications</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-400 transition">
                <Link to="/cart">
                  <span className="text-sm font-semibold">
                    🛒 Cart ({serverCartCount})
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
