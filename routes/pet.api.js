const express = require('express');
const petController = require('../controllers/pet.controller');
const authMiddleware = require('../middleware/authentication');
const router = express.Router();


/**
 * @route GET api/pet
 * @description get all pets of a specific account
 * @access public
 */
router.get('/', petController.getPets);


/**
 * @route GET api/pet/:id
 * @description get single pet
 * @access public
 */
router.get('/:id', petController.getSinglePet);

/**
 * @route POST api/pet
 * @description create a new pet
 * @access login required
 */
router.post('/', authMiddleware.loginRequired, petController.createNewPet);

/**
 * @route PUT api/pet/:id
 * @description update a pet
 * @access login required
 */
router.put('/:id', authMiddleware.loginRequired, petController.updatePet);

/**
 * @route DELETE api/pet/:id
 * @description delete a pet
 * @access login required
 */
router.delete('/:id',authMiddleware.loginRequired, petController.deletePet);

module.exports = router;