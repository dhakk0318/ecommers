// import React, { useEffect, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import {
// //   setCartItems,
// //   updateQuantity,
// //   removeItem,
// // } from "../Redux/Slice/cartSlice";
// import { Minus, Plus, Check } from "lucide-react";
// import axios from "axios";

// export default function Cart() {
//   const dispatch = useDispatch();
//   const {
//     cartItems = [],
//     grandTotal,
//     gstAmount,
//     totalWithGST,
//   } = useSelector((state) => state.cart);

//   const [items,setItems] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get("http://localhost:3000/api/cart/card/items",
//         { withCredentials: true } );
//         console.log(response?.data?.cart);
//       if(response?.data?.cart){
//         setItems(response?.data?.cart)
//       }
//     }
//     fetch()

//   }, []);

//   const checkout = async (e) => {
//     const res = await axios.post(
//       `http://localhost:3000/api/transactions/checkout/3632`,
//       {
//         amount: 1500,
//       }
//     );
//     console.log(res);
//     // console.log(paymentIntentData)

//     const options = {
//       key: "rzp_test_8lhC7biwsUrzDd",
//       amount: res?.data?.order?.amount,
//       currency: "INR",
//       name: "TnpEcom",
//       description: "Online Ecommerce platform",
//       image:
//         "https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=SKHGjU04CDDZfEULQheYGuIgcteXQR8Mf5q3mjG0qos=",
//       order_id: res?.data?.order?.id,
//       callback_url: `http://localhost:4050/api/v1/paymentVerification`,
//       handler: async function (response) {
//         const callbackresponse = await axios.post(
//           `http://localhost:4050/api/v1/paymentVerification`,
//           {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           }
//         );
//         console.log(callbackresponse);
//         // window.location.href =${window.location.origin}/payment/${response.data?.razorpay_order_id}
//       },
//       prefill: {
//         name: "shubham",
//         email: "dhakk78@gmail.com",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#121212",
//       },
//     };

//     const razor = new window.Razorpay(options);
//     razor.open();
//   };

//   // const openPayment = (e) =>{
//   //   e.preventDefault();
//   //   console.log("entered");
//   // }

//   useEffect(() => {
//     const cid = 3632; // Hardcode customer ID for now

//     const fetchCartItems = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/cart/${cid}`);
//         if (!response.ok) {
//           // throw new Error(HTTP error! Status: ${response.status});
//         }
//         const data = await response.json();

//         if (data.cartItems) {
//           // dispatch(setCartItems(data.cartItems));
//         } else {
//           // dispatch(setCartItems([]));
//         }
//       } catch (error) {
//         console.error("Failed to fetch cart items:", error);
//       }
//     };

//     fetchCartItems();
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto p-4 md:p-6 lg:p-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-3/4 space-y-4">
//           <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//           {items.length > 0 ? (
//             items.map((item) => (
//               <div key={item.cart_id} className="border-b border-gray-200 py-4">
//                 <div className="flex items-start space-x-4">
//                   <img
//                     src="https://images.unsplash.com/photo-1659436868784-5781d7c2ba7d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                     alt={item.productname}
//                     className="w-24 h-24 object-cover"
//                   />
//                   <div className="flex-grow">
//                     <h3 className="font-medium text-lg">{item.productname}</h3>
//                     <p className="text-sm text-green-600">In Stock</p>
//                     <p className="text-sm text-gray-500">
//                       {/* Price per item: ₹{item.price.toFixed(2)} */}
//                     </p>{" "}
//                     {/* Added line for individual item price */}
//                     <div className="flex items-center mt-2">
//                       <div className="border border-gray-300 rounded-md">
//                         <button
//                           className="px-2 py-1 border-r border-gray-300"
//                           // onClick={() =>
//                           //   dispatch(
//                           //     updateQuantity({
//                           //       id: item.cart_id,
//                           //       quantity: Math.max(item.quantity - 1, 0),
//                           //     })
//                           //   )
//                           // }
//                           aria-label="Decrease quantity"
//                         >
//                           <Minus className="h-4 w-4" />
//                         </button>
//                         <span className="px-2 py-1">{item.quantity}</span>
//                         <button
//                           className="px-2 py-1 border-l border-gray-300"
//                           // onClick={() =>
//                           //   dispatch(
//                           //     updateQuantity({
//                           //       id: item.cart_id,
//                           //       quantity: item.quantity + 1,
//                           //     })
//                           //   )
//                           // }
//                           aria-label="Increase quantity"
//                         >
//                           <Plus className="h-4 w-4" />
//                         </button>
//                       </div>
//                       <button
//                         className="ml-4 text-sm text-blue-600 hover:text-blue-800 hover:underline"
//                         // onClick={() => dispatch(removeItem(item.cart_id))}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold">
//                       Total: ₹{(item.price * item.quantity)?.toFixed(2)}
//                     </p>{" "}
//                     {/* Updated to show total for quantity */}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <p className="text-center text-gray-600">
//                 Your Amazon Cart is empty.
//               </p>
//               <p className="text-center text-sm text-blue-600 mt-2 hover:text-blue-800 hover:underline cursor-pointer">
//                 Shop today's deals
//               </p>
//             </div>
//           )}

