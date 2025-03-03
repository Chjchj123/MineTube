const express = require('express');
const router = express.Router();

const sitesController = require('../app/controllers/SitesControllers');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/search', middlewareController.verifyToken, sitesController.search);
router.get('/:slug', middlewareController.verifyToken, sitesController.index);
router.get('/',middlewareController.verifyToken, sitesController.index);
module.exports = router;