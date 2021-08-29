const express = require('express');
const categotyController = require('../controllers/category.controller');
const router = express.Router();


/**
 * @route GET /api/categories
 * @description get all categories
 * @access public
 */
router.get("/", categotyController.getAll);

module.exports = router;