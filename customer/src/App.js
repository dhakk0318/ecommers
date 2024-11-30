import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/Store";

import Navigation from "./Components/Layouts/Navigation";
import Slides from "./Components/Layouts/Slides";
import Category from "./Components/Layouts/Category";
import DealsOfTheDay from "./Components/Layouts/DealsOfTheDay";
import Products from "./Components/Pages/Products";
import Footer from "./Components/Layouts/Footer";
import LoginForm from "./Components/Form/LoginForm";
import RegisterForm from "./Components/Form/RegisterForm";
import Cart from "./Components/Pages/Cart";
import ProfileList from "./Components/Pages/Profile/ProfileList";
import AddProfile from "./Components/Pages/Profile/AddProfile";
import UpdateProfile from "./Components/Pages/Profile/UpdateProfile";
import Header from "./Components/Layouts/Header";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Default route with Navigation and other components */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Navigation />
                <Slides />
                <Category />
                <Products />
                <DealsOfTheDay />

                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Header />
                <ProfileList />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <Cart />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                
              </>
            }
          />

          {/* Other routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/update-profile/:cid" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Provider, useDispatch } from "react-redux";
// import store from "./app/Store";
// import { fetchProducts } from "./Redux/Slice/productSlice";
// import Navigation from "./Compo/Navigation";
// import Slides from "./Compo/Slides";
// import Category from "./Compo/Category";
// import DealsOfTheDay from "./Compo/DealsOfTheDay";
// import Recommended from "./Compo/Recommended";
// import Footer from "./Compo/Footer";
// import LoginForm from "./Pages/LoginForm";
// import RegisterForm from "./Pages/RegisterForm";
// import Chackout from "./Pages/Chackout";
// import Cart from "./Pages/Cart";
// import ProfileList from "./Profile/ProfileList";
// import AddProfile from "./Profile/AddProfile";
// import UpdateProfile from "./Profile/UpdateProfile";
// import Header from "./Compo/Header";
// import Transection from "./Pages/Transection";
// import OrderManagement from "./Pages/OrderManagement";

// // Wrapper component to handle data fetching
// function AppWithFetch() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProducts()); // Fetch products on app load
//   }, [dispatch]);

//   return (
//     <Routes>
//       {/* Default route with Navigation and other components */}
//       <Route
//         path="/"
//         element={
//           <>
//             <Header />
//             <Navigation />
//             <Slides />
//             <Category />
//             <DealsOfTheDay />
//             <Recommended />
//             <Footer />
//           </>
//         }
//       />

//       {/* Other Routes */}
//       <Route
//         path="/profile"
//         element={
//           <>
//             <Header />
//             <ProfileList />
//             <Footer />
//           </>
//         }
//       />
//       <Route
//         path="/cart"
//         element={
//           <>
//             <Header />
//             <Cart />
//           </>
//         }
//       />
//       <Route
//         path="/checkout"
//         element={
//           <>
//             <Header />
//             <Chackout />
//           </>
//         }
//       />
//       <Route path="/login" element={<LoginForm />} />
//       <Route path="/register" element={<RegisterForm />} />
//       <Route path="/add-profile" element={<AddProfile />} />
//       <Route path="/update-profile/:cid" element={<UpdateProfile />} />
//       <Route path="/transection" element={<Transection />} />
//       <Route path="/order" element={<OrderManagement />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <AppWithFetch />
//       </Router>
//     </Provider>
//   );
// }

// export default App;
