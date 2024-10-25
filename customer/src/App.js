import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/Store";

import Navigation from "./Compo/Navigation";
import Slides from "./Compo/Slides";
import Category from "./Compo/Category";
import DealsOfTheDay from "./Compo/DealsOfTheDay";
import Recommended from "./Compo/Recommended";
import Footer from "./Compo/Footer";
import LoginForm from "./Compo/Pages/LoginForm";
import RegisterForm from "./Compo/Pages/RegisterForm";
import WelcomePage from "./Compo/Pages/WelcomePage";
import CustomerProfile from "./Compo/Pages/CustomerProfile";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Main page */}
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <Slides />
                <Category />
                <DealsOfTheDay />
                <Recommended />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile" element={<CustomerProfile />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
