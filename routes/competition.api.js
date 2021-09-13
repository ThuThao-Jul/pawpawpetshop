const express = require('express');
const competitionController = require('../controllers/competition.controller');
const authMiddleware = require('../middleware/authentication');
const router = express.Router();


/**
 * @route GET api/competition/users
 * @description get users with the most total value order in the last year
 * @access admin
 */
router.get('/users', authMiddleware.adminRequired ,competitionController.getProfiles);

/**
 * @route GET api/competition
 * @description get all competitions
 * @access admin
 */
 router.get('/', authMiddleware.adminRequired ,competitionController.getAll);

/**
 * @route GET api/competition/:id
 * @description get single competition
 * @access admin
 */
 router.get('/:id', authMiddleware.adminRequired ,competitionController.getSingleCompetition);


/**
 * @route GET api/competition/result/:id
 * @description get ranking result
 * @access admin
 */
 router.get('/result/:id', authMiddleware.adminRequired ,competitionController.getRanking);

/**
 * @route POST api/competition
 * @description create new competition
 * @access admin
 */
router.post('/', authMiddleware.adminRequired, competitionController.createNewCompetition);

/**
 * @route PUT api/competition/vote/:id
 * @description user votes for a competitor
 * @access login required
 */
router.put('/vote/:id', authMiddleware.loginRequired, competitionController.updateVote);

/**
 * @route PUT api/competition/result/:id
 * @description find the winner
 * @access admin
 */
router.put('/result/:id', authMiddleware.adminRequired, competitionController.updateWinner);

module.exports = router;