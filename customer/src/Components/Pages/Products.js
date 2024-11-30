// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { addItemToCart } from "../Redux/Slice/cartSlice";
// import axios from "axios";

// function Recommended() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cartItems || []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://localhost:3000/api/product");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products.");
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message || "Failed to fetch products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSlide = (direction) => {
//     if (direction === "next") {
//       setCurrentSlide((prev) => Math.min(prev + 1, products.length - 4));
//     } else {
//       setCurrentSlide((prev) => Math.max(prev - 1, 0));
//     }
//   };

//   const addItemsToCart = async (pid, quantity = 1) => {
//     try {
//       // Ensure axios sends cookies with the request
//       const response = await axios.post(
//         "http://localhost:3000/api/cart/add-item",
//         { pid, quantity },
//         { withCredentials: true } // This allows cookies to be included
//       );
//       console.log(response)
  
//       if (response?.data?.message === "Product added to cart successfully" ) {
//         alert("Item added to cart successfully:", response.data);
//       } else if (response?.data?.message === "Product already existed in card") {
//         alert("Product already existed in cart");
//       } else {
//         alert("Failed to add item to cart. Please check the details.");
//       }
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       alert("An error occurred while adding the item to the cart.");
//     }
//   };
  

    

//   // const handleAddToCart = (product) => {
//   //   // Step 1: Check if cartId exists in localStorage
//   //   let cartId = localStorage.getItem("cartId");
//   //   if (!cartId) {
//   //     // If cartId doesn't exist, generate a new one and store it in localStorage
//   //     cartId = generateCartId();
//   //     localStorage.setItem("cartId", cartId);
//   //   }

//   //   // Step 2: Prepare the payload to send to the API
//   //   const payload = {
//   //     pid: product.pid,
//   //     productname: product.productname,
//   //     price: product.price,
//   //     quantity: 1,
//   //     cartId: cartId,
//   //   };

//   //   // Step 3: Dispatch to Redux store (optional but helps in state management)
//   //   dispatch(addItemToCart(payload));

//   //   // Step 4: Make an API call to add the item to the cart
//   //   axios
//   //     .post("http://localhost:3000/api/cart/add-item", payload)
//   //     .then((response) => {
//   //       console.log("Item added to cart successfully:", response.data);
//   //       // Optionally update the state or handle the response
//   //     })
//   //     .catch((error) => {
//   //       console.error("Failed to add item to cart:", error);
//   //       alert("Failed to add item to cart. Please check the details.");
//   //     });

//   //   // Step 5: Retrieve the current cart from localStorage or initialize an empty cart
//   //   const currentCart = JSON.parse(localStorage.getItem(cartId)) || [];

//   //   // Step 6: Check if the product is already in the cart
//   //   const existingProductIndex = currentCart.findIndex(
//   //     (item) => item.pid === product.pid
//   //   );
//   //   if (existingProductIndex !== -1) {
//   //     // If the product exists, update the quantity
//   //     currentCart[existingProductIndex].quantity += 1;
//   //   } else {
//   //     // If the product does not exist, add it to the cart
//   //     currentCart.push({
//   //       pid: product.pid,
//   //       productname: product.productname,
//   //       price: product.price,
//   //       quantity: 1,
//   //     });
//   //   }

//   //   // Step 7: Save the updated cart back to localStorage
//   //   localStorage.setItem(cartId, JSON.stringify(currentCart));
//   // };

//   // Generate a unique cart ID if none exists in localStorage
//   const generateCartId = () => {
//     return Math.random().toString(36).substr(2, 9); // Simple random ID generator
//   };

//   const totalItemsInCart = cart.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   if (loading) {
//     return <div className="text-center py-10">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">{error}</div>;
//   }

//   return (
//     <section className="container mx-auto py-12 px-4 mt-10">
//       <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
//       <div className="relative overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentSlide * 25}%)` }}
//         >
//           {products.map((product, index) => (
//             <div key={index} className="w-1/4 flex-shrink-0 p-2">
//               <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//                 <div className="overflow-hidden">
//                   <img
//                     src={product.url || "https://via.placeholder.com/150"}
//                     alt={product.productname}
//                     className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold mb-2">{product.productname}</h3>
//                   <div className="flex items-center mb-2">
//                     {[
//                       ...Array(
//                         Math.max(0, Math.round(parseFloat(product.review) || 0))
//                       ),
//                     ].map((_, i) => (
//                       <svg
//                         key={i}
//                         className="w-4 h-4 fill-current text-yellow-500"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                     <span className="text-gray-600 text-sm ml-2">
//                       (
//                       {parseFloat(product.review)
//                         ? parseFloat(product.review).toFixed(1)
//                         : "0.0"}{" "}
//                       stars)
//                     </span>
//                   </div>
//                   <div className="text-lg font-bold flex items-center">
//                     <span className="text-black text-xl">₹ </span>
//                     <span className="ml-1">{product.price}</span>
//                   </div>
//                   <button
//                     onClick={() => addItemsToCart(product?.pid,1)}
//                     className="mt-4 w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={() => handleSlide("prev")}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </button>
//         <button
//           onClick={() => handleSlide("next")}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//         >
//           <ChevronRight className="h-6 w-6" />
//         </button>
//       </div>

//       <div className="absolute top-5 right-5 bg-yellow-400 text-gray-900 rounded-full p-2">
//         <span>{totalItemsInCart}</span>
//       </div>
//     </section>
//   );
// }

// export default Recommended;



import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../app/Redux/Action/cartActions";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems || []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSlide = (direction) => {
    if (direction === "next") {
      setCurrentSlide((prev) => Math.min(prev + 1, products.length - 4));
    } else {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleAddToCart = async (product) => {
    const productData = {
      pid: product.pid,
      productname: product.productname,
      price: product.price,
      quantity: 1,
    };

    try {
      // Call API to add item to the cart
      const response = await axios.post(
        "http://localhost:3000/api/cart/add-item",
        productData,
        { withCredentials: true } // Send cookies with the request
      );
      if (response?.data?.message === "Product added to cart successfully") {
        alert("Item added to cart successfully");
        // Dispatch action to Redux to update local state
        dispatch(addItemToCart(productData));
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  // Calculate total items in the cart
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="container mx-auto py-12 px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 25}%)` }}
        >
          {products.map((product, index) => (
            <div key={index} className="w-1/4 flex-shrink-0 p-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="overflow-hidden">
                  <img
                    src={product.url || "https://via.placeholder.com/150"}
                    alt={product.productname}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.productname}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(Math.max(0, Math.round(parseFloat(product.review) || 0)))].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current text-yellow-500"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 000.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 text-sm ml-2">
                      ({parseFloat(product.review) ? parseFloat(product.review).toFixed(1) : "0.0"} stars)
                    </span>
                  </div>
                  <div className="text-lg font-bold flex items-center">
                    <span className="text-black text-xl">₹ </span>
                    <span className="ml-1">{product.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSlide("prev")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleSlide("next")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute top-5 right-5 bg-yellow-400 text-gray-900 rounded-full p-2">
        <span>{totalItemsInCart}</span>
      </div>
    </section>
  );
}

export default Products;
