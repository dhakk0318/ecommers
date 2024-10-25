// RetailProductRoutes.js
const express = require('express');
const router = express.Router();
const retailerProductController = require('../../Controllers/RetailProRegController/RetailerProductController');


router.get('/', retailerProductController.getAllProducts);
router.get('/:pid', retailerProductController.getProductById);
router.post('/', retailerProductController.createProduct);
router.patch('/:pid', retailerProductController.updateProduct);
router.delete('/:pid', retailerProductController.deleteProduct);

module.exports = router;
