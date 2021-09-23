const express = require('express');
const adminController = require('../controllers/admin.controller');
const router = express.Router();

/**
 * @route GET api/admin/revenue
 * @description get total revenue
 * @access admin
 */
 router.get('/revenue', adminController.getRevenue);

 /**
 * @route GET api/admin/orders
 * @description get paid orders
 * @access admin
 */
  router.get('/orders', adminController.getPaidOrders);

/**
 * @route PUT api/admin/orders/:id
 * @description update delivery status for an order
 * @access admin
 */
 router.put('/orders/:id', adminController.putDelivery);

 module.exports = router;