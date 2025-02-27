const express = require('express');
const router = express.Router();

const sitesController = require('../app/controllers/SitesControllers');

router.get('/search', sitesController.search);
router.get('/:slug', sitesController.index);
router.get('/', sitesController.index);
module.exports = router;