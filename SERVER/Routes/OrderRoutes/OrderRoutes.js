const express = require('express');
const router = express.Router();
const orderController = require('../../Controllers/OrderController/OrderController');

router.post('/create', orderController.createOrder);
router.post('/add-item', orderController.addItemsToOrder);



router.get('/:order_id', orderController.getOrderDetails);


module.exports = router;
