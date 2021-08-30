const express = require('express');
const serviceController = require('../controllers/service.controller');
const router = express.Router();

// type = spa || healthcare
/**
 * @route GET /api/services/ (query: type = spa || healthcare)
 * @description get all service information (combo, doctors available time...)
 * @access public
 */
router.get('/', serviceController.getInfo);


/**
 * @route POST /api/service/
 * @description create new booking
 * @access login required
 */
router.post('/:id', serviceController.booking);

/**
 * @route PUT /api/service/:id
 * @description update status for a existed booking
 * @access admin
 */
router.put('/:id', serviceController.updateBooking);


/**
 * @route GET /api/service/dashboard
 * @description get dashboard data
 * @access admin
 */
// router.get('/dashboard', serviceController.dashboard)


module.exports = router;