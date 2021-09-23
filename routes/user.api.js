const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authentication');
const router = express.Router();

/**
 * @route GET api/user/me
 * @description get single profile
 * @access login required
 */
router.get('/me', authMiddleware.loginRequired, userController.getProfile);


/**
 * @route POST api/user/cart/:id
 * @description add products to cart
 * @access login required
 */
router.post('/cart/:id', userController.addToCart);

/**
 * @route DELETE api/user/cart
 * @description delete cart
 * @access login required
 */
router.delete('/cart', userController.deleteCart);


/**
 * @route POST api/user/order
 * @description create new order
 * @access login required
 */
router.post('/order', userController.order);


/**
 * @route DELETE api/user/order/:id
 * @description delete an order
 * @access login required
 */
router.delete('/order/:id', userController.deleteOrder);


/**
 * @route PUT api/user/order/:id
 * @description pay an order
 * @access login required
 */
router.put('/order/:id', userController.payment);

module.exports = router;