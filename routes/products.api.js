const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/authentication');
const router = express.Router();

/**
 * @route GET api/products
 * @description get all products
 * @access public
 */
router.get("/", productController.getAll);

/**
 * @route GET api/products/:id
 * @description get single product
 * @access public
 */
router.get("/:id", productController.getSingleProduct);

/**
 * @route POST api/products
 * @description create new product
 * @access admin 
 */
router.post("/", authMiddleware.adminRequired, productController.createNew);


/**
 * @route PUT api/products/:id
 * @description edit a product
 * @access admin
 */
router.put("/:id", authMiddleware.adminRequired, productController.editProduct);


/**
 * @route DELETE api/product/:id
 * @description delete a product
 * @access admin
 */
router.delete('/id', authMiddleware.adminRequired, productController.deleteProduct);





module.exports = router;