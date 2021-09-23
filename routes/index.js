var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render({ status: 'ok', data: 'hello' });
});

/* products endpoint */
const productApi = require("./products.api");
router.use("/products", productApi);


/* service endpoint */
const serviceApi = require('./services.api');
router.use('/services', serviceApi);

/* Auth endpoint */
const authApi = require('./auth.api');
router.use('/auth', authApi);

/* User endpoint */
const userApi = require('./user.api');
const authMiddleware = require('../middleware/authentication');
router.use('/user', authMiddleware.loginRequired, userApi);

/* Pet endpoint */
const petApi = require("./pet.api");
router.use('/pet', petApi);

/* Competition endppoint */
const competitionApi = require("./competition.api");
router.use('/competition',competitionApi);

/* Admin endpoint */
const adminApi = require('./admin.api');
router.use('/admin', authMiddleware.adminRequired, adminApi);


module.exports = router;
