const express = require("express");
const router = express.Router();

//Admin
const AdminRoutes = require("./AdminRoutes/adminRoutes");
const AdminUserProfileRoutes = require("./AdminRoutes/AdminUserProfilesRoutes");

//Category/Subcategpry

const catSubcatRoutes = require("./CategorySubcategoryRoutes/catSubcatRoutes");

////Retailer

const retailerProductRoutes = require("./RetailProRegRoutes/RetailProductRoutes");
const retailerProductDescriptionRoutes = require("./RetailProRegRoutes/RetailerProductDescriptionRoutes");
const retailerRegistrationRoutes = require("./RetailProRegRoutes/RetailerRegistrationRoutes");
const retailerBankingRoutes = require('./RetailProRegRoutes/retailerBankingRoutes');

//Products
const productRoutes = require('./ProductRoutes/productRoutes');

//Count
const countRoutes = require("./CountRoutes/CountRoutes")

//AdminOffer
const offerRoutes = require('./AdminOfferRoutes/OfferRoutes');

//Customer
const CustomerRoutes = require('./CustomerRoutes/CustomerRoutes');


//Admin
router.use("/", AdminRoutes);
router.use("/profiles", AdminUserProfileRoutes);

//Category/Subcategory
router.use("/", catSubcatRoutes);

//Retailer
router.use("/products", retailerProductRoutes);
router.use("/descriptions", retailerProductDescriptionRoutes);
router.use("/retailers", retailerRegistrationRoutes);
router.use("/retailer_banking", retailerBankingRoutes);

//Products
router.use("/product",productRoutes )


//Count
router.use("/count", countRoutes);

//AdminOffer
router.use('/offers', offerRoutes);


//Customer
router.use('/customers', CustomerRoutes);
module.exports = router;
