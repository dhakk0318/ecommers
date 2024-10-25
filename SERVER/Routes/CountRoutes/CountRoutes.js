const express = require("express");
const router = express.Router();
const adminController = require("../../Controllers/CountController/CountController");

// Route to get counts
router.get("/admin-users", adminController.getAdminUserCount);
router.get("/categories", adminController.getCategoryCount);
router.get("/subcategories", adminController.getSubCategoryCount);
router.get("/retailer-products", adminController.getRetailerProductCount);
router.get("/retailers", adminController.getRetailerCount);
module.exports = router;