//           <div className="text-right text-lg font-bold">
//             Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
//             items):
//           </div>
//         </div>
//         <div className="lg:w-1/4">
//           <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
//             <div className="flex items-center text-green-600 mb-2">
//               <Check className="h-5 w-5 mr-2" />
//               <span className="text-sm">
//                 Your order qualifies for FREE Shipping.
//               </span>
//             </div>
//             <div className="text-lg font-bold mb-4">
//               Subtotal (
//               {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):
//               ₹{grandTotal?.toFixed(2)}
//             </div>
//             <div className="space-y-2 text-sm mb-4">
//               <div className="flex justify-between">
//                 <span>Grand Total:</span>
//                 <span>₹{grandTotal?.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>GST Amount:</span>
//                 <span>₹{gstAmount?.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold">
//                 <span>Total with GST:</span>
//                 <span>₹{totalWithGST?.toFixed(2)}</span>
//               </div>
//               <div className="flex items-center mt-2">
//                 <input type="checkbox" id="gift" className="mr-2" />
//                 <label htmlFor="gift">This order contains a gift</label>
//               </div>
//             </div>
//             <button
//               onClick={(e) => checkout(e)}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-md transition-colors"
//             >
//               Proceed to Buy
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
// import { useSelector } from "react-redux";
// import { Minus, Plus, Check } from "lucide-react";
// import axios from "axios";

// export default function Cart() {
//   const {
//     cartItems = [],
//     grandTotal,
//     gstAmount,
//     totalWithGST,
//   } = useSelector((state) => state.cart);
//   const { customer } = useSelector((state) => state.customer);
//   const [items, setItems] = useState([]);
//   console.log(customer.cid);

//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get(
//         `http://localhost:3000/api/cart/card/items`,
//         { withCredentials: true }
//       );
//       if (response?.data?.cart) {
//         setItems(response?.data?.cart);
//       }
//     };
//     fetch();
//   }, []);
//   const { error, isLoading, Razorpay } = useRazorpay();

//   // const checkout = async () => {
//   //   try {
//   //     // Make the API request to create the order
//   //     const res = await axios.post(
//   //       `http://localhost:3000/api/transactions/checkout/${customer?.cid}`,
//   //       { amount: 1500 }
//   //     );

//   //     // Check for errors and invalid responses
//   //     if (!res || !res.data || !res.data.order) {
//   //       throw new Error("Error creating order");
//   //     }

//   //     const { order_id, amount } = res.data.order;

//   //     // Initialize Razorpay with the order details
//   //     const options = {
//   //       key: "rzp_test_qN2ZW9ayQgETQV", // Replace with your test API key
//   //       amount: amount * 100, // Convert amount to paise
//   //       currency: "INR",
//   //       name: "TnpEcom",
//   //       description: "Online Ecommerce platform",
//   //       image:
//   //         "https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.webp?a=b&1&s=61x612&w=0&k=SKHGjU04CDDZfEULQheYGuIgcteXQR8Mf5q3mjG0qos=",
//   //       order_id: order_id,
//   //       handler: async (response) => {
//   //         console.log(response.razorpay_order_id, "from Razorpay");
//   //         console.log(response.razorpay_payment_id);
//   //         console.log(response.razorpay_signature);

//   //         // Send the payment response to your backend for verification
//   //         const verifyPaymentResponse = await axios.post(
//   //           "http://localhost:3000/api/transactions/verify-payment",
//   //           {
//   //             razorpay_order_id: response.razorpay_order_id,
//   //             razorpay_payment_id: response.razorpay_payment_id,
//   //             razorpay_signature: response.razorpay_signature,
//   //           }
//   //         );

//   //         // Handle the verification response
//   //         if (verifyPaymentResponse.data.success) {
//   //           // Payment is verified, update order status or perform other actions
//   //           console.log("Payment verified successfully");
//   //         } else {
//   //           // Handle failed verification, e.g., log error, notify user
//   //           console.error("Payment verification failed");
//   //         }
//   //       },
//   //       prefill: { name: "shubham", email: "dhakk78@gmail.com" },
//   //       notes: { address: "Razorpay Corporate Office" },
//   //       theme: { color: "#121212" },
//   //     };

