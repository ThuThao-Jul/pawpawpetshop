const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

/**
 * @route POST api/auth/register
 * @description register new account
 * @access public
 */
router.post('/register', authController.register);


/**
 * @route POST api/auth/login
 * @description users can login after registering
 * @access public
 */
router.post('/login', authController.login);

module.exports = router;