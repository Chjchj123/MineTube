const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/my-song',middlewareController.verifyToken, meController.show);
router.get('/deleted-song',middlewareController.verifyToken, meController.deletedSongList);
router.patch('/restore/:slug',middlewareController.verifyToken, meController.restoreSongList);
router.delete('/hard-delete/:slug',middlewareController.verifyToken, meController.hardDelete);
module.exports = router;