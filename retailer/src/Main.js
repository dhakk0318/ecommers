import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Retailers/Login"; // Login component
import RetailerKYCForm from "./Retailers/RetailerKycForm"; // KYC Form component
import Dashboard from "./Retailers/Dashboard"; // Dashboard component
import ViewProducts from "./Components/ViewProducts"; // View Products component
import CreateProduct from "./Components/CreateProducts"; // Create Product component
import BankingForm from "./Components/BankingForm"; // Banking Form component
import Layout from "./Layout/Layout"; // Layout component

export default function Main() {
  return (
    <Routes>
      {/* Routes for login, register (without layout) */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RetailerKYCForm />} />

      {/* Protected Routes wrapped inside Layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/products/view"
        element={
          <Layout>
            <ViewProducts />
          </Layout>
        }
      />
      <Route
        path="/products/add"
        element={
          <Layout>
            <CreateProduct />
          </Layout>
        }
      />
      <Route
        path="/banking"
        element={
          <Layout>
            <BankingForm />
          </Layout>
        }
      />
    </Routes>
  );
}
