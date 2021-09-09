const express = require('express');
const serviceController = require('../controllers/service.controller');
const authMiddleware = require('../middleware/authentication');
const router = express.Router();

// type = spa || healthcare
/**
 * @route GET /api/services/ (query: type = spa || healthcare)
 * @description get all service information (combo, doctors available time...)
 * @access public
 */
router.get('/', serviceController.getInfo);


/**
 * @route POST /api/services/
 * @description create new service
 * @access admin
 */
 router.post('/', authMiddleware.adminRequired, serviceController.newService);


/**
 * @route POST /api/services/:id
 * @description create new booking
 * @access login required
 */
router.post('/:id', authMiddleware.loginRequired, serviceController.booking);

/**
 * @route PUT /api/services/booking/:id
 * @description update status for a existed booking
 * @access admin
 */
router.put('/booking/:id', authMiddleware.adminRequired, serviceController.updateBooking);


/**
 * @route GET /api/service/dashboard
 * @description get dashboard data
 * @access admin
 */
// router.get('/dashboard', serviceController.dashboard)


module.exports = router;