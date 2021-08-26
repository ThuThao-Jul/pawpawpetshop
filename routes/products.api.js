const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

/**
 * @route GET api/products
 * @description get all products
 * @access public
 */
router.get("/", productController.getAll);


/**
 * @route POST api/products
 * @description create new product
 * @access admin 
 */
router.post("/", productController.createNew);


/**
 * @route PUT api/products/:id
 * @description edit a product
 * @access admin
 */
router.put("/:id", productController.editProduct);


/**
 * @route DELETE api/product/:id
 * @description delete a product
 * @access admin
 */
router.delete('/id', productController.deleteProduct);





module.exports = router;