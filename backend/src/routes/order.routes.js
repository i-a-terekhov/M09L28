const express = require('express');
const OrderController = require("../controllers/order.controller");
const Auth = require("../utils/common/auth");
const router = express.Router();

router.get('/', Auth.authenticate, OrderController.getOrders);
router.post('/', Auth.authenticate, OrderController.createOrder);
router.get('/:id', Auth.authenticate, OrderController.getOrder);
router.put('/:id', Auth.authenticate, OrderController.updateOrder);
router.delete('/:id', Auth.authenticate, OrderController.deleteOrder);

module.exports = router;