//   //     const razorpayInstance = new Razorpay(options);
//   //     razorpayInstance.open();
//   //   } catch (error) {
//   //     console.error("Checkout error:", error);
//   //     // Handle errors gracefully, e.g., display an error message to the user
//   //   }
//   // };


//   const checkout = async (amount) => {
//     const { data } = await axios.post(`http://localhost:3000/api/transactions/checkout/${customer?.cid}`, { amount: 1500 });

//     const options = {
//       key: "rzp_test_qN2ZW9ayQgETQV", // Enter the Key ID generated from the Dashboard
//       amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: "INR",
//       name: "MD. Taifur",
//       description: "Test Transaction",
//       image: "https://avatars.githubusercontent.com/u/91811028?v=4",
//       order_id: data.order.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       callback_url: "http://localhost:4000/api/paymentVerification",
//       prefill: {
//         name: "Gaurav Kumar",
//         email: "gaurav.kumar@example.com",
//         contact: "9000090000",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#45D347",
//       },
//     };
//     const razor = new Razorpay(options);
//     razor.open();
//   };


//   return (
//     <div className="container mx-auto p-4 md:p-6 lg:p-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Cart Items Section */}
//         <div className="lg:w-3/4 space-y-4">
//           <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//           {items.length > 0 ? (
//             items.map((item) => (
//               <div key={item.cart_id} className="border-b border-gray-200 py-4">
//                 <div className="flex items-start space-x-4">
//                   <img
//                     src="https://images.unsplash.com/photo-1659436868784-5781d7c2ba7d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                     alt={item.productname}
//                     className="w-24 h-24 object-cover"
//                   />
//                   <div className="flex-grow">
//                     <h3 className="font-medium text-lg">{item.productname}</h3>
//                     <p className="text-sm text-green-600">In Stock</p>
//                     <div className="flex items-center mt-2">
//                       <div className="border border-gray-300 rounded-md">
//                         <button
//                           className="px-2 py-1 border-r border-gray-300"
//                           aria-label="Decrease quantity"
//                         >
//                           <Minus className="h-4 w-4" />
//                         </button>
//                         <span className="px-2 py-1">{item.quantity}</span>
//                         <button
//                           className="px-2 py-1 border-l border-gray-300"
//                           aria-label="Increase quantity"
//                         >
//                           <Plus className="h-4 w-4" />
//                         </button>
//                       </div>
//                       <button className="ml-4 text-sm text-blue-600 hover:text-blue-800 hover:underline">
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold">
//                       Total: ₹{(item.price * item.quantity)?.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <p className="text-center text-gray-600">Your cart is empty.</p>
//               <p className="text-center text-sm text-blue-600 mt-2 hover:text-blue-800 hover:underline cursor-pointer">
//                 Shop today's deals
//               </p>
//             </div>
//           )}
//           <div className="text-right text-lg font-bold">
//             Subtotal ({items.length} items)
//           </div>
//         </div>

//         {/* Cart Summary Section */}
//         <div className="lg:w-1/4">
//           <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
//             <div className="flex items-center text-green-600 mb-2">
//               <Check className="h-5 w-5 mr-2" />
//               <span className="text-sm">
//                 Your order qualifies for FREE Shipping.
//               </span>
//             </div>
//             <div className="text-lg font-bold mb-4">
//               Subtotal ({items.length} items): ₹{grandTotal?.toFixed(2)}
//             </div>
//             <div className="space-y-2 text-sm mb-4">
//               <div className="flex justify-between">
//                 <span>Grand Total:</span>
//                 <span>₹{grandTotal?.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>GST Amount:</span>
//                 <span>₹{gstAmount?.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold">
//                 <span>Total with GST:</span>
//                 <span>₹{totalWithGST?.toFixed(2)}</span>
//               </div>
//               <div className="flex items-center mt-2">
//                 <input type="checkbox" id="gift" className="mr-2" />
//                 <label htmlFor="gift">This order contains a gift</label>
//               </div>
//             </div>
//             <button
//               onClick={checkout}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-md transition-colors"
//             >
//               Proceed to Buy
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



/* global Razorpay */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Minus, Plus, Check } from "lucide-react";
import axios from "axios";
import {
  fetchCartItems,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from "../../app/Redux/Action/cartActions";

export default function Cart() {
  const dispatch = useDispatch();
  const {
    cartItems = [],
    grandTotal,
    gstAmount,
    totalWithGST,
  } = useSelector((state) => state.cart);
  const { customer } = useSelector((state) => state.customer);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Dynamically load Razorpay script if not already loaded
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    document.body.appendChild(script);

    // Fetch cart items from the backend when the component mounts
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/cart/card/items`,
        { withCredentials: true }
      );
      if (response?.data?.cart) {
        setItems(response?.data?.cart);
        dispatch(fetchCartItems(response.data.cart));
      }
    };
    fetch();
  }, [dispatch]);

  // Handle increasing quantity
  const increaseQuantity = (itemId) => {
    const updatedQuantity = items.find(item => item.cart_id === itemId).quantity + 1;
    dispatch(updateCartItemQuantity({ cartId: itemId, quantity: updatedQuantity }));
  };

  // Handle decreasing quantity
  const decreaseQuantity = (itemId) => {
    const updatedQuantity = items.find(item => item.cart_id === itemId).quantity - 1;
    if (updatedQuantity > 0) {
      dispatch(updateCartItemQuantity({ cartId: itemId, quantity: updatedQuantity }));
    }
  };

  // Handle removing item from cart
  const removeItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  // const checkout = async (amount) => {
  //   if (typeof Razorpay === "undefined") {
  //     alert("Razorpay is not loaded properly");
  //     return;
  //   }

  //   const { data } = await axios.post(
  //     `http://localhost:3000/api/transactions/checkout/${customer?.cid}`,
  //     { amount: 1500 }
  //   );

  //   const options = {
  //     key: "rzp_test_qN2ZW9ayQgETQV", // Enter the Key ID generated from the Dashboard
  //     amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency: "INR",
  //     name: "MD. Taifur",
  //     description: "Test Transaction",
  //     image: "https://avatars.githubusercontent.com/u/91811028?v=4",
  //     order_id: data.order.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     callback_url: "http://localhost:4000/api/paymentVerification",
  //     prefill: {
  //       name: "Gaurav Kumar",
  //       email: "gaurav.kumar@example.com",
  //       contact: "9000090000",
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#45D347",
  //     },
  //   };

  //   const razor = new Razorpay(options);
  //   razor.open();
  // };



  const checkoutHandler = async (amount, pid, empid) => {

    try {
      // const { data: { key } } = await axios.get(`${url}/api/getKey`);
      const { data } = await axios.post(
            `http://localhost:3000/api/transactions/checkout/${customer?.cid}`,
            { amount: 1500 }
          );
          console.log(data.order.id,"api")
      const options = {
        key: "rzp_test_qN2ZW9ayQgETQV",
        amount: 150000,
        currency: "INR",
        name: "Ravi Kumar",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.order.id,
        callback_url: `http://localhost:3000/paymentVerification`,
        prefill: {
          name: "Ravi Kumar",
          email: "ravi123khg@gmail.com",
          contact: "8936033768"
        },
        notes: {
          address: "bhopal"
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response) {
          console.log(response.razorpay_order_id, "resonse")
          console.log(response.razorpay_signature, "resonse")

          try {
            
            await axios.post(`http://localhost:3000/api/transactions/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            window.location.href = `/payment-success?order_id=${response.razorpay_order_id}`;
          } catch (error) {
            console.error('Error sending payment details:', error);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment dismissed");
          }
        }
      };


      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error in checkoutHandler:', error);
    }
  };
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-3/4 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.cart_id} className="border-b border-gray-200 py-4">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1659436868784-5781d7c2ba7d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={item.productname}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{item.productname}</h3>
                    <p className="text-sm text-green-600">In Stock</p>
                    <div className="flex items-center mt-2">
                      <div className="border border-gray-300 rounded-md">
                        <button
                          className="px-2 py-1 border-r border-gray-300"
                          aria-label="Decrease quantity"
                          onClick={() => decreaseQuantity(item.cart_id)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border-l border-gray-300"
                          aria-label="Increase quantity"
                          onClick={() => increaseQuantity(item.cart_id)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        className="ml-4 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={() => removeItem(item.cart_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      Total: ₹{(item.price * item.quantity)?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-center text-gray-600">Your cart is empty.</p>
              <p className="text-center text-sm text-blue-600 mt-2 hover:text-blue-800 hover:underline cursor-pointer">
                Shop today's deals
              </p>
            </div>
          )}
          <div className="text-right text-lg font-bold">
            Subtotal ({items.length} items)
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <div className="flex items-center text-green-600 mb-2">
              <Check className="h-5 w-5 mr-2" />
              <span className="text-sm">
                Your order qualifies for FREE Shipping.
              </span>
            </div>
            <div className="text-lg font-bold mb-4">
              Subtotal ({items.length} items): ₹{grandTotal?.toFixed(2)}
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span>Grand Total:</span>
                <span>₹{grandTotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Amount:</span>
                <span>₹{gstAmount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total with GST:</span>
                <span>₹{totalWithGST?.toFixed(2)}</span>
              </div>
              <div className="flex items-center mt-2">
                <input type="checkbox" id="gift" className="mr-2" />
                <label htmlFor="gift">This order contains a gift</label>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-md transition-colors"
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
